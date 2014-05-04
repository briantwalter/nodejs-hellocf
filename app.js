//
// app.js  	Hello CF
// version	0.0.1 
// author	Brian Walter @briantwalter
// description	Hello world like application 
//		for Cloud Foundry
//

// variables
var os = require("os");
var express = require('express');
var port = '8800';
var title = "Hello Cloud Foundry";
var hellomsg = "Hello CF";
var myipaddr = "BLANK";

// start daemon process
//require('daemon');
//console.log("Daemon started with PID: " + process.pid);

// functions
// get local machine's IPv4 addresses
function getipaddr() {
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (i in interfaces) {
      for (i2 in interfaces[i]) {
          var address = interfaces[i][i2];
          if (address.family == 'IPv4' && !address.internal) {
              addresses.push(address.address)
          }
      }
  }
  //console.log("DEBUG: IPv4 addrs are " + addresses);
  return addresses;
}

// main
var app = express();
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(express.static(__dirname + '/public'))
app.use(express.errorHandler());

// create and display the page if requested
app.get('/', function(req, res) {
  var myipaddr = getipaddr();
  res.render('index',
    { title: title, hellomsg: hellomsg, myipaddr: myipaddr }
  )
})

// start the http server
app.listen(port)
