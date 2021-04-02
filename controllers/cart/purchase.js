const models=require("../../models");
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    await models.Order.update({
      state:'payed'
    },{
      where:{
        userId:userId,
        state:'inCart'
      }
    });
    res.send('success');
  }
  catch(e){
    res.status(400).send(e);
  }
}