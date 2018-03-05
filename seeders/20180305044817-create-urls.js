const md5 = require('md5');

const urlsArr = [];
const hash = new Set();

const returnHash = (url) => {
  const hashedUrl = md5(url);
  const distance = 6;
  let start = 0;
  while (hash.has(hashedUrl.slice(start, start + distance)) && start < 120) {
    start += 6;
  }
  const minifiedHash = hashedUrl.slice(start, start + distance);
  hash.add(minifiedHash);
  return minifiedHash;
};

for (let index = 0; index < 1000000; index += 1) {
  const longUrl = `https://urlmyurlhellourl${index}.com`;
  const shortUrl = returnHash(longUrl);

  urlsArr.push({
    longUrl,
    shortUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('urls', urlsArr, {}),
  down: queryInterface => queryInterface.bulkDelete('urls', null, {}),
};
