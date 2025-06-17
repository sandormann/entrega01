const express = require('express')

const app = express();

const PORT = 8080;

//Arreglo de productos
let productos = []

app.use(express.json())

//Listar productos

app.get('/productos', (req, res) => {
  res.json(productos)
});

//Listar productos por id
app.get('/productos/:id', (req, res) => {
	//Obtener el id
	const { pid } = req.params;
	const producto = productos.find(p => p.pid === parseInt(pid))
	if(!producto){
		return res.json({ status: "error", msg: 'Producto no encontrado'})
	}

	res.json({ status: "sucess", msg:producto})
  
});

//Agregar producto
app.post('/productos', (req, res) => {

	const {title, description, code, price, status, stock, category, thumbnails } = req.body;
	const nuevoProducto = { pid: productos.length + 1, title, description, code, price, status, stock, category, thumbnails}
	//Agregar al arreglo
	productos.push(nuevoProducto)
	
	res.status(201).json(nuevoProducto)
});
//Actualizar producto

app.put('/productos/:id', (req, res) => {
	const { pid } = req.params;
	const { title, description, code, price, status, stock, category, thumbnails } = req.body;
	const producto = productos.find(u => u.pid === parseInt(pid))
	if(!producto) return res.status(404).json({status:'error', msg: "Producto no encontrado"})

	//actualizar los datos
	producto.title = title || producto.title
	producto.description = description || producto.description
	producto.code = code || producto.code
	producto.price = price || producto.price
	producto.status = status || producto.status
	producto.stock = stock || producto.stock
	producto.category = category || producto.category
	producto.thumbnails = thumbnails || producto.thumbnails

	
  	res.json(producto)
});

app.delete('/productos/:pid', (req, res) => {
	const { pid } = req.params;

	//filtrar para mostrar el arreglo sin el elemento
	productos = productos.filter(p => p.pid !== parseInt(pid))
  	res.json({status:"success", msg: "Producto eliminado"})
})


//Puerto
app.listen(PORT, () => {
	console.log(`Puerto: ${PORT}`)
}) 