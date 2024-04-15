import './config/connection.js'; 

import User from './models/userModel.js'; 

const userData = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

User.insertMany(userData)
  .then(() => {
    console.log('Data seeded successfully');
    process.exit(0); 
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
    process.exit(1); 
  });
