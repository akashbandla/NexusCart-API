import express from 'express';

import { createProduct, getProductById, getProducts, updateProduct, deleteProduct, importProducts, exportProducts } from '../controllers/products.controller.js';
import adminOnly from '../middlewares/role.middleware.js';
import upload from '../middlewares/upload.middleware.js';


const router = express.Router();


router.post(
    '/import',
    adminOnly,
    upload.single('file'),
    importProducts
);

router.get('/export', adminOnly, exportProducts);


router.post('/create', adminOnly, createProduct);

router.put('/:id', adminOnly, updateProduct);

router.delete('/:id', adminOnly, deleteProduct);


router.get('/:id', getProductById);

router.get('/', getProducts);



export default router;