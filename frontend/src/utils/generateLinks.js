export const generateLinks = (input) => {
  return input.replace(/(https?:\/\/[^\s]+)/g, function (url) {
    return (
      '<a href="' +
      url +
      '" target="_blank" rel="noopener noreferrer">' +
      url +
      "</a>"
    );
  });
};
