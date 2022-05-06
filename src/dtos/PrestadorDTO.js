const {ModeloInvalidoErro} = require('../erros/typeErros');

module.exports = class PrestadorDTO {
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.nome= obj.nome;
        this.email= obj.email;
        this.cpfOuCnpj= obj.cpfOuCnpj;
        this.telefone= obj.telefone;
        this.observacao= obj.observacao; 
        this.criadoEm= obj.criadoEm;
        this.atualizadoEm= obj.atualizadoEm;
    }


    modeloValidoCadastro(){
        this._validarModelo();
    }

    modeloValidoAtualizacao(){
        this._validarModelo();
    }
    _validarModelo(){
        if(!this.nome){
            throw new ModeloInvalidoErro(400, "O nome é obrigatorio para cadastro");
        }
    }
  
}