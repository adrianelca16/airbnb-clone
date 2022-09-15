const Places = require('../models/places.model')
const uuid = require('uuid')


const getAllPlaces = async()=>{
    const data = await Places.findAll()
    return data
}

const getByCity = async(city)=>{
    const data = await Places.findOne({
        where:{
            city: city
        }
    })
    return data
}
const getById = async(id)=>{
    const data = await Places.findOne({
        where:{
            id: id
        }
    })
    return data
}

const createPlaces = async(data)=>{
    const newPlaces = await Places.create({
        id: uuid.v4(),
        city: data.city,
        state: data.state,
        country: data.country,
        continent: data.continent
    })
    return newPlaces
}
const deletePlaces = async (id, userRol) => {
    if("171a9f56-e893-4e2a-91f3-458e448e2d81" == userRol){
        const data = await Places.destroy({
            where: {
                id
            }
        })
        return data
    }
}

const updatePlaces = async (placesId, data, userRol) => {
    if('171a9f56-e893-4e2a-91f3-458e448e2d81' ==  userRol){
        const response = await Places.update(
            data,
            {where: {id: placesId}}
        )
        return response
    }else{
        return false
    }
}




module.exports = {
    getAllPlaces,
    getByCity,
    createPlaces, 
    getById,
    deletePlaces,
    updatePlaces
}