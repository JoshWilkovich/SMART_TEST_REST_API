const express = require('express');
const router = express.Router();
const main = require('../main');

var afterProcess = function () {
  router.route('/').post(function (req, res) {
    db.collection(main.dataNames.shipment).insertMany(
      req.body,
      (error, result) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.status(200).send(result);
      }
    );
  });
  return router;
};
module.exports = afterProcess;
