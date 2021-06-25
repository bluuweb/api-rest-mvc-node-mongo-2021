const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.validar = (req, res) => {
    res.json({
        errors: false,
        msg: "token válido"
    })
}

exports.signup = async(req, res) => {
    try {

        const {email, password} = req.body
        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                errors: [{msg: "El email ya está registrado"}]
            })
        }
        
        user = new User(req.body)
        const salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        const payload = {
            uid: user._id,
            name: user.nombre,
            email: user.email
        }

        jwt.sign(
            payload,
            process.env.PalabraSecreta,
            {expiresIn: '20 days'},
            (err, token) => {
                if(err) throw err
                return res.json({errors: false, token: token})
            }
        )

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errors: [{msg: "Error de servidor"}]
        })
    }
}

exports.login = async(req, res) => {

    try {

        const {email, password} = req.body
        let user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                errors: [{msg: "El email no existe"}]
            })
        }

        const passwordOK = bcrypt.compareSync(password, user.password)
        if(!passwordOK){
            return res.status(400).json({
                errors: [{msg: "El password no existe"}]
            })
        }

        const payload = {
            uid: user._id,
            name: user.nombre,
            email: user.email
        }

        jwt.sign(
            payload,
            process.env.PalabraSecreta,
            {expiresIn: '20 days'},
            (err, token) => {
                if(err) throw err
                return res.json({errors: false, token: token})
            }
        )
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errors: [{msg: "Error de servidor"}]
        }) 
    }
}