const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/categories", controller.categories);
router.get("/items", controller.items);
router.get("/items/:categoryId", controller.items);
router.get("/item/:itemId", controller.item);
router.get("/search", controller.search);
router.post("/like", controller.postLike);
router.delete("/like/:itemId", controller.deleteLike);
router.post("/review", controller.postReview);
router.get("/mylikes", controller.myLikes);

router.get("/cart", controller.getCart);
router.post("/cart", controller.postCart);
router.patch("/cart", controller.patchCart);
router.delete("/cart/:optionId", controller.deleteCart);
router.post("/purchase", controller.purchase);

router.get("/myinfo", controller.getMyInfo);
router.get("/myorders", controller.myOrders);
router.get("/myorder/:orderId", controller.myOrder);
router.patch("/myinfo", controller.patchMyInfo);

router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.post("/token", controller.refresh);

router.get("/img/:size/:item", controller.getImg);

module.exports = router;
