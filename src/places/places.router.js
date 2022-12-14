const router = require('express').Router()
const placesServices = require('./places.http')
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/role.middleware')
require('../middleware/auth.middleware')(passport)

router.route('/')
    .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, placesServices.getAll)
    .post(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, placesServices.create)



router.route('/:id')
    .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, placesServices.getById)
    .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware,placesServices.remove)
    .patch(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, placesServices.editPatch)
    .put(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, placesServices.editPut)





exports.router = router

