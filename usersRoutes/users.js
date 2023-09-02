import { Router } from 'express';
import {
  getuserByid,
  registerUser,
  deleteuser,
  updateUser
} from '../controllers/users.js';

const router = Router();

router.post('/register', registerUser);
router.get('/getuserByid/:id', getuserByid);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteuser/:id', deleteuser);

export default router;
