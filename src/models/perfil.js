const { Model, DataTypes} = require('sequelize')

class perfis extends Model {

    static init( connection){
        super.init({
            descricao: DataTypes.STRING    
        },{
            sequelize: connection,
            schema: 'public',
            tableNAME: 'perfis',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        })
    }


}

module.exports = perfis;
