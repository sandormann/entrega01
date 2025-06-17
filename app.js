const express = require('express')
const router = require('./routes/productos.js')
const app = express();

const PORT = 8080;

app.use(express.json())

//Rutas
app.use('/api',router)

//Puerto
app.listen(PORT, () => {
	console.log(`Puerto: ${PORT}`)
}) 