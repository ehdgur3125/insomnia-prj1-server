const models=require('../../models');

module.exports=async(req,res)=>{
  try{
    const item=await models.Item.findByPk(req.params.itemId,{
      include:models.Option
    });
    res.send(item);
  }
  catch(e){
    res.status(400).send(e);
  }
}