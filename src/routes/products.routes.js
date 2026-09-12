import express from 'express';

import { createProduct, getProductById, getProducts } from '../controllers/products.controller.js';
import adminOnly from '../middlewares/role.middleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.use(adminOnly);
router.post('/create', createProduct);

export default router;