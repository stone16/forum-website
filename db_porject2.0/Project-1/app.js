var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('path'));
var fs = require('fs');

var get = require('./controller/GetRouter.js');
var post = require('./controller/PostRouter.js');
// Show the general information of the visit to the website//



// view engine setup
app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);



app.use(function(req, res, next){
    console.log('method is %s, url is %s, path is %s', req.method, req.url, req.path);
    next();
});
app.use('/path', express.static('path'));
// Show the main page of the website //
app.get('/', function(req, res){
    res.sendFile('C:/study/database/Project/path/init.html');
});

// Response to request //
app.use('/', get);
app.use('/', post);

// Create the server //
var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});