import express from 'express';

import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/products.controller.js';
import adminOnly from '../middlewares/role.middleware.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductById);


router.use(adminOnly);

router.post('/create', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);


export default router;