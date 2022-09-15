const Accommodations = require('../models/accommodation.model')
const Users = require('../models/users.model')
const Places = require('../models/places.model')
const uuid = require('uuid')

const getAllAccommodations = async () => {

    const data = await Accommodations.findAndCountAll({
        include: [
            {
                model: Users,
                as: 'user'
            },
            {
                model: Places
            }
        ]
    })
    /*const data = await Accommodations.findAll({
        include: {
            model: Places,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId', 'placeId', 'hostId']
        }
    })*/

    /*
    const data = await Users.findAll({
        include:{
            model: Accommodations,
            include:{
                model: Places,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId', 'placeId', 'hostId']
            }
        },
        attributes:{
            exclude:['createdAt', 'updatedAt']
        }
    })*/
    return data
}

const getAllAccommodationsById = async (id) => {
    const data = await Accommodations.findOne({
        where: {
            id
        },
        include: {
            model: Places,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId', 'placeId', 'hostId']
        }
    })
    return data
}

const createAccommodations = async (userId, data, city) => {
    const newAccommodation = await Accommodations.create({
        id: uuid.v4(),
        title: data.title,
        description: data.description,
        guests: data.guests,
        rooms: data.rooms,
        beds: data.beds,
        bathrooms: data.bathrooms,
        price: data.price,
        hostId: userId,
        score: data.score,
        placeId: city,
        commision: data.commision
    })
    return newAccommodation
}

const removeAccommodations = async(userRol, id)=>{
        if("171a9f56-e893-4e2a-91f3-458e448e2d81" == userRol){
            const data = await Accommodations.destroy({
                where: {
                    id
                }
            })
            return data
        }
}

const updateAccommodations = async (id, data, userRol) => {
    if('171a9f56-e893-4e2a-91f3-458e448e2d81' ==  userRol){
        const response = await Accommodations.update(
            data,
            {where: {id: id}}
        )
        return response
    }else{
        return false
    }
}

module.exports = {
    getAllAccommodations,
    getAllAccommodationsById,
    createAccommodations,
    removeAccommodations,
    updateAccommodations
}