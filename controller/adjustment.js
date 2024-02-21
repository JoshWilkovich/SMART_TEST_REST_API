const express = require('express');
const router = express.Router();
const main = require('../main');

var afterAdjust = function () {
  router.route('/').post(function (req, res) {
    console.log(req.body);
    res.status(200).send();
  });
  return router;
};

// var afterProcess = function () {
//   router.route('/').post(function (req, res) {
//     db.collection(main.dataNames.shipment).insertMany(
//       req.body,
//       (error, result) => {
//         if (error) {
//           return res.status(500).send(error);
//         }
//         result = { ...result, status: 200 };
//         res.status(200).send(result);
//       }
//     );
//   });
//   return router;
// };

module.exports = afterAdjust;
