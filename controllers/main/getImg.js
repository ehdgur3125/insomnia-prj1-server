const fs = require("fs");

module.exports = (req, res) => {
  fs.readFile(
    `${__dirname}/../../img/${req.params.size}/${req.params.item}.png`,
    (err, data) => {
      if (err) {
        throw err;
      }
      res.set("Content-Security-Policy", "img-src *");
      res.type("image/png");
      res.end(data);
    }
  );
};