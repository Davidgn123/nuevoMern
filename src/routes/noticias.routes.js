import { Router } from "express";
import { getNoticias,createNoticia,deleteNoticia, updateNoticia, getNoticiasPendientes, getNoticiasNoAprobadas, aprobarNoticia, rechazarNoticia, getNoticiasAprobadas } from "../controllers/noticia.controller.js";
import multer from 'multer';
import { storage } from '../middlewares/cloudinary.js';
const upload = multer({
    storage: storage
})

const router = Router()

router.get('/noticias', getNoticias );

const input = upload.fields([{name: 'imagePhoto'}]);
router.post('/noticias', input, createNoticia );
router.delete('/noticias/:id', deleteNoticia );
router.put('/noticias/:id', updateNoticia );

router.get('/noticias/pendientes', getNoticiasPendientes);
router.get('/noticias/noaprobadas', getNoticiasNoAprobadas);
router.put('/noticias/:id/aprobar', aprobarNoticia);
router.put('/noticias/:id/rechazar', rechazarNoticia);

export default router