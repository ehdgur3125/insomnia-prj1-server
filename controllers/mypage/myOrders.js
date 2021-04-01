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
      attributes:["state","id","createdAt"] //price 추가해야함
    });
    res.send(orders);
  }
  catch(e){
    res.status(400).send(e);
  }
}