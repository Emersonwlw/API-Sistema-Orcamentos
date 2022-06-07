'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clientes', 
      [
        {
          nome: 'Emerson Willian',
          email: "emersonwlw@gmail.com",
          cpfOuCnpj: "125651651653",
          telefone: "11561651616"
        }
       
      ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes');
  }
};
