const { Router } = require('express')
const productsRouter = Router();

//Arreglo de productos
const productsCollection = []



//Listar productos

productsRouter.get('/products', (req, res) => {
  res.status(200).json({status:"success", productsCollection});
});

//Listar productos por id
productsRouter.get('/products/:id', (req, res) => {
	//Obtener el id
	const { pid } = req.params;
	const product = productsCollection.find(p => p.pid === parseInt(pid))
	if(!product){
		return res.status(404).json({ status: "error", msg: 'Producto no encontrado'})
	}

	res.status(200).json({ status: "sucess", msg:product})
  
});

//Agregar producto
productsRouter.post('/products', (req, res) => {

	const {title, description, code, price, status, stock, category, thumbnails } = req.body;
	const newProduct = { pid: productsCollection.length + 1, title, description, code, price, status, stock, category, thumbnails:[]}
	//Agregar al arreglo
	productsCollection.push(newProduct)
	
	res.status(201).json(newProduct)
});
//Actualizar producto

productsRouter.put('/products/:id', (req, res) => {
	const { pid } = req.params;
	const { title, description, code, price, status, stock, category, thumbnails:[] } = req.body;
	const product = products.find(u => u.pid === parseInt(pid))
	if(!product) return res.status(404).status(404).json({status:'error', msg: "Producto no encontrado"})

	//actualizar los datos
	product.title = title || product.title
	product.description = description || product.description
	product.code = code || product.code
	product.price = price || product.price
	product.status = status || product.status
	product.stock = stock || product.stock
	product.category = category || product.category
	product.thumbnails = thumbnails || product.thumbnails

	
  	res.json(producto)
});

productsRouter.delete('/products/:pid', (req, res) => {
	const { pid } = req.params;

	//filtrar para mostrar el arreglo sin el elemento
	productsCollection = productsCollection.filter(p => p.pid !== parseInt(pid))
  	res.status(200).json({status:"success", msg: "Producto eliminado"})
})

module.exports = productsRouter;