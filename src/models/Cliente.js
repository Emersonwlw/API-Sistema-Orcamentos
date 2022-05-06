const { Model, DataTypes} = require('sequelize')

class cliente extends Model {

    static init( connection){
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,   
            telefone: DataTypes.STRING, 
            cpfOuCnpj: DataTypes.STRING, 
        },{
            sequelize: connection,
            schema: 'public',
            tableNAME:  'clientes',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        })
    }


}

module.exports = cliente;
