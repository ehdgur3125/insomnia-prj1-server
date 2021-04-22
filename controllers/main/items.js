const models = require("../../models");
const { sendItems, findItems } = require("../modules");

module.exports = async (req, res) => {
  try {
    const items = await findItems(
      req.params.categoryName
        ? [{
          model: models.Category,
          require: true,
          where: {
            text: req.params.categoryName,
          },
        }]
        : []
    );
    sendItems(req, res, items);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
