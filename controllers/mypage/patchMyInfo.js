const models=require('../../models');
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    const newData={};
    if(req.body.email) newData.email=req.body.email;
    if(req.body.phone) newData.email=req.body.phone;
    if(req.body.address) newData.email=req.body.address;
    await models.User.update(newData,{
      id:userId
    });
    res.send('success');
  }
  catch(e){
    res.status(400).send(e);
  }
}