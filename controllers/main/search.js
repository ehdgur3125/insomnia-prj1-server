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
        ],
      },
      include: models.Option,
    });
    res.send(items);
  } catch (e) {
    console.log(e.name);
    res.status(400).send(e.name);
  }
};
