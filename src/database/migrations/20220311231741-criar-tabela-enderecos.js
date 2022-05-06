'use strict';

const sequelize = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('enderecos', {
      id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement: true
      },

      idCliente:{
        type: Sequelize.BIGINT,
        allowNull: false
      },
      cep:{
        type: Sequelize.STRING,
        allowNull: true
      },
      rua:{
        type: Sequelize.STRING,
        allowNull: true
      },
      numero:{
        type: Sequelize.STRING,
        allowNull: true
      },
      complemento:{
        type: Sequelize.STRING,
        allowNull: true
      },
      bairro:{
        type: Sequelize.STRING,
        allowNull: true
      },
      cidade:{
        type: Sequelize.STRING,
        allowNull: true
      },
      uf:{
        type: Sequelize.STRING,
        allowNull: true
      },

      criadoEm:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },

      atualizadoEm:{
        type: Sequelize.DATE,
        defaultValue: null,
        allowNull: true
      },
    
    });
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.dropTable('perfis')
  }
};
