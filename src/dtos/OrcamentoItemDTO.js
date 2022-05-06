const ServicoDTO = require('./ServicoDTO');
const PrestadorDTO = require('./PrestadorDTO');

module.exports = class OrcamentoItemDTO {
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.idOrcamento = obj.idOrcamento;
        this.servico = obj.servico && new ServicoDTO(obj.servico);
        this.prestador = obj.prestador && new PrestadorDTO(obj.prestador);
        this.desconto = obj.desconto || 0;
        this.acrescimo = obj.acrescimo || 0;
        this.valorTotal = obj.valorTotal || 0;
        this.valor = obj.valor || 0;
        this.observacao = obj.observacao || 0;
        this.criadoEm = obj.criadoEm;
        this.atualizadoEm = obj.atualizadoEm;
    }

    calcularValorTotal(){
        this.valorTotal = this.valor + this.acrescimo - this.desconto;
        return this.valorTotal;
    }

}