const {DataTypes} = require('sequelize')
const {db} = require('../utils/database')

const AccommodationImg = db.define('accommodation_img', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accommodationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'accommodation_id'
    },
    url:{
        allowNull:false,
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    }
})

module.exports = AccommodationImg