const uuid = require('uuid')
const { hashPassword } = require('../utils/crypt')

const Users = require('../models/users.model')
const Roles = require('../models/roles.model')


const getAllUsers = async () => {
    const data = await Users.findAll({
        attributes: {
            exclude: ['password', 'createdAt', "updatedAt", "roleId"]
        }
    })
    return data
    //? select * from users;
}

const getUsersById = async (id) => {
    console.log(id)
    const data = await Users.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['password']
        }
    })
    return data
    //? select * from users where id = ${id};
}

const createUsers = async (data) => {
    const newUser = await Users.create({
        id: uuid.v4(),
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        email: data.email,
        password: hashPassword(data.password),
        phone: data.phone,
        birthdayDate: data.birthdayDate,
        dni: data.dni,
        address: data.address,
        profileImage: data.profileImage,
        roleId: '7a2c9171-0fa9-4a26-9105-0c5f126b9112',
        status: 'active',
        verified: false
    })
    return newUser
}

const deleteUser = async (id) => {
    const data = await Users.destroy({
        where: {
            id
        }
    })
    return data
}

const updateUser = async (userId, data, userRol) => {
    const { password, id, verified, role_id, roleId, ...newData } = data
    if('171a9f56-e893-4e2a-91f3-458e448e2d81' ==  userRol){
        const response = await Users.update(
            {...newData, role_id},
            {where: {id: userId}}
        )
        return response
    }else{
        const response = await Users.update(
            {...newData},
            {where: {id: userId}}
        )

        console.log(Users)
        return response
    }
}

const getUserByEmail = async (email) => {
    const data = await Users.findOne({
        where: {
            email
        }
    })
    return data
    //? select * from users where email = ${email};
}

const editprofileImage = async (userId, imgUrl) => {
    const response = await Users.update({
        profile_image: imgUrl
    }, {
        where: {
            id: userId
        }
    })
    return response
}

const getUserWithRole = async (userId)=> {
    const data = await Users.findOne({
        where:{
            id: userId
        },
        attributes:{
            exclude: ['password', "createdAt", "updatedAt", "roleId"]
        },include:{
            model: Roles,
            attributes:{
                exclude:["id", 'createdAt', 'updatedAt']
            }
        }
    })
    return data
}
module.exports = {
    getAllUsers,
    getUsersById,
    createUsers,
    deleteUser,
    updateUser,
    getUserByEmail,
    editprofileImage,
    getUserWithRole
}