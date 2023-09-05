// index.js
import express from 'express';
import dotenv from 'dotenv';
import './config/db.js';
import routes from './routes.js'; 

dotenv.config();

const app = express();

app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
