'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('servicos', 
      [
        {
          descricao: 'Pintura M² Interno',
          valor: 120.0 ,
          observacao: "Pintura m² interno até 3 demão de tinta"     
        },
        {
          descricao: 'Pintura M² Externo',
          valor: 150.0 ,
          observacao: "Pintura m² externo até 3 demão de tinta"     
        }
       
      ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('servicos');
  }
};
