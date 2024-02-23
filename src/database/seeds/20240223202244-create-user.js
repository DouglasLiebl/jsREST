/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tb_users', [{
      username: 'James Bond', email: 'jame@email.com', hash_password: bcrypt.hash('password', 8), created_at: new Date(), updated_at: new Date(),
    }], {});
  },
};
