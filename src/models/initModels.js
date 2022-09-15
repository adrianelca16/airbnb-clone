const Users = require("./users.model")
const Roles = require('./roles.model')
const AccommodationImg = require('./accommodationImages.model')
const Accommodations = require('./accommodation.model')
const Places = require('./places.model')
const Reservartions = require('./resevations.model')
const UsersImg = require('./usersImages.model')

const initModels = () => {
    //? Users <- Roles
    Users.belongsTo(Roles)
    Roles.hasMany(Users)

    //?  Users -> UserImages

    UsersImg.belongsTo(Users)
    Users.hasMany(UsersImg)

    //?Users <-> Accommodation

    //Users.belongsToMany(Accommodations, { through: Reservartions})
    //Accommodations.belongsToMany(Users, { through: Reservartions})

    Users.hasMany(Reservartions)
    Reservartions.belongsTo(Users)

    Accommodations.hasMany(Reservartions)
    Reservartions.belongsTo(Accommodations)

    //? Accomodation -> AccommodationImg

    AccommodationImg.belongsTo(Accommodations)
    Accommodations.hasMany(AccommodationImg)

    //? Accommodation -> Places
    Accommodations.belongsTo(Places)
    Places.hasMany(Accommodations)

    //? User -> Accommodation (Host)

    Users.hasMany(Accommodations)
    Accommodations.belongsTo(Users)

}

module.exports = initModels
