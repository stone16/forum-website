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


router.get('/', function(req, res){
    res.redirect('./path/init.html');
});

router.get('/getpost', function(req, res) {
    var  userAddSql = 'select p.content as content,p.title as title,u.name as name,u.present_level as level from post p,users u where p.id=? and p.author=u.id';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	var a=JSON.stringify(rows);
	res.render('getpost', {allrows:a});
	});
})

router.get('/getuser', function(req, res) {
    
	var  userAddSql = 'select u.id as userid,p.title as title,p.id as postid,p.present_time as time,u.name as author, u.present_level as level from post p,users u where p.author=u.id and u.id=? order by p.present_time DESC';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	var a=JSON.stringify(rows);
  res.render('getuser', {allrows:a});
});
})

router.get('/getallpost', function(req, res) {
	var  userAddSql = 'select u2.id as presentuserid, u2.name as presentusername, u2.present_level as presentuserlevel,u1.id as userid,p.title as title,p.id as postid,p.present_time as time,u1.name as author from post p,users u1,users u2 where u2.id=? and p.author=u1.id and p.valid=true order by p.isTop DESC,p.present_time DESC';
	var userParam=[req.cookies["id"]];
	connection.query(userAddSql,userParam,function (err, rows, fields) {
	if (err) {
		 console.log('[query] - :'+err);
	return;
	} 
	if(rows.length===0)
	{
		res.redirect('/guesttrytouser.html');
	}
	else
	{
		var a=JSON.stringify(rows);
		res.render('usermainpage', {allrows:a});		
	}

	}); 
})

router.get('/guestvisit', function(req, res) {
    var  userAddSql = 'select p.title as title,p.id as postid,p.present_time as time,u.name as author from post p,users u where p.author=u.id and p.valid=true order by p.isTop DESC,p.present_time DESC';
	connection.query(userAddSql,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	var a=JSON.stringify(rows);
  res.render('guestmainpage', {allrows:a});
});
})

router.get('/userselfpost', function(req, res) {
    
	var  userAddSql = 'select u.id as userid,u.name as username,p.title as title,p.id as postid,p.present_time as time, u.present_level as userlevel from post p,users u where p.author=u.id and u.id=? and p.valid=true order by p.present_time DESC';
	var user_param = [req.cookies["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 	 if(rows.length===0)
	 {
		 var sql='select name as username,present_level as userlevel from users where id=?'
		 var param=[req.cookies["id"]];
		 connection.query(sql,param,function (err, rows, fields) {
		if (err) {
             console.log('[query] - :'+err);
        return;
		} 
				var a=JSON.stringify(rows);
		res.render('userselfpost', {allrows:a});
		 });
	 }
	 else
	 {
	var a=JSON.stringify(rows);
	res.render('userselfpost', {allrows:a});
	 }
});
})

router.get('/deletepost', function(req, res) {
    
	var  userAddSql = 'update post set valid=false where id=?';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/userselfpost');
});
})

router.get('/userselfmessage', function(req, res) {
    
	var  userAddSql = 'select u2.name as username,u2.present_level as userlevel,u1.name as sendername,m.present_time as time,u1.id as senderid,m.content as content,m.id as messageid from users u1,users u2,messages m where m.sender=u1.id and m.receiver=u2.id and u2.id=? order by m.present_time DESC';
	var user_param = [req.cookies["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 if(rows.length===0)
	 {
		 var sql='select name as username,present_level as userlevel from users where id=?'
		 var param=[req.cookies["id"]];
		 connection.query(sql,param,function (err, rows, fields) {
		if (err) {
             console.log('[query] - :'+err);
        return;
		} 
				var a=JSON.stringify(rows);
		res.render('userselfmessage', {allrows:a});
		 });
	 }
	 else
	 {
		var a=JSON.stringify(rows);
		res.render('userselfmessage', {allrows:a});
	 }

});
})

router.get('/deletemessage', function(req, res) {
    
	var  userAddSql = 'delete from messages where id=?';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/userselfmessage');
});
})

router.get('/addfriendrequest', function(req, res) {
    
	var  userAddSql = 'insert into request(request_type,isSentFrom,isJudgedBy) values(?,?,?)';
	var user_param = ["FriendApp",req.cookies["id"],req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 var url="/getuser?id="+req.query["id"];
	res.redirect(url);
});
})

router.get('/friendrequest', function(req, res) {
	var  userAddSql = 'select u1.name as username,u1.present_level as userlevel,r.present_time as time,u2.name as sendername,u2.id as senderid,r.id as requestid from users u1,users u2,request r where u1.id=? and r.isSentFrom=u2.id and r.isJudgedBy=u1.id order by r.present_time DESC';
	var user_param = [req.cookies['id']];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 	 if(rows.length===0)
	 {
		 var sql='select name as username,present_level as userlevel from users where id=?'
		 var param=[req.cookies["id"]];
		 connection.query(sql,param,function (err, rows, fields) {
		if (err) {
             console.log('[query] - :'+err);
        return;
		} 
				var a=JSON.stringify(rows);
		res.render('friendrequest', {allrows:a});
		 });
	 }
	 else
	 {
	var a=JSON.stringify(rows);
	res.render('friendrequest', {allrows:a});
	 }
});
})

router.get('/deleterequest', function(req, res) {
    
	var  userAddSql = 'delete from request where id=?';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/friendrequest');
});
})

router.get('/acceptrequest', function(req, res) {
    
	var  userAddSql = 'delete from request where isSentFrom=? and isJudgedBy=?';
	var user_param = [req.query["id"],req.cookies["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 
	var  userAddSql = 'insert into user_friend(users,friend) values(?,?),(?,?)';
	var user_param = [req.query["id"],req.cookies["id"],req.cookies["id"],req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/friendrequest');
});

});
})

router.get('/userfriend', function(req, res) {
    
	var  userAddSql = 'select u1.name as username,u1.present_level as userlevel,u1.id as userid,u2.name as friendname,u2.id as friendid from users u1,users u2,user_friend f where u1.id=? and f.users=u1.id and f.friend=u2.id';
	var user_param = [req.cookies["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	 	 if(rows.length===0)
	 {
		 var sql='select name as username,present_level as userlevel from users where id=?'
		 var param=[req.cookies["id"]];
		 connection.query(sql,param,function (err, rows, fields) {
		if (err) {
             console.log('[query] - :'+err);
        return;
		} 
				var a=JSON.stringify(rows);
		res.render('userfriend', {allrows:a});
		 });
	 }
	 else
	 {
	var a=JSON.stringify(rows);
	res.render('userfriend', {allrows:a});
	 }
});
})

router.get('/deletefriend', function(req, res) {
    
	var  userAddSql = 'delete from user_friend where (users=? and friend=?) or (friend=? and users=?)';
	var user_param = [req.cookies["id"],req.query["id"],req.cookies["id"],req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/userfriend');
});
})

router.get('/applytosteward', function(req, res) {
    
	var  userAddSql = 'update users set requesttosteward=true where id=?';
	var user_param = [req.cookies["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/getallpost');
});
})

router.get('/stewardmainpage', function(req, res) {
	var  userAddSql = 'select u2.name as presentusername,u1.id as userid,p.title as title,p.id as postid,p.valid as valid,p.isTop as isTop,p.present_time as time,u1.name as author from post p,users u1,users u2 where u2.id=? and p.author=u1.id order by p.isTop DESC,p.present_time DESC';
	var userParam=[req.cookies["id"]];
	connection.query(userAddSql,userParam,function (err, rows, fields) {
	if (err) {
		 console.log('[query] - :'+err);
	return;
	} 
	if(rows.length===0)
	 {
		 var sql='select name as username,present_level as userlevel from users where id=?'
		 var param=[req.cookies["id"]];
		 connection.query(sql,param,function (err, rows, fields) {
		if (err) {
             console.log('[query] - :'+err);
        return;
		} 
				var a=JSON.stringify(rows);
		res.render('stewardmainpage', {allrows:a});
		 });
	 }
	 else
	 {
	var a=JSON.stringify(rows);
	res.render('stewardmainpage', {allrows:a});
	 }
	}); 
})

router.get('/stewarduserpage', function(req, res) {
	var  userAddSql = 'select u2.name as presentusername,u1.id as userid,u1.valid as valid,u1.name as username,u1.present_level as level from users u1,users u2 where u2.id=? and u1.issteward=false and u1.isadmin=false';
	var userParam=[req.cookies["id"]];
	connection.query(userAddSql,userParam,function (err, rows, fields) {
	if (err) {
		 console.log('[query] - :'+err);
	return;
	} 
	if(rows.length===0)
	 {
		 var sql='select name as username,present_level as userlevel from users where id=?'
		 var param=[req.cookies["id"]];
		 connection.query(sql,param,function (err, rows, fields) {
		if (err) {
             console.log('[query] - :'+err);
        return;
		} 
				var a=JSON.stringify(rows);
		res.render('stewarduserpage', {allrows:a});
		 });
	 }
	 else
	 {
	var a=JSON.stringify(rows);
	res.render('stewarduserpage', {allrows:a});
	 }
	}); 
})

router.get('/stewarddeletepost', function(req, res) {
    
	var  userAddSql = 'update post set valid=false where id=?';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/stewardmainpage');
});
})

router.get('/stewardrecoverpost', function(req, res) {
    
	var  userAddSql = 'update post set valid=true where id=?';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/stewardmainpage');
});
})

router.get('/stewardsettoppost', function(req, res) {
    
	var  userAddSql = 'update post set isTop=true where id=?';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/stewardmainpage');
});
})

router.get('/stewardcanceltoppost', function(req, res) {
    
	var  userAddSql = 'update post set isTop=false where id=?';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/stewardmainpage');
});
})

router.get('/stewardinvaliduser', function(req, res) {
    
	var  userAddSql = 'update users set valid=false where id=?';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/stewarduserpage');
});
})

router.get('/stewardrecoveruser', function(req, res) {
    
	var  userAddSql = 'update users set valid=true where id=?';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/stewarduserpage');
});
})

router.get('/upgradeuser', function(req, res) {
    
	var  userAddSql = 'update users set present_level=present_level+1 where id=?';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/stewarduserpage');
});
})

router.get('/downgradeuser', function(req, res) {
    
	var  userAddSql = 'update users set present_level=present_level-1 where id=?';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/stewarduserpage');
});
})

router.get('/adminmainpage', function(req, res) {
	var  userAddSql = 'select u2.name as presentusername,u1.id as userid,u1.name as username,u1.isSteward as issteward,u1.requesttosteward as requesttosteward from users u1,users u2 where u2.id=? and u1.isadmin=false';
	var userParam=[req.cookies["id"]];
	connection.query(userAddSql,userParam,function (err, rows, fields) {
	if (err) {
		 console.log('[query] - :'+err);
	return;
	} 
	var a=JSON.stringify(rows);
	res.render('adminmainpage', {allrows:a});
	}); 
})

router.get('/cancelsteward', function(req, res) {
    
	var  userAddSql = 'update users set issteward=false where id=?';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/adminmainpage');
});
})

router.get('/agreesteward', function(req, res) {
    
	var  userAddSql = 'update users set issteward=true,requesttosteward=false where id=?';
	var user_param = [req.query["id"]];
	connection.query(userAddSql,user_param,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     } 
	res.redirect('/adminmainpage');
});
})

module.exports = router;