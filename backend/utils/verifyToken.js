import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }
  
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token',err });
      }
      
      req.userId = decoded.id;
      next();
    });
  };
  
  export default verifyToken;
  
