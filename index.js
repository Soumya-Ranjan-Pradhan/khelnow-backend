import express from "express";
import dotenv from "dotenv";
import "./config/db.js";
import routes from "./routes.js";
<<<<<<< HEAD
import { ApolloServer } from "apollo-server-express";
=======
import { ApolloServer, AuthenticationError } from "apollo-server-express";
>>>>>>> 12b04f0e363b6a18c5d84a72f4bb21cbe6415ac3
import typeDefs from "./graphql/index.js";
import resolvers from "./resolver/index.js";
import jwt from "jsonwebtoken";


dotenv.config();
const app = express();

app.use(express.json());
app.use(routes);

const serverStart = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
<<<<<<< HEAD
    context: ({ req, res }) => ({ req, res }), 
=======
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
>>>>>>> 12b04f0e363b6a18c5d84a72f4bb21cbe6415ac3
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
