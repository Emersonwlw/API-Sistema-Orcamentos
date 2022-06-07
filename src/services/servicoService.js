const {NaoAutorizadoErro, NaoEncontradoErro, AplicacaoErro} = require('../erros/typeErros');
const Servico = require("../models/Servicos");
const ServicoDTO = require ("../dtos/ServicoDTO");


async function obterPorId(id){
    let servico = await Servico.findByPk(id);

    if(!servico){
        throw new NaoEncontradoErro(404, 'Não foi possivel encontrar um servico com id '+ id);
    }

    return new ServicoDTO(servico);
    
}

async function obterTodos(){
    let servicos = await Servico.findAll();

    return servicos && servicos.map(s => new ServicoDTO(s)) || [];

}

async function cadastrar(servicoDTO) {

    let servico =  await Servico.create(servicoDTO);

    if(!servico){
        throw new AplicacaoErro(500, 'Não foi possivel cadastrar o servico');
    }

    return new ServicoDTO(servico);
 
}

async function atualizar(servicoDTO) {

    
    let servico = await Servico.findByPk(servicoDTO.id);
 
    if(!servico){
        throw new NaoEncontradoErro(404, 'Não foi encontrado um servico com o id '+ servicoDTO.id);

    }

    let atualizado = await Servico.update(servicoDTO, {where : {id: servicoDTO.id}});

    if(!atualizado){
        throw new AplicacaoErro(500, 'Não foi possivel atualizar o servico. ');

    }
    return servicoDTO;

}



module.exports = {
    obterPorId,
    obterTodos,
    cadastrar,
    atualizar
}