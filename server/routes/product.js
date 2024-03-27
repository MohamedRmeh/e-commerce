import express from 'express';
const router = express.Router();
import { createProduct, upload, getProduct, getProducts, updateProduct, deleteProduct, addToCart } from '../controllers/product.js';

router.post('/admin', upload.single('img'), createProduct);
router.get('/api/product/:id', getProduct)
router.get('/api/products', getProducts)
router.put('/api/products/:id', upload.single('img'), updateProduct)
router.delete('/api/products/:id', deleteProduct)
router.post('/api/addtocart', addToCart)

export default router;