import Affirmation from '../../../models/affirmationModel.js';

export const getAllAffirmations = async (req, res) => {
  try {
    const affirmations = await Affirmation.find();
    res.json(affirmations);
  } catch (error) {
    console.error('Error fetching affirmations:', error);
    res.status(500).send('Failed to fetch affirmations');
  }
};

export const createAffirmation = async (req, res) => {
  try {
    const { text, category } = req.body;
    const newAffirmation = new Affirmation({ text, category, createdBy: req.user.id });
    const savedAffirmation = await newAffirmation.save();
    res.status(201).json(savedAffirmation);
  } catch (error) {
    console.error('Error creating affirmation:', error);
    res.status(500).send('Failed to create affirmation');
  }
};

export const updateAffirmation = async (req, res) => {
  try {
    const { id } = req.params;
    const affirmation = await Affirmation.findById(id);
    if (!affirmation) {
      return res.status(404).json({ message: 'Affirmation not found' });
    }
    if (affirmation.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this affirmation' });
    }
    affirmation.text = req.body.text || affirmation.text;
    affirmation.category = req.body.category || affirmation.category;
    const updatedAffirmation = await affirmation.save();
    res.json(updatedAffirmation);
  } catch (error) {
    console.error('Error updating affirmation:', error);
    res.status(500).send('Failed to update affirmation');
  }
};

export const deleteAffirmation = async (req, res) => {
  try {
    const { id } = req.params;
    const affirmation = await Affirmation.findById(id);
    if (!affirmation) {
      return res.status(404).json({ message: 'Affirmation not found' });
    }
    if (affirmation.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this affirmation' });
    }
    await affirmation.remove();
    res.json({ message: 'Affirmation deleted successfully' });
  } catch (error) {
    console.error('Error deleting affirmation:', error);
    res.status(500).send('Failed to delete affirmation');
  }
};
