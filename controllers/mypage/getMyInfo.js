const models=require('../../models');
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    const user=await models.User.findByPk(userId,{
      attributes:['email','address','phone']
    });
    res.send(user);
  }
  catch(e){
    console.log(e);
    res.status(400).send(e);
  }
}