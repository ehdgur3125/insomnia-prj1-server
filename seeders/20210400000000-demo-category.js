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
   await queryInterface.bulkInsert('Categories',[{
     text:'분류1',
     createdAt: new Date(),
     updatedAt: new Date(),
   },{
    text:'분류2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },{
    text:'분류3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },{
    text:'분류4',
    createdAt: new Date(),
    updatedAt: new Date(),
  }])
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
