const models = require("../../models");
const { sendItems, findItems } = require("../modules");

module.exports = async (req, res) => {
  try {
    const { begin, limit, keyword } = req.query;
    const include = [
      {
        model: models.Category,
        require: false
      }
    ];
    const where = {
      [models.Sequelize.Op.or]: [
        {
          name: {
            [models.Sequelize.Op.like]: `%${keyword}%`,
          },
        },
        {
          text: {
            [models.Sequelize.Op.like]: `%${keyword}%`,
          },
        },
        {
          "$Categories.text$": {
            [models.Sequelize.Op.like]: `%${keyword}%`,
          },
        },
        {
          "$Options.text$": {
            [models.Sequelize.Op.like]: `%${keyword}%`,
          },
        }
      ],
    };
    const items = await findItems(undefined, undefined, include, where);
    sendItems(req, res, items);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
