const orcamentoService = require('../services/orcamentoService');
const {NaoAutorizadoErro, ModeloInvalidoErro} = require('../erros/typeErros');
const OrcamentoDTO = require('../dtos/OrcamentoDTO');

class OrcamentoController {

 /**
  * Método para obter um orçamento pelo seu id
  * @param {object} req 
  * @param {object} res 
  * @returns orcamentoDTO - Junto com todos os itens do orçamento
  */
    async obterPorId(req,res){
        const id = parseInt(req.params.id);

        try {
          if(!id || isNaN(id)){
              throw new ModeloInvalidoErro(400, 'Id invalido para consulta de serviço.');
          }
          let orcamento = await orcamentoService.obterPorId(id);
          
          return res.json(orcamento);
          
          
      } catch (error) {
          console.log(error);
          return res.status(error.status).json(error);
      }
    }

    /**
     * Método para obter uma lista com todos orçamentos, 
     * sem os seus itens
     * @param {object} req 
     * @param {object} res 
     * @returns uma lista de orcamentoDTO
     */
    async obterTodos(req,res){

        try {
       
          let orcamentos = await orcamentoService.obterTodos(); 
          return res.json(orcamentos);
          
          
      } catch (error) {
          console.log(error);
          return res.status(error.status).json(error);
      }
    }

    /**
     * Método para cadastrar um orcamento, e também seus itens
     * @param {*} req 
     * @param {*} res 
     * @returns orcamentoDTO e seus Itens
     */
     
    async cadastrar(req,res){
        try {
            let orcamentoDTO = new OrcamentoDTO(req.body);
            
            //orcamentoDTO.modeloValidoCadastro();

            let orcamentoCadastrado = await orcamentoService.cadastrar(orcamentoDTO);
            return res.json(orcamentoCadastrado);


        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }

    }

    /**
     * Método para atualizar um orçamento e seus itens,
     * é necessario passar o id do orçamento
     * @param {object} req 
     * @param {object} res 
     * @returns orcamentoDTO e seus itens atualizado
     */
    async atualizar(req,res){
        const {id } = req.params;
        if(!id){
            throw new ModeloInvalidoErro(400, "O Id é obrigatório para atualizar o orçamento");
        }
        try {
            let orcamentoDTO = new OrcamentoDTO(req.body);
            orcamentoDTO.id = parseInt(id);
            //orcamentoDTO.modeloValidoAtualizacao();

            let orcamentoAtualizado = await orcamentoService.atualizar(orcamentoDTO);
            return res.json(orcamentoAtualizado);

 
        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }

    }


}

module.exports = OrcamentoController;
