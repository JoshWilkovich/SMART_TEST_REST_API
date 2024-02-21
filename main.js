const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const httpPort = process.env.port || 8080;
const https = require('https');
const httpsPort = process.env.port || 8443;

// Command to run this app
// node main.js

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const account = require('./controller/accounts');
const address = require('./controller/addresses');
const package = require('./controller/packages');
const afterProcess = require('./controller/after_process');
const afterAdjust = require('./controller/adjustment');
const afterVoid = require('./controller/after_void');

let config = {
  url: 'mongodb+srv://dbUser:Quadient1234@pro-services-test.a6ybx.mongodb.net/test?authSource=admin&replicaSet=atlas-7ir50o-shard-0&readPreference=primary&ssl=true',
  dbName: 'SMART_RTI',
};

// COLLECTION LAYOUTS
exports.dataNames = {
  account: 'Accounts',
  address: 'Addresses',
  package: 'Packages',
  shipment: 'Shipments',
  void: 'Cancels',
};

exports.account = {
  code: 'Account_Number', // REQUIRED
  name: 'Account_Name', // REQUIRED
  level: 'Account_Level',
};

exports.address = {
  code: 'ID', // Lookup Column - REQUIRED
  companyName: 'Company', // Lookup Column - REQUIRED
  attention: 'Attention', // Lookup Column - REQUIRED
};

exports.package = {
  packageId: 'Package_ID', // Lookup Field - REQUIRED
};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(app);

httpServer.listen(httpPort, mongoConnect(httpPort));
httpsServer.listen(httpsPort, mongoConnect(httpsPort));

async function mongoConnect(port) {
  MongoClient.connect(
    config.url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db(config.dbName);
      console.log('Connected to `' + config.dbName + '`!');
    }
  );
  console.log(`Server runnning on Port:- ${port} Started at : ${new Date()}`);
}

app.use(bodyParser.json());
app.use('/accounts', account());
app.use('/addresses', address());
app.use('/packages', package());
app.use('/shipment', afterProcess());
app.use('/adjustment', afterAdjust());
app.use('/void', afterVoid());
