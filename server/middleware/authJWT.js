import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const authJWT = function authenticateJWT(req, res, next) {
  const token = req.cookies.session;

  if (!token) {
    return res.status(401).json({ msg: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ msg: 'Invalid or expired token.' });
    }

    req.user = decodedUser;
    next();
  });
}

export default authJWT;