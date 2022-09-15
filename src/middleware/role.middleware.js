const Role = require('../models/roles.model')

const roleAdminMiddleware = async (req, res, next) => {
    await Role.findOne({
        where: {
            name: 'admin'
        }
    }).then((response => {
        const rol = req.user.rol
        if (rol === response.id) {
            next()
        } else {
            return res.status(401).json({ status: 'error', message: 'user not authorized' })
        }
    })).catch(() => { return res.status(401).json({ status: 'error', message: 'user not authorized' }) })
}

const roleHostMiddleware = (req, res, next) => {
    Role.findOne({
        where: {
            name: 'host'
        }
    }).then((response => {
        const rol = req.user.rol
        if (rol === response.id) {
            next()
        } else {
            return res.status(401).json({ status: 'error', message: 'user not authorized' })
        }
    })).catch(() => { return res.status(401).json({ status: 'error', message: 'user not authorized' }) })
}


module.exports = {
    roleAdminMiddleware,
    roleHostMiddleware
}