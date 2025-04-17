const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Rutas para API REST 
router.get('/api', productosController.getProductosAPI);
router.post('/api', productosController.crearProductoAPI);

router.get('/api/:id', productosController.getProductoAPI);
router.put('/api/:id', productosController.actualizarProductoAPI);
router.delete('/api/:id', productosController.eliminarProductoAPI);

// Rutas para vistas 
router.get('/', productosController.getProductosView);
router.get('/crear', productosController.crearProductoForm);
router.get('/:id', productosController.getProductoView);
router.get('/:id/editar', productosController.editarProductoForm);

module.exports = router;