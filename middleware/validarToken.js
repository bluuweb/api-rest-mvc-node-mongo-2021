const jwt = require('jsonwebtoken')
require('dotenv').config()

const validarToken = (req, res, next) => {

    const token = req.header('x-mi-token')

    if(!token){
        return res.status(401).json({
            errors: [{msg: "No existe token 😲"}]
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.PalabraSecreta)

        req.uid = uid

        next()
        
    } catch (error) {
        // console.log(error)
        return res.status(401).json({
            errors: [{msg: "Token no válido 🤬"}]
        })
    }

}

module.exports = validarToken

