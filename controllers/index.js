module.exports={
  categories:require('./main/categories'),
  items:require('./main/items'),
  item:require('./main/item'),
  search:require('./main/search'),
  postLike:require('./main/postLike'),
  deleteLike:require('./main/deleteLike'),
  myLikes:require('./main/myLikes'),

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