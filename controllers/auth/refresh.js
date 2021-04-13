const models = require("../../models");
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");

module.exports = async (req, res) => {
  const { userId } = jwt.verify(
    req.cookies.refreshToken,
    process.env.REFSALT
  );
  const accessToken = jwt.sign(
    {
      userId,
    },
    process.env.ACCSALT,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    {
      userId,
    },
    process.env.REFSALT,
    {
      expiresIn: "12h",
    }
  );
  res.cookie("refreshToken", refreshToken);
  res.send({
    token: accessToken,
    csrf: null,
  });
};
