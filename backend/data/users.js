const bcrypt = require('bcryptjs');
require('dotenv').config();

const users = [
  {
    name: 'Admin User',
    username: 'admin_usr',
    bio: 'I am good',
    email: 'admin@example.com',
    password: bcrypt.hashSync(process.env.SEED_USERS_PASSWORD, 10),
    image: '/images/1.jpg',
    isAdmin: true,
    isVerified: true,
    isConfirmed: true,
    isGuest: false,
  },
  {
    name: 'John Doe',
    username: 'john',
    bio: 'I am good',
    email: 'john@example.com',
    password: bcrypt.hashSync(process.env.SEED_USERS_PASSWORD, 10),
    image: '/images/2.jpg',
    isConfirmed: true,
    isGuest: false,
  },
  {
    name: 'Jane Doe',
    username: 'jane',
    bio: 'I am good',
    email: 'jane@example.com',
    password: bcrypt.hashSync(process.env.SEED_USERS_PASSWORD, 10),
    image: '/images/3.jpg',
    isConfirmed: true,
    isGuest: true,
  },
  {
    name: 'Michael Scott',
    username: 'mike',
    bio: 'I am good',
    email: 'mike@example.com',
    password: bcrypt.hashSync(process.env.SEED_USERS_PASSWORD, 10),
    image: '/images/4.jpg',
    isConfirmed: true,
    isGuest: false,
  },
  {
    name: 'Dwight Schrute',
    username: 'dwight',
    bio: 'I am good',
    email: 'dwight@example.com',
    password: bcrypt.hashSync(process.env.SEED_USERS_PASSWORD, 10),
    image: '/images/5.jpg',
    isConfirmed: true,
    isGuest: false,
  },
];

module.exports = users;
