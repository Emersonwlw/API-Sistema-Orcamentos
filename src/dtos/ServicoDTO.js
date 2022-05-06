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

}