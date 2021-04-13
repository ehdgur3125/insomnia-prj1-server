const models = require("../../models");
module.exports = async (req, res) => {
  const item = await models.Item.findByPk(req.params.itemId, {
    attributes: [
      "id",
      "name",
      "text", //,
      //[models.Sequelize.literal(`(select COUNT(*) from Likes where Likes.itemId=${req.params.itemId})`),'likes'],
      //[models.Sequelize.literal(`(select SUM(quantity) from ListItems join Options on ListItems.optionId=Options.id where Options.itemId=${req.params.itemId})`),'purchases']
    ],
    include: [
      {
        model: models.User,
        require: false,
      },
      {
        model: models.Option,
        attributes: ["id", "text", "price"],
        include: {
          model: models.ListItem,
          include: models.Order,
        },
      },
      {
        model: models.Review,
        attributes: ['text', 'grade', 'createdAt'],
        require: false,
        include: {
          model: models.User,
          attributes: ['username']
        },
      }
    ],
    order: [[models.Option, "id", "asc"], [models.Review, 'createdAt', 'desc']],
  });
  const userId = req.userId;
  res.send({
    item: {
      itemId: item.id,
      name: item.name,
      text: item.text,
      options: item.Options.map((option) => {
        return {
          optionId: option.id,
          text: option.text,
          price: option.price,
          inCart: userId >= 0
            ? option.ListItems.some(
              (listItem) =>
                listItem.Order.userId === userId &&
                listItem.Order.state === "inCart"
            )
            : false,
        };
      }),
      reviews: item.Reviews,
      grade: item.Reviews.length > 0
        ? item.Reviews.reduce((acc, review) => acc + review.grade, 0) / item.Reviews.length
        : false,
      likes: item.Users.length,
      liked: userId >= 0 ? item.Users.some((user) => user.id === userId) : false,
      purchased: userId >= 0
        ? item.Options.filter(option =>
          option.ListItems.some(
            listItem => listItem.Order.userId === userId && listItem.Order.state !== "incart"
          ))
        : false,
      purchases: item.Options.reduce(
        (acc1, option) =>
          acc1 +
          option.ListItems.filter(
            (listItem) => listItem.Order.state !== "inCart"
          ).reduce((acc2, listItem) => acc2 + listItem.quantity, 0),
        0
      ),
    },
  });
};
