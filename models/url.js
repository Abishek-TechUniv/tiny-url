

module.exports = (sequelize, DataTypes) => {
  const url = sequelize.define('url', {
    longUrl: DataTypes.STRING,
    shortUrl: { type: DataTypes.STRING, unique: true },
  }, {});
  url.associate = function (models) {
    // associations can be defined here
  };
  return url;
};
