const { url } = require('../../models');

const MINIFIED_LENGTH = 6;

const insertUrl =
(longUrl, hash, start = 0, length = MINIFIED_LENGTH) => {
  if (start === hash.length - length) { return false; }

  const shortUrl = hash.slice(start, start + length);

  return url.newUrl(shortUrl, longUrl).spread((urlObj, created) => {
    if (!created) {
      if (urlObj.longUrl === longUrl) {
        return { shortUrl, longUrl, created };
      }
      return insertUrl(longUrl, hash, start + 1);
    }
    return { shortUrl, longUrl, created };
  });
};

module.exports = insertUrl;
