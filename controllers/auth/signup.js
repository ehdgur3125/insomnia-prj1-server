const models = require("../../models");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    if (
      !req.body.user.name ||
      !req.body.user.password ||
      !req.body.user.email ||
      !req.body.user.phone ||
      !req.body.user.address
    ) {
      res.status(400).send("항목이 부족합니다.");
      return;
    }
    if (!/^[A-Za-z]\w*@\w+.\w+$/.test(req.body.user.email)) {
      throw '이메일의 양식을 확인해주세요';
    }
    if (!/^\d{3}-\d{3,4}-\d{4}$/.test(req.body.user.phone)) {
      throw '전화번호의 양식을 확인해주세요';
    }
    const hashed = passwordHash.generate(req.body.user.password);
    const [user, created] = await models.User.findOrCreate({
      where: {
        [models.Sequelize.Op.or]: [
          {
            username: req.body.user.name,
          },
          {
            email: req.body.user.email,
          },
        ],
      },
      defaults: {
        username: req.body.user.name,
        password: hashed,
        email: req.body.user.email,
        phone: req.body.user.phone,
        address: req.body.user.address,
      },
    });
    if (!created) {
      if (user.username === req.body.user.name) {
        res.status(400).send("이미 가입된 이름입니다.");
        return;
      }
      if (user.email === req.body.user.email) {
        res.status(400).send("이미 가입된 이메일입니다.");
        return;
      }
      res.status(400).send("unexpected error");
      return;
    }
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
        userId: user.id,
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
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
