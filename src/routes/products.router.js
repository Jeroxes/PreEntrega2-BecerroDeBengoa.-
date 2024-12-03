import { json, Router } from 'express';
import ProductManager from '../services/ProductManager.js';

const router = Router();

const productManager = new ProductManager()



router.get('/', async(req, res) => {
   try{
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined
    const products = await productManager.getAllProducts(limit)
    res.json(products)
    } catch (error) {
    console.log(error);
   }
});

router.get('/:pid', async(req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        if(!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.json(product)
    }  catch (error) {
        console.log(error);
    }
})

router.post('/', async(req, res) => {
    try{
        const { title, description, code, price, stock, category, thumbnails } = req.body
        if(!title || !description || !code || !price || !stock || !category) {
            return res.status(400),json({ error: 'Todos los campos son obligatorios excepto thumbnails'});
        }
        const newProduct = await productManager.addProduct({ title, description, code, price, stock, category, thumbnails });
        
        res.status(201).json('El producto se creó de forma correcta')

    } catch (error){
        console.log(error);
    }  
})

router.put('/:pid', async(req, res) => {
    try{
        const productId = parseInt(req.params.pid);
        const updatedProduct = await productManager.updateProduct(productId, req.body);
        if(updatedProduct){
            res.json(updatedProduct);
        }else{
            res.status(404).json({error:'Producto no encontrado'});
        }
    } catch (error){
        console.log(error);
    }
    
})

router.delete('/:pid', async(req, res) => {
    try{ 
        const productId=parseInt(req.params.pid);
        const deletedProduct= await productManager.deleteProduct(productId);
        if (deletedProduct){
            res.status(200).json({message: 'Producto eliminado'})
        } else{
            res.status(404).json({error: 'Producto no encontrado'});
        }

    } catch (error){
    console.log(error);
    }
})


export default router;