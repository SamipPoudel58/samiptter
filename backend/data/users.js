const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    bio: "I am good",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/1.jpg",
    isAdmin: true,
  },
  {
    name: "John Doe",
    bio: "I am good",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/2.jpg",
  },
  {
    name: "Jane Doe",
    bio: "I am good",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/3.jpg",
  },
  {
    name: "Michael Scott",
    bio: "I am good",
    email: "mike@example.com",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/4.jpg",
  },
  {
    name: "Dwight Schrute",
    bio: "I am good",
    email: "dwight@example.com",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/5.jpg",
  },
];

module.exports = users;
