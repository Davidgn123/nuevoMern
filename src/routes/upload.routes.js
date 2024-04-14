import express from 'express';
import multer from 'multer';
import { uploadImage } from '../components/subirimagen.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
    }

    const downloadURL = await uploadImage(file);
    res.json({ downloadURL });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;