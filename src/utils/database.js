const {Sequelize} = require('sequelize')
const config = require('./config')

const db = new Sequelize({
    dialect: config.db_dialect,
    host: config.db_host,
    username: config.db_username,
    password: config.db_password,
    database: config.db,
    port: config.db_port
})

module.exports = {
    db
}