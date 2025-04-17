require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productosRoutes = require('./routes/productos');
const path = require('path');
const fetch = require('node-fetch'); // Necesario para consumir nuestra propia API

// Conexión a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/productos', productosRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.redirect('/productos');
});

// Middleware para manejo de errores de API
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Si es una petición API, responder con JSON
  if (req.originalUrl.startsWith('/productos/api')) {
    return res.status(500).json({
      success: false,
      error: 'Error en el servidor'
    });
  }
  
  // Para rutas de vistas, renderizar una página de error
  res.status(500).render('error', { error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});