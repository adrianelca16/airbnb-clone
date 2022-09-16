const reservationsControllers = require('./reservations.controllers')


const postReservation = (req, res) => {
    const userId = req.user.id
    const data = req.body
    const accommodationId = req.params.id_accommodations

    if (!Object.keys(data)) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.arrival ||
        !data.departure ||
        !data.adults) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                "arrival": 'YYYY/MM/DD',
                "departure": 'YYYY/MM/DD',
                "adults": 'number'
            }
        })
    } else {
        reservationsControllers.createReservation(data, userId, accommodationId)
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

}

const getAll = (req, res) => {
    reservationsControllers.getAllReservations()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}
const getAllById = (req, res) => {
    const id = req.params.id
    reservationsControllers.getAllReservationsById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const canceled = (req, res) => {
    const isCanceled = req.body.isCanceled
    const data = req.body
    const id = req.params.id
    if (!Object.keys(data)) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.isCanceled) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                "isCanceled": 'boolean'
            }
        })
    } else if(data.isCanceled) {
        reservationsControllers.canceledReservations(id, isCanceled)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    }
}

module.exports = {
    postReservation,
    getAll,
    getAllById,
    canceled
}