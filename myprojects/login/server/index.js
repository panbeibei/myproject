let express = require('express');
let app = express();
let mysql = require('mysql');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

let connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    database:'1601n'
})

app.all('*',(req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.get('/',function(req,res){
    res.send('hello world');
})

//拉取用户列表
app.get('/userList',(req,res)=>{
    connection.query('select id,username,birthday,phone,address from user',(err,rows,fields)=>{
        if(err)throw err;
        res.json({
            code:0,
            data:rows
        })
    })
})

//拉取角色列表
app.get('/rolerList',(req,res)=>{
    let id = req.query.id,allRoler = [];
    connection.query('select id,rolername from roler',(err,rows,fields)=>{
        if(err)throw err;
        allRoler = rows;
        if(id){
            connection.query(`select rid,rolername from user_roler,roler where user_roler.rid = roler.id and user_roler.status=1 and user_roler.uid=${id}`,(err,rows,fields)=>{
                if(err) throw err;
                res.json({
                    code:0,
                    allRoler,
                    myRoler:rows
                });
            })
        }else{
            res.json({
                code:0,
                allRoler,
                myRoler:[]
            })
        }
    })
})
//添加角色接口
app.get('/addRoler',(req,res)=>{
    let uid = req.query.uid,
        rid = req.query.rid;
        console.log(uid,rid);
    connection.query(`select rid from user_roler where uid=? and rid=? and status =1`,[uid,rid],function(err,rows,fields){
        if(err)throw err;
        if(rows.length){
            res.json({
                code:-2,
                msg:'已有该角色'
            })
        }else{
            connection.query(`insert into user_roler (uid,rid) values(?,?)`,[uid,rid],function(err,rows,fields){
                if(err)throw err;
                if(rows.insertId){
                    res.json({
                        code:0,
                        msg:'添加角色成功'
                    })
                }else{
                    res.json({
                        code:-1,
                        msg:'添加角色失败'
                    })
                }
            })
        }
    })
})
//删除数据接口
app.get('/removeRoler',(req,res)=>{
    let uid = req.query.uid,
        rid = req.query.rid;
    connection.query(`update user_roler set status=0 where uid=? and rid=?`,[uid,rid],function(err,rows,fields){
        if(err)throw err;
        if(rows.affectedRows){
            res.json({
                code:0,
                msg:'删除角色成功'
            })
        }else{
            res.json({
                code:-1,
                msg:'删除角色失败'
            })
        }
    })
})
app.post('/login',jsonParser,(req,res)=>{
    console.log(req.body)
    connection.query(`select 'username' from user where username = ?`,[req.body.username],function(err,rows,fields){
        if(err)throw err;
        if(rows.length){
            connection.query(`select 'password' from user where password = ?`,[req.body.password],(err,rows,fields)=>{
                if(rows.length == 1){
                    res.json({
                        code:0,
                        msg:'登陆成功'
                    })
                }else{
                    res.json({
                        code:-2,
                        msg:'登录失败'
                    })
                }
            })
        }else{
            res.json({
                code:-2,
                msg:'不允许创建新用户'
            })
        }
    })
})

// //获取权限列表
// app.get('/accessList',(req,res)=>{
//     let uid = req.query.uid;
//     connection.query(`select access.accessname from user,user_roler,roler_access,access where user.id=user_roler.uid and user_roler.rid = roler_access.rid and roler_access.aid = access.id and uid=? and user_roler.status=1 group by access.id`,[uid],function(err,rows,fields){
//         if(err)throw err;
//         res.json({
//             code:0,
//             list:rows
//         })
//     })
// })

app.get('/list',(req,res)=>{
    //查询 语句
    connection.query('select *,id,username,password from user',function(err,rows,fields){
        if(err)throw err;
    });

    //插入语句
    connection.query('insert into user (username,password,phone,birthday) values("panbeibei",123456,13133809344,313123)',(err,rows,fields)=>{
        console.log(rows);
    })

    //修改语句
    connection.query('update user set username="xiaochen" where username="panbeibei"',(err,rows,fields)=>{
        console.log(rows);
    })

    //删除语句
    connection.query('delete from user where id<3',(err,rows,fields)=>{
        console.log(rows)
    })

    res.end('111')
})
app.listen(9000)