import Producto from '../models/Producto.js';
import fetch from 'node-fetch';

// Controladores para VISTAS (frontend integrado)
export const getProductosView = async (req, res, next) => {
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

export const crearProductoForm = (req, res) => {
  const categorias = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Juguetes'];
  res.render('productos/crear', { 
    categorias,
    currentPath: '/productos/crear'
  });
};

export const getProductoView = async (req, res, next) => {
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

export const editarProductoForm = async (req, res, next) => {
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
export const getProductosAPI = async (req, res, next) => {
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

export const getProductoAPI = async (req, res, next) => {
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

export const crearProductoAPI = async (req, res, next) => {
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

export const actualizarProductoAPI = async (req, res, next) => {
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

export const eliminarProductoAPI = async (req, res, next) => {
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