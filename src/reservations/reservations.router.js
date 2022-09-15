const router = require('express').Router()
const reservationServices = require('./reservations.http')
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/role.middleware')
require('../middleware/auth.middleware')(passport)

router.route('/')
.get(reservationServices.getAll)

router.route('/:id')
.get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, reservationServices.getAllById)
.patch(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, reservationServices.canceled)


exports.router = router