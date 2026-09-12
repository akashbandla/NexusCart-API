import express from 'express';

import { createProduct } from '../controllers/products.controller.js';

const router = express.Router();

router.post('/create', createProduct);

export default router;