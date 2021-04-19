"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Categories", [
      {
        text: "식사",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "라면",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "간식",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "분말차",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
