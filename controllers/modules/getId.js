const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const auth = req.headers["authorization"];
  try {
    if (auth === undefined) {
      throw "not authorized";
    }
    const { userId } = jwt.verify(auth.split(" ")[1], process.env.ACCSALT);
    req.userId = userId;
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      res.status(401).send(e);
      return;
    }
    if (e === 'not authorized') {
      req.userId = -1;
      next();
      return;
    }
    console.log(e.name);
    res.status(400).send(e);
  }
};
