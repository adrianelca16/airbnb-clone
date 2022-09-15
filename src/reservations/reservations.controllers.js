const uuid = require('uuid')
const Accommodations = require('../models/accommodation.model')
const Reservation = require('../models/resevations.model')
const Users = require('../models/users.model')

const getAllReservations = async () => {
    const data = await Reservation.findAll({
        include: [
            {
                model: Users,
                as: 'user'
            },
        {
            model: Accommodations
        }]
    })
    return data
}

const createReservation = async (data, userId, accommodationId) => {
    const { isFinished, isCanceled, ...newData } = data
    const newReservation = await Reservation.create({
        newData,
        id: uuid.v4(),
        userId: userId,
        arrival: data.arrival,
        departure: data.departure,
        accommodationId: accommodationId,
        adults: data.adults
    })
    return newReservation
}

const getAllReservationsById = async (id) => {
    const data = await Reservation.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: Users,
                as: 'user'
            },
        {
            model: Accommodations
        }]
    })
    return data
}

const canceledReservations = async(id, isCanceled) =>{
    const data = await Reservation.update({
        isCanceled: isCanceled
    }, {where: id})
    return data
}

module.exports = {
    createReservation,
    getAllReservations,
    getAllReservationsById,
    canceledReservations
}