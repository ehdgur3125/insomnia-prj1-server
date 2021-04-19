const models = require("../../models");
const axios = require('axios');

module.exports = async (req, res) => {
  const { orderId } = req.body.params;
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    res.send({
      orderId: orderId,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
