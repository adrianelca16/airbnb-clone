
const e = require('express')
const { restart } = require('nodemon')
const userControllers = require('../users/users.controllers')

const getAll = (req, res) => {
    userControllers.getAllUsers()
        .then(response => {
            res.status(200).json({ items: response.length, users: response })
        })
        .catch(err => {
            res.status(400).json(err)
        })

}

const getUsersById = (req, res) => {
    const id = req.params.id
    userControllers.getUsersById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json({ message: `El usuario con el id ${id} no existe` })
        })
}
const register = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({ message: 'Missing data' })
    }
    else if (
        !body.first_name ||
        !body.last_name ||
        !body.gender ||
        !body.email ||
        !body.password ||
        !body.phone ||
        !body.birthday_date
    ) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                "first_name": 'string',
                "last_name": 'string',
                "gender": 'string',
                "email": 'example@example.com',
                " password": 'string',
                "phone": "strings",
                "birthday_date": 'YYYY/MM/DD'
            }
        })
    } else {
        userControllers.createUsers(body)
            .then(response => {
                return res.status(201).json({ message: `User created succesfully wuth id: ${response.id}`, user: response })
            })
            .catch(err => {
                res.status(400).json({ message: err })
            })

    }
}

const remove = (req, res) => {
    const id = req.params.id
    userControllers.deleteUser(id)
        .then(response => {
            if (response) {
                return res.status(204).json({ message: 'delete sucessfully' })
            } else {
                return res.status(400).json({ message: 'invalid id' })
            }
        })
}

const editPut = (req, res) => {
    const id = req.params.id
    const data = req.body
    const userRol = req.user.rol

    if (!Object.keys(data)) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.firstName ||
        !data.lastName ||
        !data.gender ||
        !data.email ||
        !data.password ||
        !data.phone ||
        !data.rol ||
        !data.profileImage ||
        !data.birthdayDate ||
        !data.is_active) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                "firstName": 'string',
                "lastName": 'string',
                "gender": 'string',
                "email": 'example@example.com',
                "password": 'string',
                "phone": "strings",
                "birthdayDate": 'YYYY/MM/DD'
            }
        })
    } else {
        userControllers.updateUser(id, data, userRol)
            .then((response) => {
                return res.status(200).json({ message: 'User edit succesfully', user: response })
            })
            .catch(err => {
                res.status(400).json({ message: err.errors[0].message })
            })
    }
}

const editPatch = () => {
    const id = req.params.id
    const data = req.body
    const userRol = req.user.rol

    if (!Object.keys(data)) {
        return res.status(400).json({ message: 'Missing data' })
    } else {
        userControllers.updateUser(id, data, userRol)
            .then((response) => {
                return res.status(200).json({ message: 'User edit succesfully', user: response })
            })
            .catch(err => {
                res.status(400).json({ message: err.errors[0].message })
            })
    }
}

const editMyUserPut = (req, res) => {
    const id = req.user.id
    const data = req.body
    if (!Object.keys(data)) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.firstName ||
        !data.lastName ||
        !data.gender ||
        !data.email ||
        !data.phone ||
        !data.profileImage ||
        !data.birthdayDate) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                "firstName": 'string',
                "lastName": 'string',
                "gender": "string",
                "email": 'example@example.com',
                "phone": '+5804241333286',
                "profileImage": 'example.com/img/example.png',
                "birthdayDate": 'DD/MM/YYYY'
            }
        })
    } else {
        userControllers.updateUser(id, data, req.user.rol)
            .then(response => {
                return res.status(200).json({ message: 'User edit succesfully', user: response })
            })
            .catch(err => {
                res.status(400).json({ message: err})
            })
    }
}

const editMyUserPatch = (req, res) => {
    const id = req.user.id
    const data = req.body
    if (!Object.keys(data)) {
        return res.status(400).json({ message: 'Missing data' })
    } else {
        userControllers.updateUser(id, data, req.user.rol)
            .then(response => {
                return res.status(200).json({ message: 'User edit succesfully', user: response })
            })
            .catch(err => {
                res.status(400).json({ message: err})
            })
    }
}

const deleteMyUser = (req, res) => {
    const id = req.user.id
    console.log(id)
    userControllers.deleteUser(id)
        .then(response => {
            if (response) {
                return res.status(204).json(response)
            } else {
                return res.status(400).json({ message: 'Invalid Id' })
            }
        })
}

const getMyUser = (req, res) => {
    const id = req.user.id
    userControllers.getUsersById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json({ message: `El usuario con el id ${id} no existe` })
        })
}

const postProfileImg = (req, res) => {
    const userId = req.user.id
    const imgPath = req.hostname + ':8000' + '/api/v1/uploads/' + req.file.filename

    userControllers.editprofileImage(userId, imgPath)
        .then(response => {
            if (response) {
                res.status(200).json(response)
            } else {
                return restart.status(400).json({ message: 'error' })
            }
        })

}

const getUserRole = (req, res)=> {
    const id = req.params.id
    userControllers.getUserWithRole(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(400).json({message: err})
    })
}

module.exports = {
    getAll,
    getUsersById,
    register,
    remove,
    editPut,
    editMyUserPut,
    deleteMyUser,
    getMyUser,
    postProfileImg,
    editPatch,
    editMyUserPatch,
    getUserRole
}