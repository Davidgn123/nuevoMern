import { Router } from "express";
//import validateSchema from "../middlewares/verificarToken.js";
import {login, register, logout, profile, usuarios }  from "../controllers/auth.controller.js"
import {authRequired} from '../middlewares/validateToken.js'

const router = Router()

router.post('/register', register);//, validateSchema 

router.post('/login',   login);

router.post('/logout',  logout);

router.get('/profile', authRequired,  profile);

router.get('/usuarios', usuarios)

export default router