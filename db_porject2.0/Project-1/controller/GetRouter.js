var express = require('express');
var router = express.Router();
//var shishi = require('../try.js')



var mysql  = require('mysql');  //调用MySQL模块
//创建一个connection
var connection = mysql.createConnection({     
  user     : 'root',               //MySQL认证用户名
  password : '686933',        //MySQL认证用户密码
  port: '3306',                   //端口号
  database: 'project'
}); 
exports.connection=connection;
//创建一个connection
connection.connect(function(err){
    if(err){        
          console.log('[query] - :'+err);
        return;
    }
      console.log('[connection connect]  succeed!');
});  


	 
	router.use('/path/get', function(req, res, next){
    next();
});



router.get('/path/get', function(req, res){

var  userAddSql = 'select * from post where id=? order by isTop DESC,present_time DESC';
var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 res.send(rows)
});
	 
	 
	 });
	 

//begin

router.get('/getpost', function(req, res) {
    var  userAddSql = 'select * from post where id=? and valid=1 order by isTop DESC,present_time DESC';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
  res.render('index', {title:rows[0]["title"],id:rows[0]["author"],content:rows[0]["content"]});
});
})
//end

//begin

router.get('/getuser', function(req, res) {
    
	var  userAddSql = 'select u.id as userid,u.issteward as status,p.title as title,p.id as postid,p.present_time as time,u.name as author, u.present_level as level from post p,users u where p.author=u.id and u.id=? order by p.present_time DESC';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	var a=JSON.stringify(rows);
  res.render('getuser', {nimaa:a});
});
})
//end

//begin

router.get('/getusermessage', function(req, res) {
    
	var  userAddSql = 'select u1.present_level as level,u1.issteward as status,m.present_time as time,m.receiver as receiverid,m.sender as senderid,m.content as content,u1.name as receivername,u2.name as sendername from messages m,users u1,users u2 where m.receiver=? and m.receiver=u1.id and m.sender=u2.id order by m.present_time DESC';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	var a=JSON.stringify(rows);
  res.render('getusermessage', {message:a});
});
})
//end

//begin

router.get('/getallpost', function(req, res) {
    var  userAddSql = 'select u.id as userid,p.title as title,p.id as postid,p.present_time as time,u.name as author from post p,users u where p.author=u.id and p.valid=true order by p.isTop DESC,p.present_time DESC';
	connection.query(userAddSql,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	var a=JSON.stringify(rows);
  res.render('mainpage', {nimaa:a});
});
})
//end

//begin

router.get('/guestvisit', function(req, res) {
    var  userAddSql = 'select p.title as title,p.id as postid,p.present_time as time,u.name as author from post p,users u where p.author=u.id order by p.isTop DESC,p.present_time DESC';
	connection.query(userAddSql,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	var a=JSON.stringify(rows);
  res.render('guestmainpage', {nimaa:a});
});
})
//end


module.exports = router;