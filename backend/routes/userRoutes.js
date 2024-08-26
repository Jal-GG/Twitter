import express from "express"
import { protectRoute } from  "../middleware/protectRoute.js";
import { getUserProfile,getSuggestion,followUnfollowUser,updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get('/profile/:username',protectRoute,getUserProfile)
router.get('/suggested',protectRoute,getSuggestion)
router.post('/follow/:id',protectRoute,followUnfollowUser)
router.post('/update',protectRoute,updateUserProfile)


export default router;