const jwt = require('jsonwebtoken');

const cookieExtractor = (req) => {
  return req && req.cookies ? req.cookies.jwt : null;
};

const currentStrategy = (req, res, next) => {
  const token = cookieExtractor(req);
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { currentStrategy };
