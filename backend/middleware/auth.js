const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'bigsecret135792468';

function authMiddleware(req,res,next) {
  const token = req.headers.authorization?.split(' ')[1]
  if(!token) return res.status(400).json({error: "No token provided"})

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded;
    next()
  } catch(err) {
    return res.status(403).json({error: 'Invalid token'})
  }
}

module.exports = authMiddleware;