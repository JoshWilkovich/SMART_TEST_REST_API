const express = require('express');
const router = express.Router();
const main = require('../main');

var addreses = function () {
  router.route('/').get(function (req, res) {
    let query = {
      [main.address.code]: { $regex: req.query.val, $options: 'i' },
    };
    if (req.query.fld === main.address.companyName)
      query = {
        [main.address.companyName]: { $regex: req.query.val, $options: 'i' },
      };
    if (req.query.fld === main.address.attention)
      query = {
        [main.address.attention]: { $regex: req.query.val, $options: 'i' },
      };
    db.collection(main.dataNames.address)
      .find(query)
      .toArray((error, result) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.send(result);
      });
  });
  return router;
};

module.exports = addreses;
