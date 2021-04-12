const models = require("../../models");
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");

module.exports = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        email: req.body.user.email,
      },
    });
    if (!user || Object.keys(user).length === 0) throw "no such user";
    const verify = passwordHash.verify(req.body.user.password, user.password);
    if (!verify) throw "wrong password";
    const accessToken = jwt.sign(
      {
        userId: user.id,
      },
      process.env.ACCSALT,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFSALT,
      {
        expiresIn: "12h",
      }
    );
    res.cookie("refreshToken", refreshToken);
    res.send({
      refreshToken,
      token: accessToken,
      csrf: null,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
