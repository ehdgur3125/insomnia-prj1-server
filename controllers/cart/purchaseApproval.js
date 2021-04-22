const models = require("../../models");
const axios = require('axios');

module.exports = async (req, res) => {
  const { paymentKey, orderId, amount } = req.body.params;
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const t = await models.sequelize.transaction();
    try {
      const order = await models.Order.findOne({
        where: {
          id: orderId.split('_')[2]
        },
        include: {
          model: models.ListItem,
        },
      });
      if (order.state !== 'inCart') throw 'not inCart Order';
      if (order.userId !== userId) throw 'Invalid access';
      if (order.ListItems.reduce(
        (acc, listItem) => acc + listItem.quantity * listItem.price,
        0
      ) !== Number(amount)) throw 'different total pay';
      const toss = await axios.post(`https://api.tosspayments.com/v1/payments/${paymentKey}`, {
        orderId,
        amount
      }, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.TOSS_API_KEY}:`).toString('base64')}`,
          "Content-Type": "application/json"
        }
      });
      await models.Order.update(
        {
          state: "payed"
        },
        {
          where: {
            id: orderId.split('_')[2]
          },
        }
      );
      res.send({
        orderId: order.id,
        total: order.ListItems.reduce(
          (acc, listItem) => acc + listItem.quantity * listItem.price,
          0
        ),
      });
      t.commit();
    }
    catch (e) {
      t.rollback();
      throw e;
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
