import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
  console.log(1)
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader)

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authorizationHeader.split(" ")[1];
  console.log(token)

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
  console.log(verified)

    req.user = { id: verified._id };
  
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};


// Create a middleware for decoding JWT
const jwtDecode = (req, res, next) => {
  console.log("first")
  const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  console.log("🚀 ~ file: verifyToken.js:34 ~ jwtDecode ~ token:", token)
  
  if (token) {
    try {
      const decodedToken = jwt.decode(token);
      console.log("🚀 ~ file: verifyToken.js:39 ~ jwtDecode ~ decodedToken:", decodedToken)
      
      req.decodedToken = decodedToken;
      next(); 
    } catch (error) {
      res.status(401).json({ message: "Token decoding failed" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};


export {verifyToken,jwtDecode};
