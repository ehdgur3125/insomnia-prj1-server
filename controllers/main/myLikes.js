const models = require("../../models");
const { sendItems, findItems } = require("../modules");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const myLikes = await findItems([{
      model: models.User,
      require: true,
      where: {
        id: userId
      }
    }]);
    sendItems(req, res, myLikes);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
