// @ts-nocheck

const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authenticate(username, password) {
  // Aquí deberías verificar las credenciales del usuario en tu base de datos
  // Si las credenciales son válidas, genera un token JWT
  const token = jwt.sign({ username: username }, config.secret, { expiresIn: '1h' });
  return token;
}

function authorize(req, res, next) {
  // Obtén el token JWT de la cabecera de la solicitud
  const token = req.headers.authorization;

  if (token) {
    try {
      // Verifica y decodifica el token JWT
      const decoded = jwt.verify(token, config.secret);
      // Agrega la información del usuario al objeto de solicitud
      req.user = decoded;
      // Continúa con la solicitud protegida
      next();
    } catch (err) {
      // Si hay algún error al verificar el token, devuelve un error 401 (No autorizado)
      res.status(401).json({ error: 'Token inválido' });
    }
  } else {
    // Si no se proporciona ningún token, devuelve un error 401 (No autorizado)
    res.status(401).json({ error: 'Token requerido' });
  }
}

module.exports = {
  authenticate: authenticate,
  authorize: authorize
};
