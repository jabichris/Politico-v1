import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      error: 'unauthorized access',
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        error: 'authenticate failed',
      });
    }
    if (decoded.kindUser !== 'admin') {
      return res.status(401).json({
        status: 401,
        error: 'Only admin authorised',
      });
    }

    req.userId = decoded.userId || null;
    req.isAdmin = decoded.kinderUser || null;
    next();
    return true;
  });
  return true;
};

export default verifyToken;
