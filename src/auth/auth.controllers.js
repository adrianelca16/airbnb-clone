const { response } = require('express')
const { getUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypt')

const loginUser = async (email, password) => {
    return await getUserByEmail(email)
        .then(response => {
            if(response){
                const verify_password = comparePassword(password, response.password)
                if (verify_password) {
                    return response
                }
            }
            return false
        })
        .catch(err => { return false})
}

module.exports = {
    loginUser
}