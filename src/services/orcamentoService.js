const {NaoAutorizadoErro, NaoEncontradoErro, AplicacaoErro} = require('../erros/typeErros');
const Orcamento = require("../models/Orcamento");
const OrcamentoItem = require("../models/OrcamentoItem");
const OrcamentoDTO = require ("../dtos/OrcamentoDTO");
const OrcamentoItemDTO = require ("../dtos/OrcamentoItemDTO");
const StatusDTO = require('../dtos/StatusDTO');
const orcamentoCQRS = require('../cqrs/orcamentoCQRS');
const Status = require('../models/Status');

const connection = require('../database/index')


/**
 * função para obter um orçamento com todos itens pelo id,
 * a função filta id e retorna se é valido, se sim retorna o OrcamentoDTo
 * @param {Number} id 
 * @returns OrcamentoDTO
 */
async function obterPorId(id){
    let orcamento = await Orcamento.findByPk(id);

    if(!orcamento){
        throw new NaoEncontradoErro(404, 'Não foi possivel encontrar um orcamento com id '+ id);
    }

    return await orcamentoCQRS.obterOrcamento(id);
    
}

/**
 * função para obter uma lista com todos orçamentos, sem os itens
 * @returns uma lista de OrcamentoDTO
 */
async function obterTodos(){
   return await orcamentoCQRS.obterOrcamentos();
}

/**
 * função para obter todos Status
 * @returns uma lista de StatusDTO
 */
async function obterTodosStatus(){
    let status = await Status.findAll();

    return status && status.map(m => new StatusDTO(m)) || [];
}

/**
 * função para cadastrar um orçamento, necessario passar os dados no modelo OrcamentoDTO, e os 
 * itens em um array no modelo OrcamentoItemDTO
 * @param {object} orcamentoDTO 
 * @returns OrcamentoDTO
 */
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

/**
 * função para atualizar um orçamento, necessario passar o id do orçamento e os dados no modelo
 * OrcamentoDTO e OrcamentoItemDTO,
 * essa função chama outras três funçoes privadas para adicionar, atualizar e deletar os itens desejados
 * @param {object} orcamentoDTO 
 * @returns OrcamentoDTO
 */
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


/**
 *  função privada para adicionar itens ao atualizar o orçamento
 * @param {object} orcamentoDTO 
 * @param {object} orcamentoBanco 
 * @param {*} transaction 
 */
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

/**
 *  função privada para atualizar os itens ao atualizar o orçamento
 * @param {object} orcamentoDTO 
 * @param {object} orcamentoBanco 
 * @param {*} transaction 
 */
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


/**
 *  função privada para deletar os itens ao atualizar o orçamento
 * @param {object} orcamentoDTO 
 * @param {object} orcamentoBanco 
 * @param {*} transaction 
 */
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
    atualizar,
    obterTodosStatus
}