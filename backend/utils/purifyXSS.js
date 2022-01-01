const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const purifyXSS = (input) => {
  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);

  return DOMPurify.sanitize(input);
};

module.exports = { purifyXSS };
