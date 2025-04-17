import express from 'express';
import {
    getProductosAPI,
    crearProductoAPI,
    getProductoAPI,
    actualizarProductoAPI,
    eliminarProductoAPI,
    getProductosView,
    crearProductoForm,
    getProductoView,
    editarProductoForm
} from '../controllers/productosController.js';

const router = express.Router();

// API REST Routes
router.get('/api', getProductosAPI);
router.post('/api', crearProductoAPI);
router.get('/api/:id', getProductoAPI);
router.put('/api/:id', actualizarProductoAPI);
router.delete('/api/:id', eliminarProductoAPI);

// View Routes
router.get('/', getProductosView);
router.get('/crear', crearProductoForm);
router.get('/:id', getProductoView);
router.get('/:id/editar', editarProductoForm);

export default router;