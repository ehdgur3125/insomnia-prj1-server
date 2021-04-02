const models=require('../../models');

module.exports=async(req,res)=>{
  const items=await models.Item.findAll({
    where:{
      [models.Sequelize.Op.or]:[
        {
          name:{
            [models.Sequelize.Op.like]: `%${req.query}%`
          }
        },
        {
          text:{
            [models.Sequelize.Op.like]: `%${req.query}%`
          }
        }
      ]
    },
    include:models.Option
  })
  res.send('dummy');
}