const mongoose = require('mongoose')
require('dotenv').config()

const conectar = async() => {
    try {
        await mongoose.connect(process.env.mongoURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log("mongo DB andando 🏄‍♂️")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = conectar