const { Model, DataTypes} = require('sequelize')

class status extends Model {

    static init( connection){
        super.init({
            descricao: DataTypes.STRING    
        },{
            sequelize: connection,
            schema: 'public',
            tableNAME: 'statuses',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        })
    }


}

module.exports = status;
