const servicoService = require('../services/servicoService');
const {NaoAutorizadoErro, ModeloInvalidoErro} = require('../erros/typeErros');
const ServicoDTO = require('../dtos/ServicoDTO');

class ServicoController {

 /**
  * Método para obter um serviço pelo seu id,
  * é necessario passar um id no endpoint
  * @param {*} req 
  * @param {*} res 
  * @returns servicoDTO
  */
    async obterPorId(req,res){
        const id = parseInt(req.params.id);

        try {
          if(!id || isNaN(id)){
              throw new ModeloInvalidoErro(400, 'Id invalido para consulta de serviço.');
          }
          let servico = await servicoService.obterPorId(id);
          
          return res.json(servico);
          
          
      } catch (error) {
          console.log(error);
          return res.status(error.status).json(error);
      }
    }

    /**
     * Método para obter uma lista com todos serviços
     * @param {*} req 
     * @param {*} res 
     * @returns uma lista de servicoDTO
     */

    async obterTodos(req,res){

        try {
       
          let servicos = await servicoService.obterTodos();
          
          return res.json(servicos);
          
          
      } catch (error) {
          console.log(error);
          return res.status(error.status).json(error);
      }
    }
     
    /**
     * Método para cadastrar um serviço, o body precisa estar no modelo serviçoDTO
     * @param {object} req 
     * @param {*} res 
     * @returns servicoDTO
     */
    async cadastrar(req,res){
        try {
            let servicoDTO = new ServicoDTO(req.body);
            servicoDTO.modeloValidoCadastro();

            let servicoCadastrado = await servicoService.cadastrar(servicoDTO);
            return res.json(servicoCadastrado);


        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }

    }

    /**
     * Método para atualizar um serviço, é necessario passar um id do serviço no body
     * os dados no body precisa estar no modelo servicoDTO
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async atualizar(req,res){
        const {id } = req.params;
        if(!id){
            throw new ModeloInvalidoErro(400, "O Id é obrigatório para atualizar o serviço");
        }
        try {
            let servicoDTO = new ServicoDTO(req.body);
            servicoDTO.id = parseInt(id);
            servicoDTO.modeloValidoAtualizacao();

            let servicoAtualizado = await servicoService.atualizar(servicoDTO);
            return res.json(servicoAtualizado);


        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }

    }

  
}

module.exports = ServicoController;
