import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = decoded.user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export default verifyToken;



