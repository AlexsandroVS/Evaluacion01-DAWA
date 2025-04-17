const Producto = require('../models/Producto');
const fetch = require('node-fetch').default;

// Controladores para VISTAS (frontend integrado)
exports.getProductosView = async (req, res, next) => {
  try {
    const response = await fetch(`http://localhost:${process.env.PORT || 3000}/productos/api`);
    
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    
    const { data: productos } = await response.json();
    res.render('productos/index', { 
      productos,
      currentPath: '/productos'
    });
  } catch (err) {
    next(err);
  }
};

exports.crearProductoForm = (req, res) => {
  const categorias = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Juguetes'];
  res.render('productos/crear', { 
    categorias,
    currentPath: '/productos/crear'
  });
};

exports.getProductoView = async (req, res, next) => {
  try {
    const response = await fetch(`http://localhost:${process.env.PORT || 3000}/productos/api/${req.params.id}`);
    
    if (!response.ok) {
      return res.status(404).render('error', { 
        error: 'Producto no encontrado',
        currentPath: '/error'
      });
    }
    
    const { data: producto } = await response.json();
    
    if (!producto) {
      return res.status(404).render('error', { 
        error: 'Producto no encontrado',
        currentPath: '/error'
      });
    }
    
    res.render('productos/detalle', { 
      producto,
      currentPath: `/productos/${req.params.id}`
    });
  } catch (err) {
    next(err);
  }
};

exports.editarProductoForm = async (req, res, next) => {
  try {
    const response = await fetch(`http://localhost:${process.env.PORT || 3000}/productos/api/${req.params.id}`);
    
    if (!response.ok) {
      return res.status(404).render('error', { 
        error: 'Producto no encontrado',
        currentPath: '/error'
      });
    }
    
    const { data: producto } = await response.json();
    const categorias = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Juguetes'];
    
    if (!producto) {
      return res.status(404).render('error', { 
        error: 'Producto no encontrado',
        currentPath: '/error'
      });
    }
    
    res.render('productos/editar', { 
      producto, 
      categorias,
      currentPath: `/productos/${req.params.id}/editar`
    });
  } catch (err) {
    next(err);
  }
};
// Controladores para API REST
exports.getProductosAPI = async (req, res, next) => {
  try {
    const productos = await Producto.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: productos.length,
      data: productos
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductoAPI = async (req, res, next) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }
    res.json({
      success: true,
      data: producto
    });
  } catch (err) {
    next(err);
  }
};

exports.crearProductoAPI = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    
    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio,
      stock,
      categoria
    });

    await nuevoProducto.save();
    
    res.status(201).json({
      success: true,
      data: nuevoProducto
    });
  } catch (err) {
    next(err);
  }
};

exports.actualizarProductoAPI = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion, precio, stock, categoria },
      { new: true, runValidators: true }
    );
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: producto
    });
  } catch (err) {
    next(err);
  }
};

exports.eliminarProductoAPI = async (req, res, next) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }
    res.json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};