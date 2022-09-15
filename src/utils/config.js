require('dotenv').config()


module.exports = {
    port: process.env.PORT || 3000,
    db_host: process.env.DB_HOST,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db: process.env.DB,
    db_dialect: process.env.DB_DIALECT,
    db_port: process.env.DB_PORT
}