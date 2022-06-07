'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('prestadores', 
    [
      {
        nome: 'Emerson Carlos',
        email: "emersonprestador@gmail.com" ,
        telefone: "15161651651",
        cpfOuCnpj: "16516516519",
        observacao: "30 anos de experiencia"
      },
      {
        nome: 'José Carlos Pesto',
        email: "josecarlos@gmail.com" ,
        telefone: "156561479849",
        cpfOuCnpj: "99984894949",
        observacao: "20 anos de experiencia"
      }
     
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('prestadores');
  }
};
