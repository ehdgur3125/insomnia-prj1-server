const models = require("../../models");
module.exports = async (req, res) => {
  const categories = await models.Category.findAll({
    attributes: ["id", "text"],
    include: [
      {
        model: models.Item,
        require: false,
      },
    ],
  });
  res.send({
    categories: categories.map((x) => {
      return {
        id: x.id,
        name: x.text,
        quantity: x.Items.length,
      };
    }),
  });
};
