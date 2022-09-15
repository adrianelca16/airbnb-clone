const router = require('express').Router()
const { Router } = require('express')
const passport = require('passport')
const upload = require('../utils/multer').upload
const { roleAdminMiddleware } = require('../middleware/role.middleware')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')

router.route('/')
    .get(userServices.getAll)//listo

router.route('/me')
    .put(passport.authenticate('jwt', { session: false }), userServices.editMyUserPut)
    .patch(passport.authenticate('jwt', { session: false }), userServices.editMyUserPatch)
    .get(passport.authenticate('jwt', { session: false }), userServices.getMyUser)
    .delete(passport.authenticate('jwt', { session: false }), userServices.deleteMyUser)
 
router.route('/me/profile-img')
    .post(passport.authenticate('jwt', { session: false }), upload.single('profile_img'), userServices.postProfileImg)//es para mandar la imagen del perfil
//.get()

router.route('/:id')
    .get(userServices.getUsersById)//listo
    .put(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, userServices.editPut)
    .patch(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, userServices.editPut)
    .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, userServices.remove)

router.route('/:id/role')
    .get(userServices.getUserRole)


exports.router = router