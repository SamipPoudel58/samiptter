const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/1.jpg",
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/2.jpg",
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/3.jpg",
  },
  {
    name: "Michael Scott",
    email: "mike@example.com",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/4.jpg",
  },
  {
    name: "Dwight Schrute",
    email: "dwight@example.com",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/5.jpg",
  },
];

module.exports = users;
