import { Router } from "express";
//import validateSchema from "../middlewares/verificarToken.js";
import {login, register, logout, profile, usuarios, deleteUser }  from "../controllers/auth.controller.js"
import {authRequired} from '../middlewares/validateToken.js'

const router = Router()

router.post('/register', register);

router.post('/login',   login);

router.post('/logout',  logout);

router.get('/profile', authRequired,  profile);

router.get('/usuarios', usuarios)

router.delete('/usuarios', deleteUser)

export default router