import express from "express"
import { signup,login,logout,getMe } from "../controllers/authController.js" 
import { protectRoute } from "../middleware/protectRoute.js"


const router = express.Router()         // to handle routes passed from the main server.js file

router.get('/me',protectRoute,getMe)      // all the get and post method can be handled here after server.js
router.post('/signup',signup)             // route is called
router.post('/login',login)
router.post('/logout',logout)       // from here these are various controllers which can be used as a function 
                                             // to get a clean code

export default router;