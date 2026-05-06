// ============================================
// RegulaSUS — Auth Middleware (JWT)
// ============================================

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'regulasus-secret-key-2026';
const JWT_EXPIRES = '8h';

function generateToken(user) {
  return jwt.sign(
    { id: user.id, cpf: user.cpf, perfil: user.perfil, nome: user.nome },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user.perfil !== 'Administrador') {
    return res.status(403).json({ error: 'Acesso restrito a administradores.' });
  }
  next();
}

module.exports = { generateToken, authenticateToken, requireAdmin, JWT_SECRET };
