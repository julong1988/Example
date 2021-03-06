var express = require('express');
var router = express.Router();

function _res(code){
  var msg;
  switch(code){
    case 8000:
      msg="用户名不存在";
      break;
    case 8001:
      msg="密码错误";
      break;
    case 8002:
      msg="用户名已存在！";
      break;
    case 8003:
      msg="用户创建失败";
      break;
    case 8004:
      msg="成功";
      break;
    case 8005:
      msg="用户创建成功";
      break;
    default:
      msg="系统错误";
  }
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
      res.send(_res(1000));
    } else if (!doc) {
      res.send(_res(8000));
    } else {
      if (u_password != doc.password) {
        res.send(_res(8001));
      } else {
        req.session.user = doc;
        res.send(_res(8004));
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
      res.send(_res(1000));
    }else if(doc){
      res.send(_res(8002));
    }
    else{
      user.create({
        name: u_name,
        password: u_password
      }, function(err, doc) {
        if (err) {
          res.send(_res(8003));
        } else {
          req.session.user = doc;
          res.send(_res(8005));
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
