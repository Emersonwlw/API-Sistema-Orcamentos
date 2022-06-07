'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
 
      await queryInterface.bulkInsert('status', 
      [
        {
          descricao: 'Pendente'
        
        },
        {
          descricao: 'Reprovado'
        
        },
        {
          descricao: 'Aguardando'
        
        },
        {
          descricao: 'Aprovado'
        },
        {
          descricao: 'Finalizado'
        },
        {
          descricao: 'Cancelado'
        }

      ]);
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('status');
    
  }
};
