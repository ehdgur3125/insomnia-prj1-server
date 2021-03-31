module.exports={
  categories:require('./main/categories'),
  items:require('./main/items'),
  item:require('./main/item'),
  search:require('./main/search'),
  bestSellers:require('./main/bestSellers'),

  postCart:require('./cart/postCart'),
  patchCart:require('./cart/patchCart'),
  deleteCart:require('./cart/deleteCart'),
  purchase:require('./cart/purchase'),

  getMyInfo:require('./mypage/getMyInfo'),
  myOrders:require('./mypage/myOrders'),
  myOrder:require('./mypage/myOrder'),
  patchMyInfo:require('./mypage/patchMyInfo'),

  login:require('./auth/login'),
  signup:require('./auth/signup')
}