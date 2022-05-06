const ModeloInvalidoErro = class ModeloInvalidoErro {
    /**
     * Classe utilizada para exceções de modelos e dtos.
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor(status, mensagem){
        this.status = status || 400;
        this.mensagem = mensagem || 'O modelo informado é invalido';
        this.name = 'ModeloInvalido';
        this.stack = (new Error()).stack;
    }
}

const NaoAutorizadoErro = class NaoAutorizadoErro {
    /**
     * Classe utilizada para exceções de acessos ou recursos não autorizados.
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor(status, mensagem){
        this.status = status || 403;
        this.mensagem = mensagem || 'Recurso não autorizado';
        this.name = 'Naoautorizado';
        this.stack = (new Error()).stack;
    }
}


const NaoEncontradoErro = class NaoEncontradoErro {
    /**
     * Classe utilizada para exceções de objetos ou recursos não encontrados.
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor(status, mensagem){
        this.status = status || 404;
        this.mensagem = mensagem || 'Não encontrado';
        this.name = 'NaoEncontrado';
        this.stack = (new Error()).stack;
    }
}


const AplicacaoErro = class AplicacaoErro {
    /**
     * Classe utilizada para exceções de modelos e dtos.
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor(status, mensagem){
        this.status = status || 500;
        this.mensagem = `Erro interno na aplicação ${mensagem && '- ' + mensagem}`;
        this.name = 'Aplicacao';
        this.stack = (new Error()).stack;
    }
}


module.exports = {
    ModeloInvalidoErro,
    NaoAutorizadoErro,
    NaoEncontradoErro,
    AplicacaoErro

}