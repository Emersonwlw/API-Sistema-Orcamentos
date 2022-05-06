'use strict';

const sequelize = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('orcamentos', {
      id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement: true
      },

      descricao:{
        type: Sequelize.STRING,
        allowNull: false
      },
      idCliente:{
        type: Sequelize.BIGINT,
        allowNull: false
      }, 
      observacao:{
        type: Sequelize.TEXT,
        allowNull: true
      },
      desconto:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      acrescimo:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      valorTotal:{
        type: Sequelize.DOUBLE,
        allowNull: false
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
   return queryInterface.dropTable('orcamentos')
  }
};
