"use strict";

const { query } = require("express");

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
    await queryInterface.bulkInsert("Options", [
      {
        text: "5입",
        itemId: 1,
        price: 3380,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "큰사발 6입",
        itemId: 1,
        price: 4500,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "블랙 4입",
        itemId: 1,
        price: 5380,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "블랙두부김치 4입",
        itemId: 1,
        price: 5100,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "매운맛 5입",
        itemId: 2,
        price: 2750,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "매운맛 컵 6입",
        itemId: 2,
        price: 3980,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "순한맛 5입",
        itemId: 2,
        price: 2750,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "순한맛 컵 6입",
        itemId: 2,
        price: 3980,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "중화마파두부덮밥",
        itemId: 3,
        price: 3000,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "불닭마요덮밥",
        itemId: 3,
        price: 3500,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "철판제육덮밥",
        itemId: 3,
        price: 3500,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "간장계란장덮밥",
        itemId: 3,
        price: 3500,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "진한고기만두 2입",
        itemId: 4,
        price: 8500,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "수제김치만두 2입",
        itemId: 4,
        price: 8500,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "찰보리감자만두 2입",
        itemId: 4,
        price: 8500,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "50입",
        itemId: 5,
        price: 14950,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "130입",
        itemId: 5,
        price: 20830,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "마일드 15개입",
        itemId: 6,
        price: 10810,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "밀크 15개입",
        itemId: 6,
        price: 10810,
        state: "onSale",
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
    await queryInterface.bulkDelete("ListItems", null, {});
    await queryInterface.bulkDelete("Options", null, {});
  },
};
