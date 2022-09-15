const router = require('express').Router()
const accommodationsServices = require('./accommodations.http')
const reservationServices = require('../reservations/reservations.http')
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/role.middleware')
require('../middleware/auth.middleware')(passport)

router.route('/')
    .get(accommodationsServices.getAll)
    .post(passport.authenticate('jwt', {session: false}), accommodationsServices.postAccomodation)

router.route('/:id_accommodations')
    .get(accommodationsServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, accommodationsServices.remove)
    .patch(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, accommodationsServices.editPatch)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, accommodationsServices.editPut)


router.route('/:id_accommodations/make-reservation')
    .post(passport.authenticate('jwt', {session: false}),reservationServices.postReservation)
    .get(passport.authenticate('jwt', {session: false}),reservationServices.getAll)



exports.router = router