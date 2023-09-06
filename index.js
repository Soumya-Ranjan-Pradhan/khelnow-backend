// index.js
import express from 'express';
import dotenv from 'dotenv';
import './config/db.js';
import routes from './routes.js'; 
const app = express();

dotenv.config();

app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});


app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
