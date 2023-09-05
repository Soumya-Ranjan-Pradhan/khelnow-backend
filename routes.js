
import express from 'express';
import usersRoutes from './usersRoutes/users.js';
import otp from '../server/usersRoutes/otp.js';
import verifyOTPRouter from '../server/usersRoutes/verify.js';
import userProfileRouter from '../server/routes/UserProfile.js';
import userFollowsRouter from '../server/routes/UserFollows.js';
import sportsRouter from '../server/routes/Sports.js';
import teamsRouter from '../server/routes/Team.js';
import playersRouter from '../server/routes/Players.js';
import competitionsRouter from '../server/routes/Competitions.js';
import GoverningBodies from "../server/routes/GoverningBodies.js";
import Coaches from "../server/routes/Coaches.js";
import Videos from "../server/routes/Videos.js";

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/send-otp-email', otp);
router.use('/verify-otp', verifyOTPRouter);
router.use('/user-profiles', userProfileRouter);
router.use(userFollowsRouter);
router.use(sportsRouter);
router.use('/teams', teamsRouter);
router.use('/players', playersRouter);
router.use('/competitions', competitionsRouter);
router.use('/governing-bodies', GoverningBodies);
router.use('/coaches', Coaches);
router.use('/videos', Videos);

export default router;
