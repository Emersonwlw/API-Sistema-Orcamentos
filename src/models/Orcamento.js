const { Model, DataTypes} = require('sequelize')

class orcamento extends Model {

    static init( connection){
        super.init({
            descricao: DataTypes.STRING,
            idCliente: DataTypes.BIGINT,
            observacao: DataTypes.TEXT,
            desconto: DataTypes.DOUBLE,
            acrescimo: DataTypes.DOUBLE,
            valorTotal: DataTypes.DOUBLE
            
        },{
            sequelize: connection,
            schema: 'public',
            tableNAME: 'orcamentos',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        })
    }


}

module.exports = orcamento;
