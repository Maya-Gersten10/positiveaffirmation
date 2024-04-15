import express from 'express';
import Affirmation from '../models/Affirmation.js';
import { getFavAffirmationsByUserId, addFavAffirmation, updatefavAffirmation } from '../Api/config/controllers/favAffirmationControllers.js';
import verifyAuth from '../middleware/verifyAuth.js';

const router = express.Router();

router.get('/:userId', verifyAuth, getFavAffirmationsByUserId);
router.post('/', verifyAuth, addFavAffirmation);
router.put('/:id', verifyAuth, updatefavAffirmation);
router.delete('/:id', verifyAuth, async (req, res) => {
    try {
      const affirmationId = req.params.id;
      
      const deletedAffirmation = await Affirmation.findByIdAndDelete(affirmationId);
  
      if (!deletedAffirmation) {
        return res.status(404).json({ message: 'Affirmation not found' });
      }
  
      res.json({ message: 'Affirmation deleted successfully' });
    } catch (error) {
      console.error('Error deleting affirmation:', error);
      res.status(500).json({ message: 'Failed to delete affirmation' });
    }
  });

export default router;
