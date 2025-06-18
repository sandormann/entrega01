const express = require('express')
const productsRouter = require('./routes/products.router.js')
const app = express();

const PORT = 8080;

app.use(express.json())

//Rutas
app.use('/api',productsRouter)

//Puerto
app.listen(PORT, () => {
	console.log(`Puerto: ${PORT}`)
}) 