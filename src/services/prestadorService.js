const {NaoAutorizadoErro, NaoEncontradoErro, AplicacaoErro} = require('../erros/typeErros');
const Prestador = require("../models/Prestadores");
const PrestadorDTO = require ("../dtos/PrestadorDTO");

/**
 * função para obter um prestador pelo id, necessario passar um id valido 
 * @param {Number} id 
 * @returns PrestadorDTO
 */
async function obterPorId(id){
    let prestador = await Prestador.findByPk(id);

    if(!prestador){
        throw new NaoEncontradoErro(404, 'Não foi possivel encontrar um prestador com id '+ id);
    }

    return new PrestadorDTO(servico);
    
}
/**
 * função para obter todos prestadores
 * @returns uma lista de PrestadorDTO
 */
async function obterTodos(){
    let prestadores = await Prestador.findAll();

    return prestadores && prestadores.map(p => new PrestadorDTO(p)) || [];

}

/**
 * função para cadastrar um prestador, necessario passa os dados no modelo PrestadorDTO
 * @param {object} prestadorDTO 
 * @returns PrestadorDTO - cadastrado
 */
async function cadastrar(prestadorDTO) {

    let prestador =  await Prestador.create(prestadorDTO);

    if(!prestador){
        throw new AplicacaoErro(500, 'Não foi possivel cadastrar o prestador');
    }

    return new PrestadorDTO(prestador);
 
}

/**
 * função para atualizar um prestador, necessario passar os dados no modelo PrestadorDTO
 * @param {object} prestadorDTO 
 * @returns PrestadorDTO
 */
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