const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ detail: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'lunaris_ultra_secure_jwt_secret_key_2026');

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ detail: 'User account no longer exists' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ detail: 'Session expired or invalid authorization token' });
  }
};
