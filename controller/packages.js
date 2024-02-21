const express = require('express');
const router = express.Router();
const main = require('../main');

var packages = function () {
  router.route('/').get(function (req, res) {
    let query = {
      [main.package.packageId]: { $regex: req.query.val, $options: 'i' },
    };
    db.collection(main.dataNames.package)
      .find(query)
      .sort({ [main.package.packageId]: 1 })
      .toArray((error, result) => {
        if (error) {
          return res.status(500).send(error);
        }
        if (result.length > 0) {
          res.status(200).send([result[0]]);
        }
      });
  });
  return router;
};

module.exports = packages;
