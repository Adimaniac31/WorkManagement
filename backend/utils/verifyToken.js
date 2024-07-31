import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    const {userId} = req.params;
  
    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }
  
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token',err });
      }
      
      // Store the user's ID in the request for use in the deleteUser function
      req.userId = decoded.id;
      next();
    });
  };
  
  export default verifyToken;
  
