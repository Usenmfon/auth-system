
const fs = require('fs')

exports.morganFormat = function (tokens, req, res) {
  return [
    tokens.date(req,res),'  ' ,
    tokens['remote-addr'](req,res),'::->' ,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}

exports.morganConfig = {
  skip: function (req, res) { return res.statusCode < 400 }
}