const populateDB = require('../utils/populateDB');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('urls', populateDB(10), {}),
  down: queryInterface =>
    queryInterface.bulkDelete('urls', null, {}),
};
