export const generateLinks = (input) => {
  const inputWithMentions = input.replace(/@[a-z0-9_]*/g, function (username) {
    return `<a class="tweet__mentionedUser" href="/profile/${username.replace(
      "@",
      ""
    )}">${username}</a>`;
  });

  return inputWithMentions.replace(/(https?:\/\/[^\s]+)/g, function (url) {
    return (
      '<a href="' +
      url +
      '" target="_blank" rel="noopener noreferrer">' +
      url +
      "</a>"
    );
  });
};
