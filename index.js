import express from 'express';
import dotenv from 'dotenv';
import './db/conn.js';

dotenv.config();

const app = express();

app.use(express.json());

// Import routes using ES6 import statements
import  usersRoutes from './usersRoutes/users.js';
import otp from '../server/usersRoutes/otp.js';
import verifyOTPRouter from '../server/usersRoutes/verify.js';
import userProfileRouter from '../server/routes/UserProfile.js';
import userFollowsRouter from '../server/routes/UserFollows.js';
import sportsRouter from '../server/routes/Sports.js';
import teamsRouter from '../server/routes/Team.js';
import playersRouter from '../server/routes/Players.js';
import competitionsRouter from '../server/routes/Competitions.js';
import GoverningBodies from "../server/routes/GoverningBodies.js"
import Coaches from "../server/routes/Coaches.js"
import Videos from "../server/routes/Videos.js"

// Use the imported routes
app.use('/users', usersRoutes);
app.use('/send-otp-email', otp);
app.use('/verify-otp', verifyOTPRouter);
app.use('/user-profiles', userProfileRouter);
app.use(userFollowsRouter);
app.use(sportsRouter);
app.use('/teams', teamsRouter);
app.use('/players', playersRouter);
app.use('/competitions', competitionsRouter);
app.use('/governing-bodies',GoverningBodies)
app.use('/governing-bodies',GoverningBodies)
app.use("/coaches",Coaches)
app.use("/videos",Videos)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});






