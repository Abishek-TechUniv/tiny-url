const populateDB = require('../utils/populateDB');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('urls', populateDB(1000000), {}),
  down: queryInterface =>
    queryInterface.bulkDelete('urls', null, {}),
};
