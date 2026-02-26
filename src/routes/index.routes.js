import express from 'express';
import personagemRoutes from './personagem.route.js';

const router = express.Router();

router.use(personagemRoutes);

export default router;