drop database if exists project;
create database project;
use project;

drop table if exists users;
create table users(
id int primary key auto_increment,
name varchar(200) not null,
username varchar(200) unique,
password varchar(200),
present_level int not null default 1,
issteward boolean not null default false
);

drop table if exists user_friend;
create table user_friend(
users int,
foreign key(users) references users(id)
on update cascade on delete cascade,
friend int,
foreign key(friend) references users(id)
on update cascade on delete cascade,
primary key(users,friend)
);

drop table if exists Messages;
create table Messages(
id int primary key auto_increment,
sender int not null,
foreign key(sender) references users(id)
    on update cascade on delete cascade,
receiver int not null,
foreign key(receiver) references users(id)
    on update cascade on delete cascade,
content varchar(500),
present_time datetime not null default now()
);

drop table if exists Guests;
create table Guests(
id int primary key auto_increment
);

drop table if exists Admins;
create table Admins(
id int primary key auto_increment
);

drop table if exists Steward;
create table Steward(
id int primary key,
foreign key(id) references Users(id)
on update cascade on delete cascade
);

drop table if exists Post;
create table Post(
id int primary key auto_increment,
author int,
foreign key(author) references Users(id)
on update cascade on delete cascade,
title varchar(200),
content varchar(2000),
valid boolean not null default true,
isTop boolean not null default false,
present_time datetime not null default now()
);

drop table if exists Request;
create table Request(
id int primary key auto_increment,
request_type enum('Registration','FriendApp','MessageSend','ApplySteward','Post'),
isApproved boolean not null,
isJudgedByAdmin int,
foreign key(isJudgedByAdmin) references Admins(id)
on update cascade on delete cascade,
isJudgedBySteward int,
foreign key(isJudgedBySteward) references Steward(id)
on update cascade on delete cascade,
ReceiveFromGuest int,
foreign key(ReceiveFromGuest) references Guests(id)
on update cascade on delete cascade,
ReceiveFromUser int,
foreign key(ReceiveFromUser) references Users(id)
on update cascade on delete cascade,
AnotherUser int,
foreign key(AnotherUser) references Users(id)
on update cascade on delete cascade,
PostId int,
foreign key(PostId) references Post(id)
on update cascade on delete cascade,
MessageId int,
foreign key(MessageId) references Messages(id)
on update cascade on delete cascade,
present_time datetime not null default now()
);

insert into users(name,username,password) values('leishen','leishen','123');
insert into users(name,username,password) values('shenshen','shenshen','123');
insert into users(name,username,password) values('database','database','123');
insert into users(name,username,password) values('leishen2','leishen2','123');
insert into users(name,username,password) values('shenshen2','shenshen2','123');
insert into users(name,username,password) values('database2','database2','123');

insert into user_friend(users,friend) values(1,2);
insert into user_friend(users,friend) values(2,1);
insert into user_friend(users,friend) values(1,3);
insert into user_friend(users,friend) values(3,1);

insert into Messages(sender,receiver,content) values(1,2,'<p>hi how are you</p>');
insert into Messages(sender,receiver,content) values(3,4,'<p>hi how\'s it going</p>');
insert into Messages(sender,receiver,content) values(4,5,'<p>hello!</p>');

insert into guests values(null);
insert into guests values(null);
insert into guests values(null);
insert into guests values(null);

insert into admins values(null);

insert into steward(id) values(1);
insert into steward(id) values(2);

insert into Request(request_type,isApproved,isJudgedBySteward,isJudgedByAdmin,ReceiveFromGuest,ReceiveFromUser) values('Registration',true,1,null,1,null);
insert into Request(request_type,isApproved,isJudgedBySteward,isJudgedByAdmin,ReceiveFromGuest,ReceiveFromUser) values('FriendApp',true,2,null,null,1);
insert into Request(request_type,isApproved,isJudgedBySteward,isJudgedByAdmin,ReceiveFromGuest,ReceiveFromUser) values('MessageSend',true,1,null,null,2);
insert into Request(request_type,isApproved,isJudgedBySteward,isJudgedByAdmin,ReceiveFromGuest,ReceiveFromUser) values('ApplySteward',true,null,1,null,1);

insert into post(author,title,content,valid,isTop) values(1,'title1','content1',true,true);
insert into post(author,title,content,valid,isTop) values(1,'title2','content2',true,false);
insert into post(author,title,content,valid,isTop) values(1,'title3','content3',true,false);