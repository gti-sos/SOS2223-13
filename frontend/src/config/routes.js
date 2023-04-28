const express = require('express');
const auth = require('../auth/auth');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const token = auth.authenticate(username, password);
  res.json({ token: token });
});

router.get('/protected', auth.authorize, (req, res) => {
  res.json({ message: 'Ruta protegida' });
});

module.exports = router;
