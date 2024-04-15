import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        // minlength: [4, 'Username must be at least 4 characters long'],
        // maxlength: [14, 'Username cannot be more than 14 characters long'],
        match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
}, {collection: 'users'});

const User = mongoose.model('User', userSchema);

export default User;
