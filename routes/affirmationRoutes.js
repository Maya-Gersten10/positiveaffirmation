import express from 'express';
import { getAllAffirmations, createAffirmation, updateAffirmation, deleteAffirmation } from '../Api/config/controllers/affirmationControllers.js';
import verifyAuth from '../middleware/verifyAuth.js';

const router = express.Router();

router.get('/', getAllAffirmations);
router.post('/', verifyAuth, createAffirmation);
router.put('/:id', verifyAuth, updateAffirmation);
router.delete('/:id', verifyAuth, deleteAffirmation);

export default router;
