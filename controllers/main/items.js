const models = require("../../models");

module.exports = async (req, res) => {
  const include = [
    {
      model: models.User,
      require: false,
    },
    {
      model: models.Option,
      include: models.ListItem,
    },
  ];
  if (req.params.categoryId)
    include.push({
      model: models.Category,
      require: true,
      where: {
        id: req.params.categoryId,
      },
    });
  const items = await models.Item.findAll({
    attributes: ["id", "name"],
    include,
    order: [["id", "asc"]],
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
        purchases,
        maxPrice,
        minPrice,
      };
    }),
  });
};
