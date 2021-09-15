const express = require('express');
const router = express.Router();
const main = require('../main');

var accounts = function () {
  router.route('/').get(function (req, res) {
    db.collection(main.dataNames.account)
      .find({
        $and: [
          {
            $or: [
              { [main.account.code]: { $regex: req.query.val, $options: 'i' } },
              { [main.account.name]: { $regex: req.query.val, $options: 'i' } },
            ],
          },
          { [main.account.level]: req.query.lvl.toString() },
        ],
      })
      .toArray((error, result) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.send(result);
      });
  });
  return router;
};

module.exports = accounts;
