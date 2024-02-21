const express = require('express');
const router = express.Router();
const main = require('../main');

var addreses = function () {
  router.route('/').get(function (req, res) {
    let query = {
      [main.address.code]: { $regex: req.query.val, $options: 'i' },
    };
    let sort = { [main.address.code]: 1 };
    if (req.query.fld === main.address.companyName) {
      query = {
        [main.address.companyName]: { $regex: req.query.val, $options: 'i' },
      };
      sort = { [main.address.companyName]: 1 };
    }
    if (req.query.fld === main.address.attention) {
      query = {
        [main.address.attention]: { $regex: req.query.val, $options: 'i' },
      };
      sort = { [main.address.attention]: 1 };
    }
    db.collection(main.dataNames.address)
      .find(query)
      .sort(sort)
      .toArray((error, result) => {
        if (error) {
          return res.status(500).send(error);
        }
        if (result.length > 0) {
          res.status(200).send(result);
        }
      });
  });
  return router;
};

module.exports = addreses;
