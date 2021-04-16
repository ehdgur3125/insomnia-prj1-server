const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const myLikes = await models.User.findByPk(userId, {
      include: {
        model: models.Item,
        attributes: [
          "id",
          "name", //,
          //[models.Sequelize.literal(`(select count(*) from Likes where Likes.itemId=Items.id)`),'likes'],
          //[models.Sequelize.literal(`(select sum(quantity) from ListItems join Options on ListItems.optionId=Options.id where Options.itemId=Items.id)`),'purchases']
        ],
        include: [
          {
            model: models.User,
            attributes: ["id"],
            require: false,
          },
          {
            model: models.Option,
            include: {
              model: models.ListItem,
              attributes: ["quantity"],
            },
          },
        ],
      },
    });
    res.send({
      items: myLikes.Items.map((item) => {
        const [maxPrice, minPrice] = item.Options.reduce(
          (acc, y) => {
            return [Math.max(acc[0], y.price), Math.min(acc[1], y.price)];
          },
          [item.Options[0].price, item.Options[0].price]
        );
        const purchases = item.Options.reduce((acc, option) => {
          return (acc += option.ListItems.reduce(
            (acc2, list) => acc2 + list.quantity,
            0
          ));
        }, 0);
        return {
          itemId: item.id,
          name: item.name,
          likes: item.Users.length,
          purchases,
          maxPrice,
          minPrice,
        };
      }),
    });
  } catch (e) {
    console.log(e.name);
    res.status(400).send(e.name);
  }
};
