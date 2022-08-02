require('dotenv').config();
var express = require('express');
const routes = require('./src/routes');
const cors = require('cors');
const morgan = require('morgan');
const { morganFormat, morganConfig } = require('./config/log');
const { handleGlobalError, renderResponse } = require('./src/middleware/global');


var app = express()
require('./config/db');
// require("./config/event")

app.use(morgan(morganFormat,morganConfig))
app.use(express.static('storage'));
app.use(cors())


app.use('/', routes,renderResponse)
app.use(handleGlobalError)


process.on('unhandledRejection', function(reason, p){
  console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

const port = process.env.PORT || 8000

var server = app.listen(
  port, function (err) {
    if (err) {
      console.log('error');
      return;
    }
    var host = server.address().address;
    var port = server.address().port;
    console.log('auth-backend listening at http://%s:%s', host, port);
  }
)


exports.app = app