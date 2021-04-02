const models=require('../../models');
const passwordHash=require('password-hash');

module.exports=async(req,res)=>{
  if(!req.body.username || !req.body.password || !req.body.email ||
    !req.body.phone || !req.body.address){
    res.status(400).send('항목이 부족합니다.');
    return;
  }
  console.log(req.body);
  const hashed= passwordHash.generate(req.body.password);
  try{
    const [user, created]=await models.User.findOrCreate({
      where:{
        [models.Sequelize.Op.or]:[{
          username:req.body.username
        },{
          email:req.body.email
        }]
      },
      defaults:{      
        username: req.body.username,
        password: hashed,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
      }
    });
    if(!created){
      if(user.username===req.body.username){
        res.status(400).send('이미 가입된 이름입니다.');
        return;
      }
      if(user.email===req.body.email){
        res.status(400).send('이미 가입된 이메일입니다.');
        return;
      }
    }
    res.send('success');
  }
  catch(e){
    res.status(400).send(e);
  }
}