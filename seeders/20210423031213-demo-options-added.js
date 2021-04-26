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
    await queryInterface.bulkInsert("Options", [
      {
        text: "라이트 스탠다드 150g 3입",
        itemId: 7,
        price: 6790,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "고추참치 150g 3입",
        itemId: 7,
        price: 6790,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "야채참치 100g",
        itemId: 7,
        price: 1260,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "클래식 200g 8입",
        itemId: 8,
        price: 24400,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "클래식 340g 6입",
        itemId: 8,
        price: 27000,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "클래식 200g 6입",
        itemId: 8,
        price: 14900,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "초코 46g 8입",
        itemId: 9,
        price: 9900,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "딸기 46g 4입",
        itemId: 9,
        price: 4800,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "무지방우유 46g 3입",
        itemId: 9,
        price: 3760,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "쵸코렛맛 17g 20입",
        itemId: 10,
        price: 3900,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "쵸코렛맛 17g 80입",
        itemId: 10,
        price: 12500,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "딸기맛 17g 20입",
        itemId: 10,
        price: 3900,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "바나나맛 17g 20입",
        itemId: 10,
        price: 3900,
        state: "onSale",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "쿠키맛 17g 20입",
        itemId: 10,
        price: 3900,
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
  }
};
