'use strict';

const sequelize = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('orcamento-item', {
      id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement: true
      },

      idOrcamento:{
        type: Sequelize.BIGINT,
        allowNull: false
      }, 
      idServico:{
        type: Sequelize.BIGINT,
        allowNull: false
      },
      idPrestador:{
        type: Sequelize.BIGINT,
        allowNull: false
      },
      desconto:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      acrescimo:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      valor:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      valorTotal:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      observacao:{
        type: Sequelize.TEXT,
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
   return queryInterface.dropTable('orcamento-item')
  }
};
