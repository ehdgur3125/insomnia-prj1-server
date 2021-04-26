const models = require("../../models");
const { sendItems, findItems } = require("../modules");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    const { begin, limit } = req.query;
    if (userId < 0) throw "Invalid access";
    const include = [{
      model: models.User,
      require: true,
      where: {
        id: userId
      }
    }];
    const myLikes = await findItems(begin, limit, include);
    sendItems(req, res, myLikes);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
