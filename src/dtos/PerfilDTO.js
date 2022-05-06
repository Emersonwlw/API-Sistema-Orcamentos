module.exports = class PerfilDTO {
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.descricao = obj.descricao;
        this.criadoEm = obj.criadoEm;
        this.atualizadoEm = obj.atualizadoEm;
    }

}