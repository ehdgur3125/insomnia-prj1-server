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
        text: "옵션1",
        itemId: 1,
        price: 1000,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "옵션2",
        itemId: 1,
        price: 2000,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "옵션3",
        itemId: 1,
        price: 3000,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "옵션1",
        itemId: 2,
        price: 2000,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "옵션2",
        itemId: 2,
        price: 4000,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "옵션3",
        itemId: 2,
        price: 8000,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "옵션1",
        itemId: 3,
        price: 1000,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "옵션2",
        itemId: 3,
        price: 5000,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "옵션3",
        itemId: 3,
        price: 25000,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "옵션1",
        itemId: 4,
        price: 2000,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "옵션2",
        itemId: 4,
        price: 2500,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "옵션3",
        itemId: 4,
        price: 2900,
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
