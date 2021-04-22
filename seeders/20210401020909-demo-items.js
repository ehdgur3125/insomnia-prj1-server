"use strict";
const models = require("../models");

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
        name: "신라면",
        text: "국민 라면의 위용을 떨치는 농심의 라면",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "진라면",
        text: "매운 맛과 순한 맛, 두 가지 선택",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "컵밥",
        text: "배달 시키기는 버거울 때\n간단하게 한 끼 해결할 때",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "만두",
        text: "요즈음 미국에서 유행이라는 비비고 만두",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "율무차",
        text: "코스트코에 가면 꼭 사야한다는\n그 호두율무차",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "초콜릿",
        text: "당 떨어질 때 입 심심할 때\n조각조각내서 천천히 먹는 그 맛",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Likes", null, {});
    await queryInterface.bulkDelete("Items", null, {});
  },
};
