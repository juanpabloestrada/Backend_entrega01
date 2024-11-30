const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rutas
app.use('/api/sessions', sessionRoutes);

// Escuchar en el puerto 3000
app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
