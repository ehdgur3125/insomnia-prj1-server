const models = require("../../models");

module.exports = async (begin, limit, include = [], where = undefined) => {
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
      offset: begin && Number(begin),
      limit: limit && Number(limit)
    });
    return items;
  } catch (e) {
    throw e;
  }
};
