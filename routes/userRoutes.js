import express from 'express';
import { createUser, getUsers, getUserById, updateUserById, deleteUserById } from '../Api/config/controllers/userControllers.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
