const router = require('express').Router()
const {body} = require('express-validator')

const authController = require('../controllers/authController')

const validarBody = require('../middleware/validarBody')
const validarToken = require('../middleware/validarToken')


// /api/auth/signup
router.post('/signup',[
    body('email', 'Coloque un email válido').isEmail(),
    body('nombre', 'Coloque un nombre').trim().notEmpty(),
    body('password', '6 o mas carácteres').isLength({min: 6}),
    validarBody,
],authController.signup)

// /api/auth/login
router.post('/login',[
    body('email', 'Coloque un email válido').isEmail(),
    body('password', '6 o mas carácteres').isLength({min: 6}),
    validarBody
],authController.login)

router.get('/validar', validarToken, authController.validar)

module.exports = router