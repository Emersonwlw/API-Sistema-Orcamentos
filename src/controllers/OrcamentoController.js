const orcamentoService = require('../services/orcamentoService');
const {NaoAutorizadoErro, ModeloInvalidoErro} = require('../erros/typeErros');
const OrcamentoDTO = require('../dtos/OrcamentoDTO');

class OrcamentoController {

 
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

    async obterTodos(req,res){

        try {
       
          let orcamentos = await orcamentoService.obterTodos(); 
          return res.json(orcamentos);
          
          
      } catch (error) {
          console.log(error);
          return res.status(error.status).json(error);
      }
    }
     
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

    inativar(req, res){
        
    }
}

module.exports = OrcamentoController;
