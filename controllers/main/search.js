const models = require("../../models");
const { sendItems, findItems } = require("../modules");

module.exports = async (req, res) => {
  try {
    const items = await findItems(
      [
        {
          model: models.Category,
          require: false
        }
      ],
      {
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
          {
            "$Options.text$": {
              [models.Sequelize.Op.like]: `%${req.query.keyword}%`,
            },
          }
        ],
      }
    );
    sendItems(req, res, items);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
