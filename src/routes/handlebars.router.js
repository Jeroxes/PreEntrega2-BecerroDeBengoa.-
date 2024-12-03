import { json, Router } from 'express';
import ProductManager from '../services/ProductManager.js';

const router = Router();

const productManager = new ProductManager()



router.get('/', async(req, res) => {
   try{
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined
    const products = await productManager.getAllProducts(limit)
    res.render('home', {products: products})
    } catch (error) {
    console.log(error);
   }
});

router.get('/realtimeproducts', async(req, res) => {
    try{
     res.render('realTimeProducts')
     } catch (error) {
     console.log(error);
    }
 });


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

export default router;