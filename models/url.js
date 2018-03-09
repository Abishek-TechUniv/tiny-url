

module.exports = (sequelize, DataTypes) => {
  const url = sequelize.define('url', {
    longUrl: DataTypes.STRING(2046),
    shortUrl: {
      type: DataTypes.STRING(6),
      unique: true,
      validate:
       { len: [6, 6] },
    },
  }, {});

  url.newUrl = (shortUrl, longUrl) => url.findOrCreate({
    where: { shortUrl },
    defaults: { longUrl },
  });
  return url;
};
