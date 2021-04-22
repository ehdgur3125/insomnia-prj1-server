const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const [, created] = await models.Like.findOrCreate({
      where: {
        userId,
        itemId: req.body.params.itemId,
      },
    });
    if (!created) throw "Already like";
    res.send("success");
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
