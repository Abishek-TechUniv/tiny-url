const populateDB = require('../utils/populateDB');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('urls', populateDB(1000000), {})
      .then(() => {
        for (let index = 0; index < 1000000; index += 1) {
        }
      }),
  down: queryInterface =>
    queryInterface.bulkDelete('urls', null, {}),
};
