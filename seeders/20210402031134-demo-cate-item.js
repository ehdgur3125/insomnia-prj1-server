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
    await queryInterface.bulkInsert('CategoryItems',[{
      itemId:1,
      categoryId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      itemId:1,
      categoryId:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      itemId:2,
      categoryId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      itemId:2,
      categoryId:3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      itemId:3,
      categoryId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      itemId:3,
      categoryId:4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      itemId:4,
      categoryId:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      itemId:4,
      categoryId:3,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('CagetoryItems',null,{});
  }
};
