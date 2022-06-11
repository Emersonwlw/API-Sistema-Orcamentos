const Usuario = require('../models/usuario');
const perfil = require('../models/perfil');
const {NaoAutorizadoErro, NaoEncontradoErro, AplicacaoErro} = require('../erros/typeErros');
const geradorToken = require('../utils/geradorToken');
const usuarioCache = require ('../cache/usuarioCache');
const UsuarioDTO = require('../dtos/UsuarioDTO');
const PerfilDTO = require('../dtos/PerfilDTO');

/**
 * função para validar um usuario, usado na autenticação 
 * @param {String} email 
 * @param {String} senha 
 * @returns credencial
 */
async function validarUsuario(email, senha){
    
    //1º Saber se esse usuario existe no nosso bancode dados.
    email = email.toString().toLowerCase();
    let usuario = await Usuario.findOne({where: { email }});
    //Gerar um hash da senha,

    senha = geradorToken.gerarHashdaSenha(senha);
     //2º Preciso saber se a senha que ele passou é a correta

    if(!usuario || (usuario.senha != senha)){
            //Aqui lançar um erro
        throw new NaoAutorizadoErro(401, "Usuario ou senha inválidos"); 
    }
    console.log();
   
    //Gerar um token, uma credencial e enviar para o usuario
    let credencial = _criarCredencial(usuario);

    return credencial;

}   

/**
 * função privada para gerar um token de autenticação
 * @param {object} usuario 
 * @returns credencial
 */
function _criarCredencial(usuario){

    let dataExpiracao = geradorToken.gerarDataExpiracao();
    let credencial = usuarioCache.obterCredendial(usuario);

        if(credencial){
            if(credencial.dataExpiracao < new Date()){
                usuarioCache.removerNoCache(credencial.token);
        
            }else
            usuarioCache.atualizarDataExpiracao(credencial.token, dataExpiracao);
            return credencial;
        }

    let token  = geradorToken.criarToken(usuario);
    usuario.senha = undefined;

    credencial = {token, usuario, dataExpiracao}
    usuarioCache.adicionarnoCache(credencial);
    return credencial;

}

/**
 * função para fazer o logout do usuario, remove o token do cache
 * @param {*} token 
 */
async function logout (token){
    usuarioCache.removerNoCache(token);
}

/**
 * função para obter um usuario pelo id, necessario passar um id para a busca
 * @param {Number} id 
 * @returns UsuarioDTO
 */
async function obterPorId(id){
    let usuario = await Usuario.findByPk(id);

    if(!Usuario){
        throw new NaoEncontradoErro(404,'Não foi possivel encontrar o usuario pelo id '+ id);
    }
    usuario.senha = undefined;

    let usuarioDTO = new UsuarioDTO(usuario);
    let Perfil = await perfil.findByPk(usuario.idPerfil);
    usuarioDTO.perfil = new PerfilDTO(Perfil);

    return usuarioDTO;
}


/**
 * função para validar um token de usuario, utilizada em mid
 * @param {*} token 
 * @returns true ou false
 */
async function validarAutenticacao(token){

    let credencial = usuarioCache.obterCredendialPorToken(token);

    if(!credencial || credencial.dataExpiracao < new Date()){

        if(credencial){
            usuarioCache.removerNoCache(credencial.token);
        }
        return false;
    }

    return true;

}

/**
 * função para cadastrar um novo usuario, necessario passar os dados no modelo UsuarioDTO
 * @param {object} usuarioDTO 
 * @returns UsuarioDTO cadatrado
 */
async function cadastrar(usuarioDTO){

    usuarioDTO.senha = geradorToken.gerarHashdaSenha(usuarioDTO.senha);

    let usuario = await Usuario.create(usuarioDTO);

    if(!usuario){
        throw new AplicacaoErro(500, 'Falha ao cadastrar o usuario')
    }

    
    let dto =  new UsuarioDTO(usuario);
    dto.senha = undefined;
    dto.perfil = new PerfilDTO(await perfil.findByPk(dto.idPerfil));

    return dto;

}


/**
 * função para atualizar um usuario, necessario passar os dados no modelo UsuarioDTO
 * @param {object} usuarioDTO 
 * @returns UsuarioDTO atualizado
 */
async function atualizar(usuarioDTO){

    let usuario = await Usuario.findByPk(usuarioDTO.id);

    if(!Usuario){
        throw new NaoEncontradoErro(404,'Não foi possivel encontrar o usuario pelo id '+ id);
    }

    usuarioDTO.senha = usuario.senha;
    usuario = await Usuario.update(usuarioDTO, { where: { id: usuarioDTO.id }});

    if(!usuario || !usuario[0]){
        throw new AplicacaoErro(500, 'Falha ao atualizar o usuario com id ' + usuarioDTO.id );
    }

    usuarioDTO.senha = undefined;
    return usuarioDTO;

}

module.exports = {
    validarUsuario,
    logout,
    obterPorId,
    validarAutenticacao,
    cadastrar,
    atualizar
}