import { Router } from 'express';
import {
  getuserByid,
  registerUser,
  deleteuser,
  updateUser
} from '../controllers/users.js';

const router = Router();

router.post('/', registerUser);
router.get(':id', getuserByid);
router.put(':id', updateUser);
router.delete(':id', deleteuser);

export default router;
