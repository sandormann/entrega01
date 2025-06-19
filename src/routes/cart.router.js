const { Router } = require('express');
const cartRouter = Router();

const cartsCollection = []

//Lista de carritos del arreglo
cartRouter.get('/cart',(req,res)=>{
	res.status(200).json({status:"success",cartsCollection})
})

//Muestra carrito según id
cartRouter.get('/cart/:cid',(req,res)=>{
	const { cid } = req.params;
	const cart = cartsCollection.find(c => c.cid === parseInt(cid))
	//Validación
	if(!cart){ return res.status(404).json({status:"Error",msg:"Carrito no encontrado"})}

	res.status(200).json({status:"success",cart})
})
//Crea un nuevo carrito
cartRouter.post('/cart',(req,res)=>{
	const newCart = { cid: cartsCollection.length + 1, products: []}
	cartsCollection.push(newCart);
	res.status(200).json({status:"success",newCart})
})


cartRouter.post('/cart/:cid/product/:pid',(req,res)=>{
	const { cid, pid } = req.params;
	const cart = cartsCollection.find(c => c.cid === parseInt(cid))
	if(!cart){return res.status(404).json({status:"Error", msg:"Carrito no encontrado"})}
	//Buscar producto en el carrito
	const product = cart.products.find(p => p.pid === parseInt(pid))
	if(!product){
		const newProduct = { pid: cart.products.length + 1, quantity:0}
		cart.products.push(newProduct);
		return res.status(200).json({status: "success", msg:cart})
	}else{
		product.quantity +=1;
		return res.status(200).json({status: "success", msg:cart})
	}
	
})

module.exports = cartRouter;