const {DataTypes} = require('sequelize')
const {db} = require('../utils/database')

const UsersImg = db.define('users_images', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id'
    },
    url:{
        allowNull:false,
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    }
})

module.exports = UsersImg