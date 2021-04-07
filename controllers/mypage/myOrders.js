const models=require('../../models');
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    const orders=await models.Order.findAll({
      where:{
        userId,
        state:{
          [models.Sequelize.Op.ne]:'inCart'
        }
      },
      attributes:["state","id","createdAt"],
      include:models.ListItem
    });
    res.send({
      orders:orders.map(order=>{
        return {
          orderId:order.id,
          state:order.state,
          createdAt:order.createdAt,
          total:order.ListItems.reduce((acc,listItem)=>acc+listItem.price*listItem.quantity,0)
        }
      })
    });
  }
  catch(e){
    if(e.name==='TokenExpiredError') res.status(401).send(e);
    else res.status(400).send(e);
  }
}