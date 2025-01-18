import express from 'express';
import { loginUser, logout, Myprofile, registerUser, updateProfilePic, userProfile } from '../controllers/userController.js';
import { isAuth } from '../middlewares/isAuth.js';
import uploadFile from '../middlewares/multer.js';
const router = express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",isAuth,logout);
router.get("/me",isAuth,Myprofile);
router.get("/:id",isAuth,userProfile);
router.post('/updatepic',isAuth,uploadFile,updateProfilePic)


export default router;