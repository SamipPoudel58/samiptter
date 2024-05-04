const generateAvatars = (name) =>
  `https://robohash.org/${name}/set_set${Math.floor(
    Math.random() * 2 + 1
  )}?size=400x400`;

module.exports = { generateAvatars };
