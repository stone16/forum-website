var express = require('express');
var router = express.Router();


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
 



router.use('/path/post', function(req, res, next){
    /**
     * the content of write to DB
     */
    next();
});
 
router.post('/checkpass', function(req, res){
	var  userAddSql = 'select password from users where username=?';
	var user_param = [req.body["username"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 if(rows.length)
	 {
		 if(rows[0]["password"] === req.body["password"])
		 {
			 res.redirect("http://localhost:3000/success.html");
		 }
		 else
		 {
			 res.redirect("http://localhost:3000/path/passwrong.html");
		 }
	 }
	 else
	 {
		 res.redirect("http://localhost:3000/path/nouser.html");
	 }
});
	
});

router.post('/checksign', function(req, res){
	if(req.body["password"] === req.body["confirm"])
	{
		if(req.body["password"] === "")
			res.redirect("http://localhost:3000/path/passnotequal.html");
		else
		{
			var  userAddSql = 'insert into users (name,username,password) values("noname",?,?)';
			var user_param = [req.body["username"],req.body["password"]];
			connection.query(userAddSql,user_param,function (err, rows, fields) {
			if (err) {
				console.log('[query] - :'+err);
				return;
			} 
			res.redirect("http://localhost:3000/success.html");
		});	
		}
	}
	else
	{
		res.redirect("http://localhost:3000/path/passnotequal.html");
	}
	
});

router.post('/postposts', function(req, res){
	if(req.body["title"] === "" || req.body["content"]==""||req.body["username"]=="")
	{
		res.redirect("http://localhost:3000/path/postwrong.html");
	}
	else
	{
		var  userAddSql = 'select id from users where username=?';
		var user_param = [req.body["username"]]; 
		connection.query(userAddSql,user_param,function (err, rows, fields) {
		if (err) {
			console.log('[query] - :'+err);
			return;
		} 
		
		var  userAddSql = 'insert into post (author,title,content) values(?,?,?)';
		var user_param = [rows[0]["id"],req.body["title"],req.body["content"]];
		connection.query(userAddSql,user_param,function (err, rows, fields) {
		if (err) {
			console.log('[query] - :'+err);
			return;
		} 
		res.redirect("http://localhost:3000/success.html");
		});
		});
		
		
			
	}
	
});

router.post('/changename', function(req, res){
	var  userAddSql = 'update users set name=? where username=?';
	var user_param = [req.body["newname"],req.body["username"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 res.redirect("http://localhost:3000/getallpost");
});
});

router.post('/changepass', function(req, res){
	var  userAddSql = 'update users set possword=? where username=?';
	var user_param = [req.body["password"],req.body["username"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 res.redirect("http://localhost:3000/getallpost");
});
});

router.post('/becomesteward', function(req, res){
	var  userAddSql = 'update users set issteward=true where username=?';
	var user_param = [req.body["username"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 res.redirect("http://localhost:3000/getallpost");
});
});

router.post('/deletepost', function(req, res){
	var  userAddSql = 'update post set valid=false where id=?';
	var user_param = [req.body["postid"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 res.redirect("http://localhost:3000/getallpost");
});
});

router.post('/settop', function(req, res){
	var  userAddSql = 'update post set istop=true where id=?';
	var user_param = [req.body["postid"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 res.redirect("http://localhost:3000/getallpost");
});
});

router.post('/recoverpost', function(req, res){
	var  userAddSql = 'update post set valid=true where id=?';
	var user_param = [req.body["postid"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 res.redirect("http://localhost:3000/getallpost");
});
});

router.post('/canceltop', function(req, res){
	var  userAddSql = 'update post set istop=false where id=?';
	var user_param = [req.body["postid"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 res.redirect("http://localhost:3000/getallpost");
});
});

router.post('/sendmessage', function(req, res){
	
	var  userAddSql = 'select id from users where username=?';
	var user_param = [req.body["sender"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 var sender=rows[0]["id"];
	 var  userAddSql = 'select id from users where username=?';
	var user_param = [req.body["receiver"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 var receiver=rows[0]["id"];
	 var  userAddSql = 'insert into messages(sender,receiver,content) values(?,?,?)';
	var user_param = [sender,receiver,req.body["content"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 res.redirect("http://localhost:3000/getallpost");
});
});
});	
});


module.exports = router;