const Sequelize = require('sequelize');
const dbconfig = require('../config/database');
const connection = new Sequelize(dbconfig);

const Perfil = require ('../models/perfil');
const Usuario = require ('../models/usuario');
const Cliente = require('../models/Cliente');
const Endereco = require('../models/Enderecos');
const Status = require('./models/Status');
const Prestador = require('../models/Prestador');
const Servico = require('../models/Servico');
const Orcamento = require('../models/Orcamento');
const OrcamentoItem = require('../models/OrcamentoItem');

Perfil.init(connection);
Usuario.init(connection);
Cliente.init(connection);
Endereco.init(connection);
Status.init(connection);
Prestador.init(connection);
Servico.init(connection);
Orcamento.init(connection);
OrcamentoItem.init(connection);

module.exports = connection;

