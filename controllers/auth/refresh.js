const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    if (req.headers.origin !== "http://localhost:8080") throw 'not from insomenia'
    if (!req.cookies.refreshToken) throw 'no refresh token';
    const { userId } = jwt.verify(
      req.cookies.refreshToken,
      process.env.REFSALT
    );
    if (!userId) throw 'invalid userId ' + userId;
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
  }
  catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
