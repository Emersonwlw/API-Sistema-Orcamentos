const { Model, DataTypes} = require('sequelize')

class OrcamentoItem extends Model {

    static init( connection){
        super.init({
          
            idOrcamento: DataTypes.BIGINT,
            idServico: DataTypes.BIGINT,
            idPrestador: DataTypes.BIGINT,
            desconto: DataTypes.DOUBLE,
            acrescimo: DataTypes.DOUBLE,
            valor : DataTypes.DOUBLE,
            valorTotal: DataTypes.DOUBLE,
            observacao : DataTypes.TEXT
            
        },{
            sequelize: connection,
            schema: 'public',
            tableNAME: 'orcamento-item',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false,
               

        })
    }


}

module.exports = OrcamentoItem;
