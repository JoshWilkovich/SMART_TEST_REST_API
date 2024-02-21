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
              {
                [main.account.code]: { $regex: req.query.code, $options: 'i' },
              },
              {
                [main.account.name]: { $regex: req.query.code, $options: 'i' },
              },
            ],
          },
          { [main.account.level]: req.query.lvl },
        ],
      })
      .sort({ [main.account.code]: 1 })
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

// let data = [
//   {
//     Account_Number: 1111,
//     Account_Name: '1111',
//   },
//   { Account_Number: 2222, Account_Name: '2222' },
// ];

// var accounts = function () {
//   router.route('/').get(function (req, res) {
//     if (req.query.code.length > 3) {
//       res.status(200).send(data);
//     } else {
//       res.status(404).send(empty);
//     }
//   });
//   return router;
// };

module.exports = accounts;
