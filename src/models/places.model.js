const {DataTypes} = require('sequelize')
const {db} = require('../utils/database')

const Places = db.define('places', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country:{
        allowNull:false,
        type: DataTypes.STRING
    },
    continent:{
        allowNull:false,
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at"
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at"
    }
})

module.exports = Places