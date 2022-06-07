const sequelize = require('../database/index');

const OrcamentoDTO = require('../dtos/OrcamentoDTO');
const ClienteDTO = require('../dtos/ClienteDTO');
const OrcamentoItemDTO = require('../dtos/OrcamentoItemDTO');
const PrestadorDTO = require('../dtos/PrestadorDTO');
const ServicoDTO = require('../dtos/ServicoDTO');
//const Status = require('../dtos/Status');
const UsuarioDTO = require('../dtos/UsuarioDTO');

const sqlCapa = `
select 
	O."id",O."descricao",CL.id as "idCliente", CL."nome" as "nomeCliente",
	CL."telefone" as "telefoneCliente", CL."cpfOuCnpj" as "cpfOuCnpjCliente",
	O."desconto", O."acrescimo", O."valorTotal"
from public.orcamentos O
left join public.clientes CL on O."idCliente" = CL."id"
`;

const sqlOrcamento = `
select 
	O.id,O."descricao",CL.id as "idCliente", CL."nome" as "nomeCliente",
	CL."telefone" as "telefoneCliente", CL."cpfOuCnpj" as "cpfOuCnpjCliente",
	O."desconto", O."acrescimo", O."valorTotal", O."criadoEm", O."atualizadoEm",
	OI.id as "idItem",
	OI."idServico", S."descricao" as "descricaoServico", S."valor" as "valorServico",
	S."observacao" as "observacaoServico",
	OI."idPrestador", PR."nome" as "nomePrestador", PR."email" as "emailPrestador",
	PR."telefone" as "telefonePrestador", PR."cpfOuCnpj" as "cpfOuCnpjPrestador",
	PR."observacao" as "observacaoPrestador", PR."criadoEm" as "dataCriacaoPrestador",
	OI."desconto" as "descontoItem",
	OI."acrescimo" as "acrescimoItem", OI."valor" as "ValorItem",
	OI."valorTotal" as "valorTotalItem", OI."observacao" as "observacaoItem",
	OI."criadoEm" as "dataCriacaoItem"
from public.orcamentos O
left join public."OrcamentoItems" OI on O.id = OI."idOrcamento"
left join public.clientes CL on O."idCliente" = CL."id"
left join public.servicos S on OI."idServico" = S."id"
left join public.prestadores PR on OI."idPrestador" = PR."id"`;

/**
 * Método que retorna uma lista com a capa dos orçamentos.
 * Aqui não retorna os itens
 * @returns OrcamentoDTO, somente a capa.
 */

async function obterOrcamentos(){
    let orcamentos = await sequelize.query(sqlCapa);
    orcamentos = orcamentos[0];

   return orcamentos.map(o =>{
        let orcamento = new OrcamentoDTO(o);
        orcamento.cliente = new ClienteDTO({
            id: o.idCliente,
            nome: o.nomeCliente,
	        telefone: o.telefoneCliente, 
            cpfOuCnpj: o.cpfOuCnpjCliente
        });
        return orcamento;
    })
    //aqui temos que montar um objeto orcamento dinamicamente


}

/**
 * Método que retorna o Orçamento com todos os seus itens
 * @param {Number} idOrcamento 
 * @returns OrcamentoDTO
 */

async function obterOrcamento(idOrcamento){

    let where = `where O.id = ${idOrcamento}`
    let resulado = await sequelize.query(`${sqlOrcamento} ${where}`);
	orcamentos = resulado[0];

	let orcamentoBanco = orcamentos[0];

	let orcamento = new OrcamentoDTO(orcamentoBanco);
		orcamento.cliente = new ClienteDTO({
			id: orcamentoBanco.idCliente,
			nome: orcamentoBanco.nomeCliente,
			telefone: orcamentoBanco.telefoneCliente, 
			cpfOuCnpj: orcamentoBanco.cpfOuCnpjCliente
			});

		orcamento.itens = orcamentos.map(item =>{
		let servico = new ServicoDTO({
			id: item.idServico, 
			descricao: item.descricaoServico, 
			valor: item.valorServico,
			observacao: item.observacaoServico		
		});
		let prestador = new PrestadorDTO({
			id: item.idPrestador, 
			nome: item.nomePrestador,
			email: item.emailPrestador,
			telefone: item.telefonePrestador, 
			cpfOuCnpj: item.cpfOuCnpjPrestador,
			observacao: item.observacaoPrestador, 
			criadoEm: item.dataCriacaoPrestador
		});

			return new OrcamentoItemDTO({
			id: item.idItem,
			servico,
			prestador,
			desconto:	item.descontoItem,
			acrescimo:	item.acrescimoItem,
			valor:	item.ValorItem,
			valorTotal:	item.valorTotalItem, 
			observacao:	item.observacaoItem,
			criadoEm:	item.dataCriacaoItem

		});
		
	});

	return orcamento;
}

module.exports = {
    obterOrcamento,
    obterOrcamentos
}