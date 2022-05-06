const { Model, DataTypes} = require('sequelize')

class usuario extends Model {

    static init( connection){
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING, 
            senha: DataTypes.TEXT,
            idPerfil: DataTypes.BIGINT,
            dataInativacao: DataTypes.DATE
        },{
            sequelize: connection,
            schema: 'public',
            tableNAME: 'usuarios',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        })
    }


}

module.exports = usuario;
