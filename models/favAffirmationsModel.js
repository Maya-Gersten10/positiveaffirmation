import mongoose from 'mongoose';

const favAffirmationSchema = new mongoose.Schema({
  affirmationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Affirmation',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FavAffirmation = mongoose.model('FavAffirmation', favAffirmationSchema);

export default FavAffirmation;
