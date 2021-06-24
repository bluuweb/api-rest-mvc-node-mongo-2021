const express = require('express')
const app = express()
const cors = require('cors')
const conectar = require('./config/database')
const path = require("path");
const history = require("connect-history-api-fallback");

conectar()

// habilitar req.body y cors
app.use(express.json({extended: false}))
app.use(cors())

// Rutas
app.use("/api/auth", require('./routes/auth'))
app.use('/api/todo', require('./routes/todo'))

app.use(history())
app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('3 2 1 🚀 ' + PORT)
})