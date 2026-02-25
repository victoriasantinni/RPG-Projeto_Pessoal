import express from 'express';

const router = express.Router();

router.post('/personagens', PersonagemController.criar);
router.get('/personagens', PersonagemController.lista);
router.put('/personagens/:nome', PersonagemController.atualizarLevel);
router.delete('/personagens/:nome', PersonagemController.deletar);