import express from "express";
import dotenv from "dotenv";
import "./config/db.js";
import routes from "./routes.js";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/index.js";
import resolvers from "./resolver/index.js"
import cors from "cors"


dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);

const serverStart = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }), 
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
