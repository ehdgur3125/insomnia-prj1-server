const models=require('../../models');
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    const order=await models.Order.findByPk(req.params.orderId);
    if(order.userId!==userId) throw 'invalid access';
    res.send(order);//totalPrice 추가해야함
  }
  catch(e){
    res.status(400).send(e);
  }
}