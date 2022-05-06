const { Model, DataTypes} = require('sequelize')

class endereco extends Model {

    static init( connection){
        super.init({
            idCliente: DataTypes.BIGINT,
            cep: DataTypes.STRING,   
            rua: DataTypes.STRING, 
            numero: DataTypes.STRING, 
            complemento: DataTypes.STRING, 
            bairro: DataTypes.STRING, 
            cidade: DataTypes.STRING, 
            uf: DataTypes.STRING, 

        },{
            sequelize: connection,
            schema: 'public',
            tableNAME:  'enderecos',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        })
    }


}

module.exports = endereco;
