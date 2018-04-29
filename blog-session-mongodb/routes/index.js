var express = require('express');
var router = express.Router();
var moment = require('moment');
var multer = require('multer');
var formidable = require("formidable");
//qiniu cdn
var qiniu = require('qiniu');
var accessKey = '_bAYnbQOcGO-JZML2M9blQa2FxM4MbDaBxG_pSAn';
var secretKey = 'm_8f2CGLvm4fzmwMsC11mZbOsNHKqPqhIpaQriHg';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;
var options = {
  scope: 'julong1988',
  expires: 7200
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);

var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();


var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, __dirname.replace('routes', '') + 'public/upload/');
  },
  filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = multer({ storage: Storage,preservePath: true }).single("file"); //Field name and max count

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
    case 8006:
      msg="文章成功发布";
      break;
    case 8007:
      msg="文件上传失败";
      break;
    default:
      msg="系统错误";
  }
  return {code:code,msg:msg}
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var post = global.userHandle.getModel('post');
  

  post.find({},function (error, doc) {  
    if (error) {  
      res.send(_res(1000))
    } else {
      res.render('index',{
        title:'Blog Home',
        blogpost:doc
      })
    } 

  }).sort({'_id':-1});
  /*title 
  if(req.session.user){
    
  }else{
    res.redirect("/login");
  }
  */
  
});

router.route('/login').get(function(req,res){
  res.render("login", { title: 'Login' });
}).post(function(req,res){
  var user = global.userHandle.getModel('user');
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

  var user = global.userHandle.getModel('user');
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



router.route('/write').get(function(req,res){

  if(req.session.user){
    res.render('write', { title: 'write page' });
  }else{
    res.render('chmod', { title: 'error' });
  }

}).post(function(req,res){
  //console.log(req.file)
  var form = new formidable.IncomingForm();  
  form.parse(req, function(err, fields, files) {  
    //console.log('fields',fields);//表单传递的input数据  

    formUploader.putFile(uploadToken, files.file.name, files.file.path, putExtra, function(respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
    
      if (respInfo.statusCode == 200) {
        console.log(respBody);
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    });
    

  });  


  /*
  upload(req, res, function (err) {

    if (err) {
      console.log(err)
      res.send(_res(8007))
    }else{
      var post = global.userHandle.getModel('post');
      var p_name = req.body.name;
      var p_date = moment().format('YYYY-MM-DD HH:mm:ss');
      var p_title = req.body.title;
      var p_content = req.body.content;
      var p_file = "/upload/" + req.file.filename
      post.create({  
        name: p_name,  
        date: p_date,  
        title: p_title,
        content: p_content,
        imgFile: p_file
    }, function (error, doc) { 
      
        if (error) { 
          console.log("error")
          res.send(_res(1000))
        } else { 
          console.log(234)
          res.send(_res(8006))    
        }  
    
      });
      
    }
  });
  */

  
});



module.exports = router;
