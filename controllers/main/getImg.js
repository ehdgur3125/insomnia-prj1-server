const fs = require("fs");

module.exports = (req, res) => {
  try {
    if (req.params.size === 'small') {
      fs.readFile(
        `${__dirname}/../../img/${req.params.size}/${req.params.item}.png`,
        (err, data) => {
          if (err) {
            fs.readFile(
              `${__dirname}/../../img/${req.params.size}/${req.params.item}.jpg`,
              (err, data) => {
                if (err) {
                  throw err;
                }
                res.set("Content-Security-Policy", "img-src *");
                res.end(data);
              }
            );
            return;
          }
          res.set("Content-Security-Policy", "img-src *");
          res.end(data);
        }
      );
    }
    else {
      if (req.params.size && req.params) {
        if (req.params.img) {
          fs.readFile(
            `${__dirname}/../../img/${req.params.size}/${req.params.item}/${req.params.img}`,
            (err, data) => {
              if (err) {
                throw err;
              }
              res.set("Content-Security-Policy", "img-src *");
              res.end(data);
            }
          );
        }
        else {
          fs.readdir(`${__dirname}/../../img/${req.params.size}/${req.params.item}`,
            (err, data) => {
              if (err) {
                throw err;
              }
              res.send(data);
            }
          );
        }
      }
      else {
        fs.readFile(
          `${__dirname}/../../img/${req.params.img}`,
          (err, data) => {
            if (err) {
              throw err;
            }
            res.set("Content-Security-Policy", "img-src *");
            res.end(data);
          }
        );
      }
    }
  }
  catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
