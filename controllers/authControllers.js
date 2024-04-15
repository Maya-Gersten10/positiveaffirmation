import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../models/userModel.js';
import 'dotenv/config.js'

export const signup = async (req, res) => {

  try {

    const { username, password } = req.body;
    console.log(`${username} ${password}`)
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, password: hashedPassword });
    console.log(req.body)
    const token = jwt.sign({ username: newUser.username, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Failed to sign up user' });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).json({ message: 'Failed to sign in user' });
  }
};
