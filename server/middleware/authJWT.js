import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const authJWT = function authenticateJWT(req, res, next) {
  const token = req.cookies?.session;

  if (!token) {
    return res.status(401).json({ msg: 'Access denied. No token provided.' });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'blogna-api',
      audience: 'blogna',
      algorithms: ['HS256'],
    });

    req.user = decodedUser;

    return next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ msg: 'invalid or expired token' });
    }

    return next(err);
  }
};

export default authJWT;
