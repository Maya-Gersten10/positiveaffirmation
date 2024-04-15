import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

const verifyAuth = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  const token = tokenHeader.substring(7);
  try {
    const validToken = jwt.verify(token, SECRET);
    req.user = validToken; 
    next();
  } catch (error) {
    res.status(498).json({ tokenError: 'Invalid token or expired, re-authenticate' });
  }
};

export default verifyAuth;
