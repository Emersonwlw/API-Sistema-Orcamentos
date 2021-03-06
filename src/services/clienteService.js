const Cliente = require('../models/Cliente');
const Endereco = require('../models/Enderecos');
const ClienteDTO = require('../dtos/ClienteDTO');
const EnderecoDTO = require('../dtos/EnderecoDTO');
const {NaoAutorizadoErro, NaoEncontradoErro, AplicacaoErro} = require('../erros/typeErros');
const { Client } = require('pg/lib');
const cliente = require('../models/Cliente');

/**
 * função para obter um cliente pelo id, necessario passar um id para a mesma
 * essa função filtra e verifica se o id é valido, caso possitivo retorna um modelo clietneDTO
 * @param {Number} id 
 * @returns ClienteDTO
 */
async function obterPorId(id){
    let cliente = await Cliente.findByPk(id);

    if(!cliente){
        throw new NaoEncontradoErro(404, 'Não foi possivel encontrar um cliente com id '+ id);
    }

    cliente =  new ClienteDTO(cliente);
    let enderecos = await Endereco.findAll({where: {idCliente: id}});

    cliente.enderecos = enderecos.map(e => new EnderecoDTO(e));

    return cliente;
    
}

/**
 * função para cadastrar um cliente,
 * é necessarios passar os dados no modelo clienteDTO
 * @param {object} clienteDTO 
 * @returns ClienteDTO - Cadastrado
 */
async function cadastrar(clienteDTO) {

    let cliente =  await Cliente.create(clienteDTO);

    if(!cliente){
        throw new AplicacaoErro(500, 'Não foi possivel cadastrar o cliente');
    }

    let enderecos = [];
    for(var endereco of clienteDTO.enderecos){
        endereco.idCliente = parseInt(cliente.id); 
        let novoEndereco = await Endereco.create(endereco);

        enderecos.push(new EnderecoDTO(novoEndereco));
    }

    cliente = new ClienteDTO(cliente);
    cliente.enderecos = enderecos;

    return cliente;


}

/**
 * função para atualizar um cliente,
 * é necessario passar os dados no modelo ClienteDTO
 * @param {object} clienteDTO 
 * @returns ClienteDTO - Atualizado
 */
async function atualizar(clienteDTO) {

    
    let cliente = await Cliente.findByPk(clienteDTO.id);
 
    if(!cliente){
        throw new NaoEncontradoErro(404, 'Não foi encontrado um cliente com o id '+ clienteDTO.id);

    }

    let atualizado = await Cliente.update(clienteDTO, {where : {id: clienteDTO.id}});

    if(!atualizado){
        throw new AplicacaoErro(500, 'Não foi possivel atualizar o cliente. ');

    }


    let enderecos = [];
    for( var endereco of clienteDTO.enderecos){
        let atualizado = await Endereco.update(endereco, {where: {id: endereco.id}});
        enderecos.push(new EnderecoDTO(atualizado));
        if(!atualizado){
            throw new AplicacaoErro(500, 'Não foi possivel atualizar o endereço. ');
        }

    }

    clienteDTO.enderecos = enderecos;

    return clienteDTO;

}

/**
 * função para obter uma lista com todos clientes
 * @returns uma lista de ClienteDTO
 */

async function obterTodos(){
    let clientes = await Cliente.findAll();

    return clientes && clientes.map(c => new ClienteDTO(c)) || [];

}

module.exports = {
    cadastrar,
    atualizar,
    obterPorId,
    obterTodos
}