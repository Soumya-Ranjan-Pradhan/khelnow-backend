// index.js
import express from "express";
import dotenv from "dotenv";
import "./config/db.js";
import routes from "./routes.js";
const app = express();
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/index.js";
import resolvers from "./resolver/index.js"

dotenv.config();
app.use(express.json());
app.use(routes);

const serverStart = new ApolloServer({
  typeDefs,
  resolvers,
  response: ({ req, res }) => ({
    req,
    res,
  }),
});

const Start = async () => {
  await serverStart.start();
  serverStart.applyMiddleware({ app });
};
Start();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
