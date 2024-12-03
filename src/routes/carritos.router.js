import { Router } from 'express';
import CarritosManager from '../services/CarritosManager.js'
import ProductManager from '../services/ProductManager.js';

const carritosManager = new CarritosManager()

const productManager = new ProductManager()

const router = Router();

router.post('/', async (req, res) => {
  const timeStamp = Date.now()
  const cart = {
    'products' : [],
     'timeStamp' : timeStamp
  }
  
  const newCart = await carritosManager.createCart(cart);
  res.status(201).json({ message: 'Carrito creado', cartId: newCart.id });
});


router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const products = await carritosManager.getProducts(parseInt(cid));
  
 res.status(200).json(products);
});


router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const product = await productManager.getProductById(parseInt(pid));
  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  const addedProduct = await carritosManager.addProduct(product, parseInt(cid));
  res.status(200).json({ message: 'Producto agregado al carrito', addedProduct });
});


router.delete('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const products = await carritosManager.removeProduct(parseInt(cid, pid));
  res.status(200).json({message: 'Producto elminado del carrito', products});
})

router.delete('/:cid', async (req, res) => {
  const { cid } = req.params;
  await carritosManager.deleteCarrito(parseInt(cid));
  res.status(200).json({message: 'Carrito eliminado'});
})

export default router;
