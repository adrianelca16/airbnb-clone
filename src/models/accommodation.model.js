const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')
const Places = require('./places.model')
const Users = require('./users.model')

const Accommodations = db.define('accommodations', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    guests: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    rooms: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    beds: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    bathrooms: {
        allowNull: false,
        type: DataTypes.DECIMAL
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    hostId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "userId",
        references:{
            model: Users,
            key: 'id'
        }
    },
    score: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    placeId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'places_id',
        references:{
            model: Places,
            key: 'id'
        }
    },
    commision: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active'
    }
})

module.exports = Accommodations