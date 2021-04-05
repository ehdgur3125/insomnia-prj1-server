const models=require("../../models");
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    if(!req.body.address||!req.body.phone||!req.body.account) throw "more informations necessary";
    const order=await models.Order.findOne({
      where:{
        state:'inCart',
        userId
      },
      attributes:[["id","orderId"]],
      include:{
        model:models.ListItem
      }
    });
    await models.Order.update({
      state:'payed',
      address:req.body.address,
      phone:req.body.phone,
      account:req.body.account
    },{
      where:{
        userId:userId,
        state:'inCart'
      }
    });
    res.send({
      orderId:order.orderId,
      total:order.ListItems.reduce((acc,listItem)=>acc+listItem.quantity*listItem.price,0)
    });
  }
  catch(e){
    console.log(e);
    res.status(400).send(e);
  }
}