const md5 = require('md5');
const SECRET = 'qu1m3rr4';


/**
 * função para gerar um hash da senha que o usuario passa no req
 * @param {String} senha 
 * @returns hash gerado em - String
 */
function gerarHashdaSenha(senha){
    return md5(`@${senha}:${SECRET}@`);
}


/**
 * função para criar um token do usuario, com base em informações do mesmo
 * @param {object} usuario 
 * @returns token - String
 */
function criarToken(usuario){

    let emailBase64 = Buffer.from(usuario.email).toString('base64');
    let data = new Date();

    let token = md5(`${emailBase64}.${SECRET}.${data.getTime()}`);
    return "Bearer "+ token;
    
}

/**
 * função para gerar data de expiração de um token
 * @returns dataExpiracao - date
 */
function gerarDataExpiracao(){
    let data = new Date();
    let duracao = process.env.DURACAO_TOKEN * 60000;
    let dataExpiracao = new Date(data.getTime() + duracao);
    return dataExpiracao;
}

module.exports = {
    gerarHashdaSenha,
    criarToken,
    gerarDataExpiracao
}