const {NaoAutorizadoErro, NaoEncontradoErro, AplicacaoErro} = require('../erros/typeErros');
const Orcamento = require("../models/Orcamento");
const OrcamentoItem = require("../models/OrcamentoItem");
const OrcamentoDTO = require ("../dtos/OrcamentoDTO");
const OrcamentoItemDTO = require ("../dtos/OrcamentoItemDTO");
const orcamentoCQRS = require('../cqrs/orcamentoCQRS');

const connection = require('../database/index')

async function obterPorId(id){
    let orcamento = await Orcamento.findByPk(id);

    if(!orcamento){
        throw new NaoEncontradoErro(404, 'Não foi possivel encontrar um orcamento com id '+ id);
    }

    return await orcamentoCQRS.obterOrcamento(id);
    
}

async function obterTodos(){
   return await orcamentoCQRS.obterOrcamentos();
}

async function cadastrar(orcamentoDTO) {

    let transaction = await connection.transaction();

    try {
        orcamentoDTO.idCliente = orcamentoDTO.cliente.id;
        orcamentoDTO.id = undefined;
        //orcamentoDTO.idStatus = orcamentoDTO.status.id;

        let orcamento = await Orcamento.create(orcamentoDTO, {transaction});

        orcamento = new OrcamentoDTO(orcamento);

        orcamento.itens = orcamentoDTO.itens.map(item =>{
            item.id = undefined;
            item.idOrcamento = orcamento.id;
            item.idServico = item.servico.id;
            item.idPrestador = item.prestador.id;
            item.calcularValorTotal();

            return item;
        });

        let itens = await OrcamentoItem.bulkCreate(orcamento.itens, {
            transaction, returning: true, validate:true
        });

        if(!itens){
            throw new AplicacaoErro(500, 'Não foi possivel cadastrar os itens')
        }


        await transaction.commit();

        return orcamentoCQRS.obterOrcamento(orcamento.id)


    } catch (error) {
        await transaction.rollback();
    }

  return{};
 
}

async function atualizar(orcamentoDTO) {
   

    let transaction = await connection.transaction();

    try {
        let orcamentoBanco = await orcamentoCQRS.obterOrcamento(orcamentoDTO.id);

        if(!orcamentoBanco){
            throw new NaoEncontradoErro(404, 'Não é possivel atualizar um orcamento com o id '+ orcamentoDTO.id);

        }

        await _adicionarItens(orcamentoDTO, orcamentoBanco, transaction);
        await _atualizarItens(orcamentoDTO, orcamentoBanco, transaction);
        await _deletarItens(orcamentoDTO, orcamentoBanco, transaction);

       //atualizar a capa do orçamento
       
        await transaction.commit();
        return await orcamentoCQRS.obterOrcamento(orcamentoDTO.id);

    } catch (error) {
        await transaction.rollback();
        throw new AplicacaoErro(500, 'Não foi possivel atualizar o orcamento, motivo: '+ error)
    }

}

async function _adicionarItens(orcamentoDTO, orcamentoBanco, transaction){
    let itensAdicionados = [];
    orcamentoDTO.itens.map(item =>{
        if(!orcamentoBanco.itens.some(i => i.id == item.id)){
                item.id = undefined;
                item.idOrcamento = orcamentoDTO.id;
                item.idServico = item.servico.id;
                item.idPrestador = item.prestador.id;
                item.calcularValorTotal();
            itensAdicionados.push(item);
        }
    });

    if(itensAdicionados.length){
        itensAdicionados =  await OrcamentoItem.bulkCreate(
            itensAdicionados, {transaction, returning: true, validate:true});
    }
    
}

 async function _atualizarItens(orcamentoDTO, orcamentoBanco, transaction){

  
    let itensParaAtualizar = [];


    orcamentoDTO.itens.map(item =>{

        if(orcamentoBanco.itens.some(i => i.id == item.id)){
            item.calcularValorTotal();
            itensParaAtualizar.push(item);
        }
    });

    if(itensParaAtualizar.length){
        for(let item of itensParaAtualizar){
            await OrcamentoItem.update(item, {where : {id: item.id}});
        }
    }

    
}

async function _deletarItens(orcamentoDTO, orcamentoBanco, transaction){

  
    let itensParaRemover = [];


    orcamentoBanco.itens.map(item =>{

        if(!orcamentoDTO.itens.some(i => i.id == item.id)){
            itensParaRemover.push(item);
        }
    });

    if(itensParaRemover.length){
       await OrcamentoItem.destroy({ where: { id: itensParaRemover.map(i => i.id)}, transaction })
    }
    
}

module.exports = {
    obterPorId,
    obterTodos,
    cadastrar,
    atualizar
}