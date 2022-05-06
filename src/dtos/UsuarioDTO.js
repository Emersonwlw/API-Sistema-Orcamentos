const { ModeloInvalidoErro } = require("../erros/typeErros");
const PerfilDTO = require("./PerfilDTO");

module.exports = class UsuarioDTO {
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.nome = obj.nome;
        this.email = obj.email;
        this.senha = obj.senha;
        this.perfil = obj.perfil && new PerfilDTO(obj.perfil);
        this.idPerfil = obj.idPerfil;
        
        this.dataInativacao = obj.dataInativacao;
        this.criadoEm = obj.criadoEm;
        this.atualizadoEm = obj.atualizadoEm;
    }

    modeloValidoCadastro(){
        let validacao =  !!(this.email && this.senha && this.nome && this.idPerfil);
    
        if(!validacao){
            throw new ModeloInvalidoErro(400, "Os campos nome, email, senha e idPerfil são obrigatórios ");
            
        }
        
    }
    modeloValidoAtualizacao(){
        let validacao =  !!(this.id && this.email && this.nome && this.idPerfil);
    
        if(!validacao){
            throw new ModeloInvalidoErro(400, "Os campos id, nome, email e idPerfil são obrigatórios ");
            
        }
        
    }


}