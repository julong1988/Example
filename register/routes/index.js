var express = require('express');
var router = express.Router();

function _res(code,msg){
  return {code:code,msg:msg}
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.render('index', { title: 'Home' });
  }else{
    res.redirect("/login");
  }
  
});

router.route('/login').get(function(req,res){
  res.render("login", { title: 'Login' });
}).post(function(req,res){
  var user = global.dbhandle.getModel('user');
  var u_name = req.body.username;
  var u_password = req.body.password;

  user.findOne({ name: u_name }, function(err, doc) {

    if (err) {
      res.send(_res(500,'系统错误'));
    } else if (!doc) {
      res.send(_res(404,'用户名不存在'));
    } else {
      if (u_password != doc.password) {
        res.send(_res(404,'密码错误'));
      } else {
        req.session.user = doc;
        res.send(_res(200,'成功'));
      }
    }
  });
  
  
});

router.route('/signup').get(function(req,res){

  res.render("signup", { title: 'Signup' });

}).post(function(req,res){

  var user = global.dbhandle.getModel('user');
  var u_name = req.body.username;
  var u_password = req.body.password;

  user.findOne({ name: u_name }, function(err, doc) {
    if(err){
      res.send(_res(500,'系统错误'));
    }else if(doc){
      res.send(_res(500,'用户名已存在！'));
    }
    else{
      user.create({
        name: u_name,
        password: u_password
      }, function(err, doc) {
        if (err) {
          res.send(_res(500,'用户创建失败'));
        } else {
          req.session.user = doc;
          res.send(_res(200,'用户创建成功'));
        }
      });
    }
  });
});


router.get("/logout", function(req, res) {
  req.session.user = null;
  req.session.error = null;
  res.redirect("/");
});

module.exports = router;
