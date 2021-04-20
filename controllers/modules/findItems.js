const models = require("../../models");

module.exports = async (include = [], where = undefined) => {
  try {
    include.push(...[
      {
        model: models.User,
        require: false,
      },
      {
        model: models.Option,
        include: models.ListItem,
      },
      {
        model: models.Review,
        require: false
      }
    ]);
    const items = await models.Item.findAll({
      attributes: ["id", "name"],
      where,
      include,
      order: [["id", "asc"]],
    });
    return items;
  } catch (e) {
    throw e;
  }
};
