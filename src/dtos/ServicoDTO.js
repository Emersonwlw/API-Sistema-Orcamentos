
const {ModeloInvalidoErro} = require('../erros/typeErros')
module.exports = class ServicoDTO {
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.descricao = obj.descricao;
        this.observacao = obj.observacao;
        this.valor = obj.valor || 0;
        this.criadoEm = obj.criadoEm;
        this.atualizadoEm = obj.atualizadoEm;
    }

    modeloValidoCadastro(){
       this._validarModelo()
    }

    modeloValidoAtualizacao(){
        this._validarModelo()
     }

    _validarModelo(){
        if(!this.descricao || this.valor <0 ){
            throw new ModeloInvalidoErro(400, "Os campos descrição e valor são obrigatórios!")
         }
    }
}