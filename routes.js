const { Router } = require('express');
const express = require('express')
const routes = express.Router();
const usuarioService = require('./src/services/usuarioService');

const { route } = require('express/lib/application');

const UsuarioController = require('./src/controllers/UsuarioController');
const ClienteController = require('./src/controllers/ClienteController');
const servicoController = require('./src/controllers/ServicoController');
const prestadorController = require('./src/controllers/PrestadorController');
const OrcamentoController = require('./src/controllers/OrcamentoController');

const cli = require('nodemon/lib/cli');


const clientecontroller = new ClienteController();
const usuariocontroller = new UsuarioController();
const servicocontroller = new servicoController();
const prestadorcontroller = new prestadorController();
const orcamentocontroller = new OrcamentoController();

routes.use(async (req, res, next )=>{

    if(process.env.AUTENTICACAO != 'FALSE'){

        const {authorization } = req.headers;
        let autenticado = await usuarioService.validarAutenticacao(authorization);

        if(!autenticado && req.originalUrl != '/login'){
            return res.status(401).json({
                status: 401,
                message: 'Usuário não autenticado',
                name: 'NaoAutorizado'
            }); 
        }
        next();
    }else{
        next();
    }
       
});

//rotas de usuario
routes.post("/login", usuariocontroller.login);
routes.delete("/logout", usuariocontroller.logout);
routes.get("/usuarios/:id", usuariocontroller.obterPorId);
routes.post("/usuarios", usuariocontroller.cadastrar);
routes.put("/usuarios/:id", usuariocontroller.atualizar);


//rotas de cliente
routes.get('/clientes', clientecontroller.obterTodos);
routes.get('/clientes/:id', clientecontroller.obterPorId );
routes.post('/clientes', clientecontroller.cadastrar);
routes.put('/clientes/:id', clientecontroller.atualizar);

//rotas de servico
routes.get('/servico', servicocontroller.obterTodos);
routes.get('/servico/:id', servicocontroller.obterPorId );
routes.post('/servico', servicocontroller.cadastrar);
routes.put('/servico/:id', servicocontroller.atualizar);

//rotas de prestador
routes.get('/prestador', prestadorcontroller.obterTodos); 
routes.get('/prestador/:id', prestadorcontroller.obterPorId );
routes.post('/prestador', prestadorcontroller.cadastrar);
routes.put('/prestador/:id', prestadorcontroller.atualizar);

//Rotas de orcamento

routes.post('/orcamentos', orcamentocontroller.cadastrar);
routes.get('/orcamentos', orcamentocontroller.obterTodos); 
routes.get('/orcamentos/:id', orcamentocontroller.obterPorId);
routes.put('/orcamentos/:id', orcamentocontroller.atualizar);
routes.get('/status', orcamentocontroller.obterTodosStatus);


module.exports = routes;