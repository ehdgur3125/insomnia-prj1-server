const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const { itemId, grade, text } = req.body.params;
    await models.Review.create({ userId, itemId, grade, text });
    res.send("success");
  } catch (e) {
    console.log(e.name);
    res.status(400).send(e.name);
  }
};
