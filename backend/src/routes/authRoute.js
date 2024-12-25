import express from 'express'
import { signUpController,loginController,logoutController,updateProfileController,checkAuthController} from '../controllers/authController.js'
import { protectRoute } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/signup',signUpController)
router.post('/login',loginController)
router.post('/logout',logoutController)
router.put('/update-profile',protectRoute,updateProfileController)
router.get('/check',protectRoute,checkAuthController)
export default router