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

//执行SQL语句

function add_users(name,username,user_password){
var  userAddSql = 'INSERT INTO users(name,present_level,username,password) VALUES(?,1,?,?)';
var  userAddSql_Params = [name,username,user_password];
connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
}); 
} 
exports.add_users=add_users;

function del_users(id){
	var  userAddSql = 'delete from users where id=?';
	var  userAddSql_Params = [id];
connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
}); 
}
exports.del_users=del_users;

function changename_users(id,newname){
	var  userAddSql = 'update users set name=? where id=?';
	var  userAddSql_Params = [newname,id];
connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
}); 
}
exports.changename_users=changename_users;

function add_userfriend(usersId,friendId){
var  userAddSql = 'INSERT INTO user_friend(users,friend) VALUES(?,?)';
var  userAddSql_Params = [usersId,friendId];
connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
});
var  userAddSql = 'INSERT INTO user_friend(users,friend) VALUES(?,?)';
var  userAddSql_Params = [friendId,usersId];
connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
}); 
} 
exports.add_userfriend=add_userfriend;

function del_userfriend(usersId,friendId){
var  userAddSql = 'delete from user_friend where users=? and friend=?';
var  userAddSql_Params = [usersId,friendId];
connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
var  userAddSql = 'delete from user_friend where users=? and friend=?';
var  userAddSql_Params = [friendId,usersId];
connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
}); 
} 
exports.del_userfriend=del_userfriend;

function get_friend(userId){
	var  userAddSql = 'select friend from user_friend where users=?';
	var  userAddSql_Params = [userId];
	connection.query(userAddSql,userAddSql_Params,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 return rows;
	 });
}
exports.get_friend=get_friend;

function add_messages(senderId,receiverId,content){
	var  userAddSql = 'insert into messages(sender,receiver,content) values(?,?,?) ';
	var  userAddSql_Params = [senderId,receiverId,content];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
}
exports.add_messages=add_messages;

function del_messages(id){
	var  userAddSql = 'delete from messages where id=?';
	var  userAddSql_Params = [id];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
}
exports.del_messages=del_messages;

function add_guests(){
	var  userAddSql = 'insert into guests values(null)';
connection.query(userAddSql,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
}); 
}
exports.add_guests=add_guests;

function del_guests(id){
	var  userAddSql = 'delete from guests where id=?';
	var  userAddSql_Params = [id];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
}
exports.del_guests=del_guests;

function add_steward(userId){
	var  userAddSql = 'insert into steward(id) values(?)';
	var  userAddSql_Params = [userId];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });	
}
exports.add_steward=add_steward;

function del_steward(id){
	var  userAddSql = 'delete from steward where id=?';
	var  userAddSql_Params = [id];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });	
}
exports.del_steward=del_steward;

function add_post(authorId,content){
	var  userAddSql = 'insert into Post(author,content) values(?,?)';
	var  userAddSql_Params = [authorId,content];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
}
exports.add_post=add_post;

function del_post(id){
	var  userAddSql = 'delete from post where id=?';
	var  userAddSql_Params = [id];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
}
exports.del_post=del_post;

function settop_post(id){
	var  userAddSql = 'update post set isTop=true where id=?';
	var  userAddSql_Params = [id];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
}
exports.settop_post=settop_post;

function invalid_post(id){
	var  userAddSql = 'update post set Valid=false where id=?';
	var  userAddSql_Params = [id];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
}
exports.invalid_post=invalid_post;

function get_post(){
	
	var  userAddSql = 'select * from post order by isTop DESC,present_time DESC';
	connection.query(userAddSql,function (err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	
	 console.log(rows);
	 }
	 );
	 

}
exports.get_post=get_post;

function add_request_Registration(isApproved,guestsId,userId,stewardId){
	var  userAddSql = 'insert into Request(request_type,isApproved,ReceiveFromGuest,ReceiveFromUser,isJudgedBySteward) values("Registration",?,?,?,?)';
	var  userAddSql_Params = [isApproved,guestsId,userId,stewardId];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
}
exports.add_request_Registration=add_request_Registration;

function add_request_FriendApp(isApproved,userId,friendId,stewardId){
	var  userAddSql = 'insert into Request(request_type,isApproved,ReceiveFromUser,AnotherUser,isJudgedBySteward) values("FriendApp",?,?,?,?)';
	var  userAddSql_Params = [isApproved,userId,friendId,stewardId];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
}
exports.add_request_FriendApp=add_request_FriendApp;

function add_request_MessageSend(isApproved,SenderId,UserId,stewardId,MessageId){
	var  userAddSql = 'insert into Request(request_type,isApproved,ReceiveFromUser,AnotherUser,isJudgedBySteward,MessageId) values("MessageSend",?,?,?,?,?)';
	var  userAddSql_Params = [isApproved,SenderId,UserId,stewardId,MessageId];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
}
exports.add_request_MessageSend=add_request_MessageSend;

function add_request_ApplySteward(isApproved,UserId,StewardId,AdminId){
	var  userAddSql = 'insert into Request(request_type,isApproved,ReceiveFromUser,isJudgedBySteward,isJudgedByAdmin) values("ApplySteward",?,?,?,?)';
	var  userAddSql_Params = [isApproved,UserId,StewardId,AdminId];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
}
exports.add_request_ApplySteward=add_request_ApplySteward;

function add_request_Post(isApproved,UserId,StewardId,PostId){
	var  userAddSql = 'insert into Request(request_type,isApproved,ReceiveFromUser,isJudgedBySteward,PostId) values("Post",?,?,?,?)';
	var  userAddSql_Params = [isApproved,UserId,StewardId,PostId];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
}
exports.add_request_Post=add_request_Post;

function del_request(id){
	var  userAddSql = 'delete from Request where id=?';
	var  userAddSql_Params = [id];
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
	 });
}
exports.del_request=del_request;

function end(){
//关闭connection
connection.end(function(err){
    if(err){        
        return;
    }
      console.log('[connection end] succeed!');
});
}
exports.end=end;