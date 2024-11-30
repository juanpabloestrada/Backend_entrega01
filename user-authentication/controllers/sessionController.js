const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const current = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }
  res.json(user);
};

module.exports = { login, current };
