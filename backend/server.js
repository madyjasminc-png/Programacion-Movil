const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Inicializa la conexión a la Base de Datos
const db = require('./config/db'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares Globales
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite recibir JSON en los body de las peticiones

// Ruta base de prueba (Health Check)
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'API HabitZone funcionando correctamente 🚀' 
  });
});

// TODO: Importar rutas de módulos (Auth, Challenges, Progress, Community)
// const authRoutes = require('./routes/auth');
// app.use('/api/v1/auth', authRoutes);

// Arranque del Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de HabitZone corriendo en http://localhost:${PORT}`);
  console.log(`🩺 Health check disponible en http://localhost:${PORT}/api/v1/health`);
});
