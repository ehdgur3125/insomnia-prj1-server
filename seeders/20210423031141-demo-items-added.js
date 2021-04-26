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
    await queryInterface.bulkInsert("Items", [
      {
        name: "참치캔",
        text: "간단하게 밥과 참치로 끼니 해결",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "스팸",
        text: "노릇노릇하게 구운 스팸 한조각과 밥 한 숟가락",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "홈런볼",
        text: "출출할 때 입 심심할 때 하나씩 집어먹던 홈런볼",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "제티",
        text: "초등학교 때 가져가서 우유급식에 타먹던 제티",
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
