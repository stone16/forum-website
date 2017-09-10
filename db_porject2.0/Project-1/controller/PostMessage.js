var express = require('express');
var router = express.Router();

router.use('/message/post', function(req, res, next){
    console.log(req.query);
    /**
     * 
     */
    next();
});

router.post('/message/post', function(req, res){
    res.send('<h1>Get message<h1>'); // send pages //
});

module.exports = router;