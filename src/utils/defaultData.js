const Users = require("../models/users.model")
const Roles = require('../models/roles.model')
const AccommodationImg = require('../models/accommodationImages.model')
const Accommodations = require('../models/accommodation.model')
const Places = require('../models/places.model')
const Reservartions = require('../models/resevations.model')
const UsersImg = require('../models/usersImages.model')

const generateData = async()  => {
    await Roles.bulkCreate([{name: 'guest', id: '7a2c9171-0fa9-4a26-9105-0c5f126b9112'},{name: 'host', id: 'fc1ef53e-c0ce-49c4-8839-85901664c8a7'},{name: 'admin', id: '171a9f56-e893-4e2a-91f3-458e448e2d81'}], {validate: true})
    await Users.create({
        id: "d00e895a-4d14-461f-bbf2-0ffb13a29601",
        firstName: "adrian",
        lastName: "hernandez",
        gender: "male",
        email: "adrian@academlo.com",
        password: "$2b$10$iXA47IOGFgFyVBm1yNbUmOAkVeoVYwGsdpJmS3iLJrt5N.ZFDbSBO",
        phone: "1234567890",
        birthdayDate: "10/07/2001",
        dni: "",
        address: "",
        profileImage: "www.data.profile_image.com",
        roleId: '171a9f56-e893-4e2a-91f3-458e448e2d81',
        isActive: 'active',
        verified: false 
    })
    await Places.bulkCreate([
        {
          id: '864ee3c2-facd-4a23-8b4a-4e9d342d9036',
          city: 'Guadalajara',
          state: 'Jalisco',
          country: 'México',
          continent: 'America'
        },
        {
          id: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
          city: 'Zapopan',
          state: 'Jalisco',
          country: 'México',
          continent: 'America'
        },
        {
          id: '3436a556-6623-40ba-88b8-2e01009f9d82',
          city: 'Suba',
          state: 'Bogotá',
          country: 'Colombia',
          continent: 'America'
        },
        {
          id: '134a55b6-487c-46cc-a5b5-9392af20c205',
          city: 'Medellín',
          state: 'Antioquia',
          country: 'Colombia',
          continent: 'America'
        },
        {
          id: '3a230417-80ae-4232-a8ff-6fd50068a777',
          city: 'Azcapotzalco',
          state: 'CDMX',
          country: 'México',
          continent: 'America'
        },
        {
          id: '0d907427-7623-4ec9-8c6d-270bb92fbbe7',
          city: 'Monterrey',
          state: 'Muevo León',
          country: 'México',
          continent: 'America'
        }])

        await Accommodations.create({
            id: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
            title: "premium - vistas 360 ciudad (alberca y gym)",
            description: "asd",
            guests: 6,
            rooms: 3,
            beds: 3,
            bathrooms: 4.5,
            price: 1536.00,
            hostId : 'd00e895a-4d14-461f-bbf2-0ffb13a29601',
            score: 0.00,
            placeId: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
            commision: 150.00
            })
}
module.exports = generateData