const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const items = await models.Item.findAll({
      where: {
        [models.Sequelize.Op.or]: [
          {
            name: {
              [models.Sequelize.Op.like]: `%${req.query.keyword}%`,
            },
          },
          {
            text: {
              [models.Sequelize.Op.like]: `%${req.query.keyword}%`,
            },
          },
          {
            "$Categories.text$": {
              [models.Sequelize.Op.like]: `%${req.query.keyword}%`,
            },
          },
        ],
      },
      include: [
        {
          model: models.Category,
          require: false
        },
        {
          model: models.User,
          require: false,
        },
        {
          model: models.Option,
          include: models.ListItem,
        },
      ],
    });
    res.send({
      items: items.map((x) => {
        const [maxPrice, minPrice] = x.Options.reduce(
          (acc, y) => {
            return [Math.max(acc[0], y.price), Math.min(acc[1], y.price)];
          },
          [x.Options[0].price, x.Options[0].price]
        );
        const purchases = x.Options.reduce((acc, option) => {
          return (acc += option.ListItems.reduce(
            (acc2, list) => acc2 + list.quantity,
            0
          ));
        }, 0);
        return {
          itemId: x.id,
          name: x.name,
          likes: x.Users.length,
          liked: (req.userId >= 0) ? x.Users.some(user => user.id === req.userId) : false,
          purchases,
          maxPrice,
          minPrice,
        };
      }),
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
