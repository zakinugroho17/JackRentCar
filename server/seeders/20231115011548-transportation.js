'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transports = require('../data/rentcar.json').map((rentcar =>{
      rentcar.createdAt = new Date();
      rentcar.updatedAt = new Date();

      return rentcar
    }))
    await queryInterface.bulkInsert('Transportation', transports)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Transportation', null, {});
  }
};
