import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
    return next();
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = { id: decoded.id }; 

    next();
  } catch (error) {
    next();
  }
};

// Create a middleware for decoding JWT
const jwtDecode = (req, res, next) => {
  console.log("first")
  const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  // console.log("🚀 ~ file: verifyToken.js:34 ~ jwtDecode ~ token:", token)
  
  if (token) {
    try {
      const decodedToken = jwt.decode(token);
      // console.log("🚀 ~ file: verifyToken.js:39 ~ jwtDecode ~ decodedToken:", decodedToken)
      
      req.decodedToken = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token decoding failed" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

export { verifyToken, jwtDecode };
