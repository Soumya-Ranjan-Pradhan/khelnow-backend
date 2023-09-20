import express from "express";
import dotenv from "dotenv";
import "./config/db.js";
import routes from "./routes.js";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import typeDefs from "./graphql/index.js";
import resolvers from "./resolver/index.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/verifyToken.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(routes);

app.use(verifyToken);

const serverStart = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,

    context: ({ req, res }) => ({ req, res }), 

    context: ({ req }) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_TOKEN);
          return {
            userId: decoded._id,
          };
        } catch (error) {
          throw new AuthenticationError('Invalid token');
        }
      }
      return {};
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
  });
};

serverStart().catch((error) => {
  console.error("Error starting server:", error);
});
