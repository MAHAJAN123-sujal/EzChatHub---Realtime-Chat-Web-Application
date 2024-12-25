import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { getUserController, getMessagesController, sendMessagesController} from '../controllers/messageController.js';

const router = express.Router();

router.get('/users',protectRoute,getUserController)
router.get('/:id',protectRoute,getMessagesController)
router.post('/send/:id',protectRoute,sendMessagesController)
export default router;