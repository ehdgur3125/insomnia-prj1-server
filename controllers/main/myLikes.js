const models=require('../../models');
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    const myLikes=await models.User.findByPk(userId,{
      include:{
        model:models.Item,
        attributes:['name']
      }
    });    
    res.send({
      items:myLikes.map(x=>x.Item.name)
    });
  }
  catch(e){
    res.status(400).send(e);
  }
}