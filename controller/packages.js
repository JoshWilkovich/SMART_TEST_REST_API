const express = require('express');
const router = express.Router();
const main = require('../main');
const empty = {
  isSuccess: false,
  statusMessage: 'Shipment not found',
};

var packages = function () {
  router.route('/').get(function (req, res) {
    console.log(req.query.val);
    let query = {
      [main.package.packageId]: { $regex: req.query.val, $options: 'i' },
    };
    db.collection(main.dataNames.package)
      .find(query)
      .toArray((error, result) => {
        if (error) {
          return res.status(500).send(error);
        }
        if (result.length > 0) {
          res.status(200).send(result);
        } else {
          res.status(200).send(empty);
        }
      });
  });
  return router;
};

module.exports = packages;
