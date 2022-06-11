const usuariosLogados = [];
const { NaoAutorizadoErro} = require('../erros/typeErros');


/**
 * função que adiciona uma credecial ao cache da aplicação
 * @param {String} credencial 
 */
function adicionarnoCache(credencial){

    if(!credencial || !credencial.usuario || !credencial.token || !credencial.dataExpiracao){
        throw new NaoAutorizadoErro();


    }
    usuariosLogados.push(credencial);


}

/**
 * função para remover uma credencial do cache da aplicação 
 * @param {String} token 
 */
function removerNoCache(token){
    let indice = usuariosLogados.findIndex(credencial => credencial.token == token);
    if(!isNaN(indice)){
        usuariosLogados.splice(indice, 1)
    }
}


/**
 * função obter uma credencial do usuario, que esta armazenada no cache da aplicação
 * @param {object} usuario 
 * @returns 
 */
function obterCredendial(usuario){
    let credencial = usuariosLogados.find(c => c.usuario.id == usuario.id);
    return credencial;

}

/**
 * função para obter uma credencial pelo token do usuario
 * @param {*} token 
 * @returns credencial - String
 */
function obterCredendialPorToken(token){
    let credencial = usuariosLogados.find(c => c.token == token);
    return credencial;
    
}

/**
 * função para atualizar a data de expiração de uma credencial no cache
 * @param {String} token 
 * @param {Date} dataExpiracao 
 */
function atualizarDataExpiracao(token, dataExpiracao){
    let indice = usuariosLogados.findIndex(c => c.token == token);

    if(!isNaN(indice)){
        usuariosLogados[indice].dataExpiracao = dataExpiracao;

    }
}

module.exports = {
    adicionarnoCache,
    removerNoCache,
    obterCredendial,
    obterCredendialPorToken,
    atualizarDataExpiracao
}
