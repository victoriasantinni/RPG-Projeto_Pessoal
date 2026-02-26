import express from 'express';
import { PersonagemController } from '../controllers/personagem.controller.js';

const router = express.Router();

router.post('/personagens', PersonagemController.criar);
router.get('/personagens', PersonagemController.listar);
router.get('/personagens/:id', PersonagemController.buscarPorId);
router.put('/personagens/:id', PersonagemController.atualizarNivel);
router.delete('/personagens/:id', PersonagemController.deletar);

export default router;