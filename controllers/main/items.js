const models = require("../../models");
const { sendItems, findItems } = require("../modules");

module.exports = async (req, res) => {
  try {
    const include = req.params.categoryName
      ? [{
        model: models.Category,
        require: true,
        where: {
          text: req.params.categoryName,
        },
      }]
      : [];
    const { begin, limit } = req.query;
    const items = await findItems(begin, limit, include);
    sendItems(req, res, items);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
