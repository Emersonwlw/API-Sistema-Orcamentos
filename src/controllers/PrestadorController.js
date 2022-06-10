const prestadorService = require('../services/prestadorService');
const {NaoAutorizadoErro, ModeloInvalidoErro} = require('../erros/typeErros');
const PrestadorDTO = require('../dtos/PrestadorDTO');

class PrestadorController {

 /**
  * Método para obter um prestador pelo seu id, é necessario passar o id no endpoint
  * @param {*} req 
  * @param {*} res 
  * @returns prestadorDTO
  */
    async obterPorId(req,res){
        const id = parseInt(req.params.id);

        try {
          if(!id || isNaN(id)){
              throw new ModeloInvalidoErro(400, 'Id invalido para consulta de serviço.');
          }
          let prestador = await prestadorService.obterPorId(id);
          
          return res.json(prestador);
          
          
      } catch (error) {
          console.log(error);
          return res.status(error.status).json(error);
      }
    }


    /**
     * Métodos para obter uma lista com todos prestadores
     * @param {*} req 
     * @param {*} res 
     * @returns uma lista de prestadorDTO
     */
    async obterTodos(req,res){

        try {
       
          let prestadores = await prestadorService.obterTodos();
          
          return res.json(prestadores);
          
          
      } catch (error) {
          console.log(error);
          return res.status(error.status).json(error);
      }
    }
     
    /**
     * Método para cadastrar um prestador de serviços
     * @param {object} req 
     * @param {*} res 
     * @returns prestadorDTO cadastrado
     */
    async cadastrar(req,res){
        try {
            let prestadorDTO = new PrestadorDTO(req.body);
            prestadorDTO.modeloValidoCadastro();

            let prestadorCadastrado = await prestadorService.cadastrar(prestadorDTO);
            return res.json(prestadorCadastrado);


        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }

    }

    /**
     * Método para atualizar um prestador de serviço,
     * é necessario passar o id do prestador e os dados no modelo prestadorDTO no body
     * @param {object} req 
     * @param {*} res 
     * @returns servicoDTO atualizado
     */
    async atualizar(req,res){
        const {id } = req.params;
        if(!id){
            throw new ModeloInvalidoErro(400, "O Id é obrigatório para atualizar o prestador");
        }
        try {
            let prestadorDTO = new PrestadorDTO(req.body);
            prestadorDTO.id = parseInt(id);
            prestadorDTO.modeloValidoAtualizacao();

            let prestadorAtualizado = await prestadorService.atualizar(prestadorDTO);
            return res.json(prestadorAtualizado);


        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }

    }


}

module.exports = PrestadorController;
