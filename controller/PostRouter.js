var express = require('express');
var router = express.Router();

var mysql  = require('mysql');  //调用MySQL模块
//创建一个connection
var connection = mysql.createConnection({     
  user     : 'root',               //MySQL认证用户名
  password : 'Abc.1234',        //MySQL认证用户密码
  port: '3306',                   //端口号
  database: 'project'
}); 

router.post('/checkpass', function(req, res){
	var  userAddSql = 'select id,password,issteward,isadmin from users where username=?';
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
			 res.cookie('id',rows[0]['id']);
			 if(rows[0]["isadmin"])
			 {
				 res.redirect("/adminsuccess.html");
			 }
			 else if(rows[0]["issteward"])
			 {
				 res.redirect("/stewardsuccess.html");
			 }
			 else
			 {
				 res.redirect("/success.html");
			 } 
		 }
		 else
		 {
			 res.redirect("/passwrong.html");
		 }
	 }
	 else
	 {
		 res.redirect("/path/nouser.html");
	 }
});
	
});

router.post('/checksign', function(req, res){
	if(req.body["password"] === req.body["confirm"])
	{
		if(req.body["password"] === "")
			res.redirect("/path/passnotequal.html");
		else
		{
			var  userAddSql = 'insert into users (name,username,password) values("noname",?,?)';
			var user_param = [req.body["username"],req.body["password"]];
			connection.query(userAddSql,user_param,function (err, rows, fields) {
			if (err) {
				console.log('[query] - :'+err);
				return;
			} 
			res.redirect("/login.html");
		});	
		}
	}
	else
	{
		res.redirect("/passnotequal.html");
	}
	
});

router.post('/postposts', function(req, res){
	if(req.body["title"] === "" || req.body["content"]=="")
	{
		res.redirect("/postwrong.html");
	}
	else
	{	

		var  userAddSql = 'select valid from users where id=?';
		var user_param = [req.cookies["id"]];
		connection.query(userAddSql,user_param,function (err, rows, fields) {
		if (err) {
			console.log('[query] - :'+err);
			return;
		} 
		if(rows[0]["valid"])
		{
			var  userAddSql = 'insert into post (author,title,content) values(?,?,?)';
			var user_param = [req.cookies["id"],req.body["title"],req.body["content"]];
			connection.query(userAddSql,user_param,function (err, rows, fields) {
			if (err) {
				console.log('[query] - :'+err);
				return;
			} 
		res.redirect("/getallpost");
		});	
		}
		else
		{
			res.redirect("/usernotvalid.html");
		}
		
		});


				
	}	
});

router.post('/changename', function(req, res){
	var  userAddSql = 'update users set name=? where id=?';
	var user_param = [req.body["newname"],req.cookies["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 res.redirect("/getallpost");
});
});

router.post('/changepass', function(req, res){
	
	var  userAddSql = 'select password from users where id=?';
	var user_param = [req.cookies["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 if(rows[0]["password"] === req.body["oldpass"])
	 {
		 if(req.body["newpass"] === req.body["confirmpass"])
		 {
			var  userAddSql = 'update users set password=? where id=?';
			var user_param = [req.body["newpass"],req.cookies["id"]];
			connection.query(userAddSql,user_param,function (err, rows, fields) {
			if (err) {
				console.log('[query] - :'+err);
				return;
			} 
				res.redirect("/getallpost");
			});
		 }	
		else
		{
			res.redirect("/path/changepassnotequal.html");
		}
	
	 }
	 else
	 {
		 res.redirect("/path/oldpasswrong.html");
	 }
	 
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
	 res.redirect("/getallpost");
});
});

router.post('/sendmessage', function(req, res){
	var  userAddSql = 'insert into messages(sender,receiver,content) values(?,?,?)';
	var user_param = [req.cookies["id"],req.query["id"],req.body["content"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 var url='getuser?id='+req.query["id"]
	 res.redirect(url);
});
});

module.exports = router;