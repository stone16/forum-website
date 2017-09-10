var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('path'));
app.use('/path', express.static('path'));

// Response to request //
var get=require('./controller/GetRouter.js');
var post=require('./controller/PostRouter.js')
app.use('/', get);
app.use('/', post);

// view engine setup
app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

// Create the server //
var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});