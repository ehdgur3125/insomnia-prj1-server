const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const { itemId, grade, text } = req.body.params;
    const [, created] = await models.Review.findOrCreate({
      where: { userId, itemId },
      defaults: { grade, text }
    });
    if (!created) throw "already reviewed"
    res.send("success");
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
