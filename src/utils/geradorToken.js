const md5 = require('md5');
const SECRET = 'qu1m3rr4';


function gerarHashdaSenha(senha){
    return md5(`@${senha}:${SECRET}@`);
}

function criarToken(usuario){

    let emailBase64 = Buffer.from(usuario.email).toString('base64');
    let data = new Date();

    let token = md5(`${emailBase64}.${SECRET}.${data.getTime()}`);
    return "Bearer "+ token;
    
}

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