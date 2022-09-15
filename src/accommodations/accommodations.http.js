const accommodationsControllers = require('./accommodations.controllers')
const placesControllers = require('../places/places.controllers')
const { response } = require('express')


const getAll = (req, res) => {
    accommodationsControllers.getAllAccommodations()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const getById = (req, res) => {
    const id = req.params.id_accommodations
    accommodationsControllers.getAllAccommodationsById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const postAccomodation = (req, res) => {
    const userId = req.user.id
    const city = req.body.city
    const data = req.body
    placesControllers.getByCity(city)
        .then(respon => {
            console.log(respon.city)
            accommodationsControllers.createAccommodations(userId, data, respon.id)
                .then(response => {
                    res.status(201).json(response)
                })
                .catch(err => {
                    res.status(400).json(err)
                })
        })
        .catch(err => err)
}

const remove =(req, res)=>{
    const userRol= req.user.rol
    const id = req.param.id_accommodations
    accommodationsControllers.removeAccommodations(userRol, id)
    .then(response => {
        res.status(204).json(response)
    })
    .catch(err => {
        res.status(400).json(err)
    })
}

const editPatch = (req, res) => {
    const id = req.params.id_accommodations
    const data = req.body
    const userRol = req.user.rol

    if (!Object.keys(data)) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.title ||
        !data.description||
        !data.guests ||
        !data.bathrooms ||
        !data.rooms ||
        !data.beds ||
        !data.bathrooms ||
        !data.price ||
        !data.score ||
        !data.commision 
        ) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                "title": 'string',
                "description": 'string',
                "guests": 'number',
                "rooms": 'number',
                "beds": 'number',
                "rooms": 'number',
                "bathrooms": 'decimal',
                "price": 'float',
                "score": 'float',
                "commision": 'float'
            }
        })
    } else {
        accommodationsControllers.updateAccommodations(id, data, userRol)
            .then((response) => {
                return res.status(200).json({ message: 'Accommodations edit succesfully', accommodations: response })
            })
            .catch(err => {
                res.status(400).json({ message: err.errors[0].message })
            })
    }
}

const editPut = (req, res) => {
    const id = req.params.id_accommodations
    const data = req.body
    const userRol = req.user.rol

    if (!Object.keys(data)) {
        return res.status(400).json({ message: 'Missing data' })
    } else {
        accommodationsControllers.updateAccommodations(id, data, userRol)
            .then((response) => {
                return res.status(200).json({ message: 'Accommodations edit succesfully', accommodations: response })
            })
            .catch(err => {
                res.status(400).json({ message: err.errors[0].message })
            })
    }
}

module.exports = {
    getAll,
    getById,
    postAccomodation,
    remove,
    editPut,
    editPatch
}