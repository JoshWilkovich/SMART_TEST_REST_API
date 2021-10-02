const express = require('express');
const router = express.Router();
const main = require('../main');

var afterVoid = function () {
  router.route('/').post(function (req, res) {
    console.log(req.body);
    db.collection(main.dataNames.void).insertOne(req.body, (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).send(result);
    });
  });
  return router;
};

module.exports = afterVoid;
