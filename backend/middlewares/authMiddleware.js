const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado! Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'secreta123');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido!' });
  }
};
