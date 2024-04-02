import express from 'express';
import {
  registerAdmin,
} from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/admins', registerAdmin);

export default router;