'use strict';
const models=require('../models');

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
    await queryInterface.bulkInsert('Items',[{
      name: '상품1',
      text:'테스트를 위한 더미 상품 1입니다.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: '상품2',
      text:'테스트를 위한 더미 상품 2입니다.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: '상품3',
      text:'테스트를 위한 더미 상품 3입니다.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: '상품4',
      text:'테스트를 위한 더미 상품 4입니다.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Likes',null,{});
    await queryInterface.bulkDelete('Items',null,{});
  }
};
