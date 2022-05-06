require('dotenv').config();
require('../database');


const express = require ('express')
const cors = require ('cors')
const routes = require('../../routes')

const app = express();


app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(routes);

module.exports = app;
