import FavAffirmation from '../../../models/favAffirmationsModel.js';

export const getFavAffirmationsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const favAffirmations = await FavAffirmation.find({ userId });
    res.json(favAffirmations);
  } catch (error) {
    console.error('Error fetching favorite affirmations:', error);
    res.status(500).send('Failed to fetch favorite affirmations');
  }
};

export const addFavAffirmation = async (req, res) => {
  try {
    const { affirmationId, userId } = req.body;
    const newFavAffirmation = new FavAffirmation({ affirmationId, userId });
    const savedFavAffirmation = await newFavAffirmation.save();
    res.status(201).json(savedFavAffirmation);
  } catch (error) {
    console.error('Error adding favorite affirmation:', error);
    res.status(500).send('Failed to add favorite affirmation');
  }
};

export const updatefavAffirmation = async (req, res) => {
  try {
    const affirmationId = req.params.id;
    const { userId, category, createdBy, ref } = req.body;
    const updatedFavAffirmation = await FavAffirmation.findByIdAndUpdate(
      affirmationId,
      { userId, category, createdBy, ref },
      { new: true }
    );
    res.json(updatedFavAffirmation);
  } catch (error) {
    console.error('Error updating favorite affirmation:', error);
    res.status(500).send('Failed to update favorite affirmation');
  }
};

export const deletefavAffirmation = async (req, res) => {
  try {
    const affirmationId = req.params.id;
    await FavAffirmation.findByIdAndDelete(affirmationId);
    res.json({ message: 'Favorite affirmation deleted successfully' });
  } catch (error) {
    console.error('Error deleting favorite affirmation:', error);
    res.status(500).send('Failed to delete favorite affirmation');
  }
};

export default {
  getFavAffirmationsByUserId,
  addFavAffirmation,
  updatefavAffirmation,
  deletefavAffirmation
};
