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
issteward boolean not null default false,
isadmin boolean not null default false,
valid boolean not null default true,
requestToSteward boolean not null default false
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
request_type enum('FriendApp','ApplySteward'),
isSentFrom int,
foreign key(isSentFrom) references users(id)
on update cascade on delete cascade,
isJudgedBy int,
foreign key(isJudgedBy) references users(id)
on update cascade on delete cascade,
present_time datetime not null default now()
);

insert into users(name,username,password,isadmin) values('yifan','yifan','123',true);
insert into users(name,username,password,issteward) values('zuo','zuo','123',true);
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

insert into Request(request_type,isSentFrom,isJudgedBy) values('FriendApp',3,4);
insert into Request(request_type,isSentFrom,isJudgedBy) values('ApplySteward',3,1);

insert into post(author,title,content,valid,isTop) values(3,'title1','content1',true,true);
insert into post(author,title,content,valid,isTop) values(4,'title2','content2',true,false);
insert into post(author,title,content,valid,isTop) values(5,'title3','content3',true,false);