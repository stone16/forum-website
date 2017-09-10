var express = require('express');
var router = express.Router();

router.use('/Message/get', function(req, res, next){
    console.log(req.query);
    /**
     * the content of DB query and HTML render
     */
    next();
});

router.get('/Message/get', function(req, res){
    res.send('<h1>Get Message<h1>'); // send pages //
});

module.exports = router;