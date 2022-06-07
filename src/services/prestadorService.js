const {NaoAutorizadoErro, NaoEncontradoErro, AplicacaoErro} = require('../erros/typeErros');
const Prestador = require("../models/Prestadores");
const PrestadorDTO = require ("../dtos/PrestadorDTO");


async function obterPorId(id){
    let prestador = await Prestador.findByPk(id);

    if(!prestador){
        throw new NaoEncontradoErro(404, 'Não foi possivel encontrar um prestador com id '+ id);
    }

    return new PrestadorDTO(servico);
    
}

async function obterTodos(){
    let prestadores = await Prestador.findAll();

    return prestadores && prestadores.map(p => new PrestadorDTO(p)) || [];

}

async function cadastrar(prestadorDTO) {

    let prestador =  await Prestador.create(prestadorDTO);

    if(!prestador){
        throw new AplicacaoErro(500, 'Não foi possivel cadastrar o prestador');
    }

    return new PrestadorDTO(prestador);
 
}

async function atualizar(prestadorDTO) {

    
    let prestador = await Prestador.findByPk(prestadorDTO.id);
 
    if(!prestador){
        throw new NaoEncontradoErro(404, 'Não foi encontrado um prestador com o id '+ prestadorDTO.id);

    }

    let atualizado = await Prestador.update(prestadorDTO, {where : {id: prestadorDTO.id}});

    if(!atualizado){
        throw new AplicacaoErro(500, 'Não foi possivel atualizar o prestador. ');

    }
    return prestadorDTO;

}



module.exports = {
    obterPorId,
    obterTodos,
    cadastrar,
    atualizar
}