const fs = require('fs').promises;
const path = require('path');

let htmlTemplateCache = null;

const loadHtmlTemplate = async () => {
  if (htmlTemplateCache) {
    return htmlTemplateCache;
  } else {
    const htmlTemplatePath = path.join(
      __dirname,
      '../templates/confirmation-email.html'
    );
    try {
      const htmlTemplate = await fs.readFile(htmlTemplatePath, 'utf8');
      htmlTemplateCache = htmlTemplate;
      return htmlTemplate;
    } catch (err) {
      throw new Error('Error loading email template: ' + err);
    }
  }
};

module.exports = { loadHtmlTemplate };
