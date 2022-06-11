const clienteService = require('../services/clienteService');
const {NaoAutorizadoErro, ModeloInvalidoErro} = require('../erros/typeErros');
const ClienteDTO = require('../dtos/ClienteDTO');

/**
 * Classe ClienteController, validação e controle de dados 
 * @author Emersonwlw
 */
class ClienteController {

 /**
  * Metodo para obter um cliente através do id dele
  * @param {object} req 
  * @param {object} res 
  * @returns clienteDTO
  */
    async obterPorId(req,res){
        const id = parseInt(req.params.id);

        try {
          if(!id || isNaN(id)){
              throw new ModeloInvalidoErro(400, 'Id invalido para consulta de cliente.');
          }
          let cliente = await clienteService.obterPorId(id);
          
          return res.json(cliente);
          
          
      } catch (error) {
          console.log(error);
          return res.status(error.status).json(error);
      }
    }

    /**
     * Metodo para obter uma lista com todos clientes
     * @param {*} req 
     * @param {*} res 
     * @returns lista de clienteDTO
     */
    async obterTodos(req,res){

        try {
       
          let clientes = await clienteService.obterTodos();
          
          return res.json(clientes);
          
          
      } catch (error) {
          console.log(error);
          return res.status(error.status).json(error);
      }
    }

    /**
     * Metodo para cadastrar um cliente
     * @param {object} req 
     * @param {object} res 
     * @returns clienteDTO
     */
     
    async cadastrar(req,res){
        try {
            let clienteDTO = new ClienteDTO(req.body);
            clienteDTO.modeloValidoCadastro();

            let clienteCadastrado = await clienteService.cadastrar(clienteDTO);
            return res.json(clienteCadastrado);


        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }

    }

    /**
     * Método para atualizar um cliente,
     * é necessario passar o id para atualizar o cliente
     * @param {object} req 
     * @param {object} res 
     * @returns clienteDTO - atualizado
     */
    async atualizar(req,res){
        const {id } = req.params;
        if(!id){
            throw new ModeloInvalidoErro(400, "O Id é obrigatório para atualizar o cliente");
        }
        try {
            let clienteDTO = new ClienteDTO(req.body);
            clienteDTO.id = parseInt(id);
            clienteDTO.modeloValidoAtualizacao();

            let clienteAtualizado = await clienteService.atualizar(clienteDTO);
            return res.json(clienteAtualizado);


        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }

    }


}

module.exports = ClienteController;
