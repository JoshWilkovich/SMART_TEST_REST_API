const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const apps = express();
const port = process.env.port || 1337;
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const account = require('./controller/accounts');
const address = require('./controller/addresses');
const package = require('./controller/packages');
const afterProcess = require('./controller/after_process');
const afterVoid = require('./controller/after_void');
const wtsPost = require('./controller/wtspostdata');

let config = {
  url: 'mongodb+srv://dbUser:Quadient1234@pro-services-test.a6ybx.mongodb.net/test',
  dbName: 'SMART_RTI',
};

// COLLECTION LAYOUTS
exports.dataNames = {
  account: 'Accounts',
  address: 'Addresses',
  package: 'Packages',
  shipment: 'Shipments',
  void: 'Cancels',
  wts: 'wts_test',
};

exports.account = {
  code: 'Account_Number', // REQUIRED
  name: 'Account_Name', // REQUIRED
  level: 'Account_Level', // REQUIRED
};

exports.address = {
  code: 'ID', // Lookup Column - REQUIRED
  companyName: 'Company', // Lookup Column - REQUIRED
  attention: 'Attention', // Lookup Column - REQUIRED
};

exports.package = {
  packageId: 'Order_Num', // Lookup Field - REQUIRED
};

apps.use(bodyParser.json());
apps.use('/accounts', account());
apps.use('/addresses', address());
apps.use('/packages', package());
apps.use('/shipment', afterProcess());
apps.use('/void', afterVoid());
apps.use('/wtspost', wtsPost());

apps.listen(port, async function () {
  await MongoClient.connect(
    config.url,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db(config.dbName);
      console.log('Connected to `' + config.dbName + '`!');
    }
  );
  console.log(`Server runnning on Port:- ${port} Started at : ${new Date()}`);
});
