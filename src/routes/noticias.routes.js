import { Router } from "express";
import { getNoticia,getNoticias,createNoticia,deleteNoticia, updateNoticia, getNoticiasNoAprobadas, aprobarNoticia, getNoticiasAprobadas } from "../controllers/noticia.controller.js";

const router = Router()

router.get('/noticias', getNoticias );
router.get('/noticias/:id', getNoticia);
router.post('/noticias', createNoticia );
router.delete('/noticias/:id', deleteNoticia );
router.put('/noticias/:id', updateNoticia );

router.get('/noticias/no-aprobadas', getNoticiasNoAprobadas); 
router.put('/noticias/:id/aprobar', aprobarNoticia);
router.get('/noticias/aprobadas', getNoticiasAprobadas);

export default router