const models=require("../../models");
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    const [,cart]=await models.Order.findOrCreate({
      where:{
        userId:userId,
        state:"inCart"
      }
    });
    if(!cart || Object.keys(cart).length===0) throw "unpredicted error";
    await models.ListItem.delete({
      where:{
        orderId:cart.id,
        optionId:req.params.optionId
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