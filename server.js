import 'dotenv/config.js'
console.log(process.env.JWT_SECRET)
import express from 'express';
import connectDB from './api/config/connection.js';
import userRoutes from './routes/userRoutes.js';
import verifyAuth from './middleware/verifyAuth.js'; 
import authRoutes from './routes/authRoutes.js';
import affirmationRoutes from './routes/affirmationRoutes.js';
import favAffirmationRoutes from './models/favAffirmationsModel.js';
import { getFavAffirmationsByUserId, addFavAffirmation, updatefavAffirmation, deletefavAffirmation } from './Api/config/controllers/favAffirmationControllers.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB()
app.use('/api/affirmations', verifyAuth, affirmationRoutes);
app.use('/api/fav-affirmations', verifyAuth,favAffirmationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/fav-affirmations', [
  express.json(), 
  getFavAffirmationsByUserId,
  addFavAffirmation,
  updatefavAffirmation
]);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});