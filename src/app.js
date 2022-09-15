//*Achivos de rutas

const userRouter = require('./users/users.router').router
const authRouter = require('./auth/auth.router').router
const accommodationRouter = require('./accommodations/accommodations.router').router
const reservationsRouter = require('./reservations/reservations.router').router
const placesRouter = require('./places/places.router').router
const upload = require('./utils/multer').upload
const path = require('path')
const defaulData = require('./utils/defaultData')
const config= require('./utils/config')

const {db} = require('./utils/database')

//*dependencias
const express = require('express')
const passport = require('passport')
require('./middleware/auth.middleware')(passport)
const initModels = require('./models/initModels')
const swaggerUi = require('swagger-ui-express') 
const swaggerDoc = require('./swagger.json')

 
//! configuraciones iniciales
const app = express()

initModels()

db.authenticate()
    .then(()=> console.log('database authenticated'))
    .catch(err=> console.log(err))
db.sync()
    .then(()=> {
        console.log('Database synced')
        
    })
    .catch(err => console.log(err))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'All ok!'})
})
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/accommodations', accommodationRouter)
app.use('/api/v1/reservations', reservationsRouter)
app.use('/api/v1/places', placesRouter)
app.use('/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
app.get('/api/v1/uploads/:imgName', (req,res)=>{
    const imgName = req.params.imgName
    res.status(200).sendFile(path.resolve('uploads/') + `/${imgName}`)
}) // es para hacer un get de la imagen del perfil

app.post('/upload', upload.single('image'), (req, res)=>{
    res.status(200).json(req.file)
} )


app.get('/ejemplo',
    passport.authenticate('jwt', {session: false}),
    (req,res) => [
    res.status(200).json({message: 'felicidades, tienes acceso para entrar aqui', email: req.user.email})
])


app.listen(config.port, () => {
    console.log('server started at port 8000')
})

exports.app = app 