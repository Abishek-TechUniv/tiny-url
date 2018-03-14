const md5 = require('md5');
const bases = require('bases');
const redis = require('redis');

module.exports = (num) => {
  const shortUrls = {};
  const client = redis.createClient({ host: '0.0.0.0' });

  for (let i = 0; i < num; i += 1) {
    const longUrl = `http://${(Math.random() + 1).toString(36).slice(2, 10)}${(`000000000${i}`).slice(-7)}.com`;
    let start = 0;

    let url = bases
      .toBase62(bases.fromBase16(md5(longUrl)))
      .slice(start, start + 6);

    while (shortUrls[url]) {
      start += 1;
      url = bases
        .toBase62(bases.fromBase16(md5(longUrl)))
        .slice(start, start + 6);
    }
    client.hset('users', longUrl, url, redis.print);

    shortUrls[url] = {
      longUrl,
      shortUrl: url,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  return Object.values(shortUrls);
};
