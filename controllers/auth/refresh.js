const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { userId } = jwt.verify(
    req.cookies.refreshToken,
    process.env.REFSALT
  );
  console.log(userId);
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
  res.cookie("refreshToken", refreshToken, {
    maxAge: 12 * 60 * 60 * 1000
  });
  res.send({
    token: accessToken,
    csrf: null,
  });
};
