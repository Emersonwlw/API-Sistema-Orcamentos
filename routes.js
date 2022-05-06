const { Router } = require('express');
const express = require('express')
const routes = express.Router();
const usuarioService = require('./src/services/usuarioService');
const UsuarioController = require('./src/controllers/UsuarioController');
const { route } = require('express/lib/application');
const usuariocontroller = new UsuarioController();
const ClienteController = require('./src/controllers/ClienteController');
const cli = require('nodemon/lib/cli');
const clientecontroller = new ClienteController();



routes.use(async (req, res, next )=>{
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



module.exports = routes;