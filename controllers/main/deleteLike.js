const models = require("../../models");

module.exports = async (req, res) => {
  const userId = req.userId;
  if (userId < 0) throw "Invalid access";
  await models.Like.destroy({
    where: {
      userId,
      itemId: req.params.itemId,
    },
  });
  res.send("success");
};
