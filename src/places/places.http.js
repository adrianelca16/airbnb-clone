
const placesControllers = require('./places.controllers')

const getAll = (req, res) => {
    placesControllers.getAllPlaces()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const getByCity = (req, res) => {
    const city = req.body.city

    placesControllers.getByCity(city)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}
const create = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({ message: 'Missing data' })
    }
    else if (
        !body.city ||
        !body.state ||
        !body.country ||
        !body.continent
    ) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                "city": 'string',
                "state": 'string',
                "country": 'string',
                "continent": 'string'
            }
        })
    } else {
        placesControllers.createPlaces(body)
            .then(response => {
                return res.status(201).json({ message: `places created succesfully wuth id: ${response.id}`, places: response })
            })
            .catch(err => {
                res.status(400).json({ message: err })
            })

    }
}
const getById = (req, res) => {
    const id = req.params.id
    placesControllers.getById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const remove = (req, res) => {
    const id = req.params.id
    const userRol = req.user.rol
    placesControllers.deletePlaces(id, userRol)
        .then(response => {
            if (response) {
                return res.status(204).json({ message: 'delete sucessfully' })
            } else {
                return res.status(400).json({ message: 'invalid id' })
            }
        })
}

const editPatch = (req, res) => {
    const id = req.params.id
    const data = req.body
    const userRol = req.user.rol

    if (!Object.keys(data)) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.city ||
        !data.state ||
        !data.country ||
        !data.continent) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                "city": 'string',
                "country": 'string',
                "state": 'string',
                "contient": 'string'
            }
        })
    } else {
        placesControllers.updatePlaces(id, data, userRol)
            .then((response) => {
                return res.status(200).json({ message: 'Places edit succesfully', places: response })
            })
            .catch(err => {
                res.status(400).json({ message: err.errors[0].message })
            })
    }
}

const editPut = (req, res) => {
    const id = req.params.id
    const data = req.body
    const userRol = req.user.rol

    if (!Object.keys(data)) {
        return res.status(400).json({ message: 'Missing data' })
    } else {
        placesControllers.updatePlaces(id, data, userRol)
            .then((response) => {
                return res.status(200).json({ message: 'Places edit succesfully', places: response })
            })
            .catch(err => {
                res.status(400).json({ message: err.errors[0].message })
            })
    }
}

module.exports = {
    getAll,
    getByCity,
    create,
    getById,
    remove,
    editPatch,
    editPut
}