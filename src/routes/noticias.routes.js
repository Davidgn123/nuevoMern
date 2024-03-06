import { Router } from "express";
import { getNoticia,getNoticias,createNoticia,deleteNoticia, updateNoticia } from "../controllers/noticia.controller.js";

const router = Router()

router.get('/noticias', getNoticias );
router.get('/noticias/:id', getNoticia);
router.post('/noticias', createNoticia );
router.delete('/noticias/:id', deleteNoticia );
router.put('/noticias/:id', updateNoticia );

export default router