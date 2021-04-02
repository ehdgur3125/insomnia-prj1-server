const models=require("../../models");
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    const cart=await models.Order.findOne({
      where:{
        userId:userId,
        state:"inCart"
      }
    });
    if(!cart || Object.keys(cart).length===0) throw "unpredicted error";
    await models.ListItem.update({
        quantity:req.body.quantity
      },{
      where:{
        orderId:cart.id,
        optionId:req.body.optionId
      }
    });
    res.send({
      message:'success'
    });
  }
  catch(e){
    res.status(400).send(e);
  }
}