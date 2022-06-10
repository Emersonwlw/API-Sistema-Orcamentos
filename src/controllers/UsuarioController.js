const usuarioService = require('../services/usuarioService');
const {NaoAutorizadoErro, ModeloInvalidoErro} = require('../erros/typeErros');
const UsuarioDTO = require('../dtos/UsuarioDTO');

class UsuarioController {

    /**
     * Método para fazer o login do usuario no sistema,
     * necessario passar o email e senha no body
     * @param {object} req 
     * @param {*} res 
     * @returns sucesso ou falha junto com o token
     */
    async login(req, res){
      const {email, senha} = req.body;

      try {
         if(!email || !senha){
            throw new NaoAutorizadoErro(401, 'Usuario ou senha inválidos');
         } 
         let credencial = await usuarioService.validarUsuario(email,senha);
         return res.json(credencial);
      } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
      }


    }

    /**
     * Método para deslogar do sistema
     * @param {*} req 
     * @param {*} res 
     * @returns mesagem de sucesso
     */
    async logout(req, res){

        try {
           await usuarioService.logout(req.headers.authorization); 
           return res.status(200).json("Certo"); 
        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }
    }

    /**
     *  Método para obter um usuario pelo id,
     * necessario passar o id no endpoint para pesquisa
     * @param {*} req 
     * @param {*} res 
     * @returns usuarioDTO
     */
    async obterPorId(req,res){
      const {id } = req.params;
        try {
          if(!id){
              throw new ModeloInvalidoErro(400, "O Id é obrigatório para obter o usuario");
          }
          let usuario = await usuarioService.obterPorId(id);
          return res.json(usuario);
          
      } catch (error) {
          console.log(error);
          return res.status(error.status).json(error);
      }
    }

     
    /**
     * Método para cadastrar um usuario,
     * os dados no body precisa esta no modelo usuarioDTO
     * @param {object} req 
     * @param {*} res 
     * @returns usuarioDTO cadastrado
     */
    async cadastrar(req,res){
        try {
            let usuarioDTO = new UsuarioDTO(req.body);
            usuarioDTO.modeloValidoCadastro();

            let usuarioCadastrado = await usuarioService.cadastrar(usuarioDTO);
            return res.json(usuarioCadastrado);


        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }

    }


    /**
     * Método para atualizar um usuario,
     * é necessario passar o id no body e os dados a atualizar no modelo usuarioDTO
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async atualizar(req,res){
        const {id } = req.params;
        if(!id){
            throw new ModeloInvalidoErro(400, "O Id é obrigatório para atualizar o usuario");
        }
        try {
            let usuarioDTO = new UsuarioDTO(req.body);
            usuarioDTO.id = parseInt(id);
            usuarioDTO.modeloValidoAtualizacao();

            let usuarioAtualizado = await usuarioService.atualizar(usuarioDTO);
            return res.json(usuarioAtualizado);


        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }

    }

}

module.exports = UsuarioController;
