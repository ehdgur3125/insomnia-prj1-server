module.exports = {
  categories: require("./main/categories"),
  items: require("./main/items"),
  item: require("./main/item"),
  search: require("./main/search"),
  postLike: require("./main/postLike"),
  deleteLike: require("./main/deleteLike"),
  postReview: require("./main/postReview"),
  patchReview: require("./main/patchReview"),
  getReviews: require("./main/getReviews"),
  myLikes: require("./main/myLikes"),

  getCart: require("./cart/getCart"),
  postCart: require("./cart/postCart"),
  patchCart: require("./cart/patchCart"),
  deleteCart: require("./cart/deleteCart"),
  purchase: require("./cart/purchase"),
  purchaseApproval: require("./cart/purchaseApproval"),
  purchaseFail: require("./cart/purchaseFail"),

  getMyInfo: require("./mypage/getMyInfo"),
  myOrders: require("./mypage/myOrders"),
  myOrder: require("./mypage/myOrder"),
  patchMyInfo: require("./mypage/patchMyInfo"),

  login: require("./auth/login"),
  signup: require("./auth/signup"),
  refresh: require("./auth/refresh"),

  getImg: require("./main/getImg"),
};
