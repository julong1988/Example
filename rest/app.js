var restify = require('restify');
var mongoose = require('mongoose');

global.db = mongoose.connect("mongodb://localhost:27017/test_restapi");
global.dbHandle = require('./db/handle');

var user = global.dbHandle.getModel('user');

const server = restify.createServer({
  name: 'restful api',
  version: '1.0.0'
});

 
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
 

server.get('/user', function (req, res, next) {
    user.find({},{_id:0,__v:0,password:0},function(err, doc){
        if(err){
            res.send(err)
        }else{
            res.send(doc);
        }
        return next();
    });
});

server.get('/user/:id', function (req, res, next) {

    user.find({_id:req.params.id},{_id:0,__v:0,password:0},function(err, doc){
        if(err){
            res.send("db send error");
        }else{
            res.send(doc);
        }
        return next();
    });

});

//新建用户
server.post('/user', function (req, res, next) {
    user.findOne({ email: req.body.email }, function(err, doc) {

        if (err) {
            res.send(err);
        } else if (doc) {
            res.send("email 중복");
        } else {
            user.create({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                tel: req.body.tel,
                password: req.body.password
              }, function(err, doc) {
                if (err) {
                  res.send("db send error");
                } else {
                  res.send("성공");
                }
              });
        }

        return next();
      });
});



//修改特定用户
server.put('/user', function (req, res, next) {
    user.update({_id:req.body._id},
        {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        tel: req.body.tel,
        password: req.body.password
      }, function(err, doc) {
        if (err) {
          res.send("db send error");
        } else {
          res.send("성공");
        }
      });
});
//删除特定用户
server.del('/user', function (req, res, next) {
    user.remove({email:req.body.email},function(err, doc){
        if(err){
            res.send("db send error");
        }else{
            res.send("删除成功");
        }
        
    });
    return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});