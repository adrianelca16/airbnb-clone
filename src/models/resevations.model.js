const {DataTypes} = require('sequelize')
const {db} = require('../utils/database')
const Accommodations = require('./accommodation.model')
const Users = require('./users.model')

const Reservartions = db.define('reservation', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
            model:Users,
            key: 'id'
        }
    },
    arrival: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    departure:{
        allowNull:false,
        type: DataTypes.DATE
    },
    accommodationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'accommodation_id',
        references: {
            model: Accommodations,
            key: 'id'
        }
    },
    adults:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    kids:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    babies:{
        type: DataTypes.INTEGER,
       defaultValue: 0
    },
    pets:{
        type: DataTypes.INTEGER,
       defaultValue: 0
    },
    score:{
        type: DataTypes.FLOAT
    },
    isFinished:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_finished'
    },
    isCanceled:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_canceled'
    }
})

module.exports = Reservartions