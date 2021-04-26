'use strict';

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
    await queryInterface.bulkInsert("CategoryItems", [
      {
        itemId: 7,
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 8,
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 7,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 8,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 9,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 10,
        categoryId: 4,
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
  }
};
