'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('usuarios', 
      [
        {
          nome: 'Administrador',
          email: "administradorservice@gmail.com",
          senha: "a5162446571317e15f1a0f94f4a474f7",
          idPerfil: 1,
          dataInativacao: null
        }
       
      ]);
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios');
  }
};
