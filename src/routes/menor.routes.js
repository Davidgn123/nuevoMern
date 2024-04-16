import { Router } from "express";
//import { authRequired } from "../middlewares/validateToken.js";
import { getMenor, getMisMenores, getMenores,createMenor,deleteMenor, updateMenor, loginMenor } from "../controllers/menor.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.get('/menor', getMenores );
router.get('/menores/:id', getMisMenores );
router.get('/menor/:id',  getMenor);
router.post('/menor', createMenor );
router.delete('/menor/:id',  deleteMenor );
router.put('/menor/:id', updateMenor);


router.post('/menorlogin', loginMenor);

export default router