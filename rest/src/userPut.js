var server = require('../config');
var user = global.dbHandle.getModel('user');

server.put('/user', function (req, res, next) {

  user.find({email:req.body.email},function(err, doc){
    if(err){
        res.send(err)
    }else if(!doc[0]){
        res.send("没有相关数据");
    }else{
      user.update({email:req.body.email},
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
          res.send("修改成功");
        }
      });
    }
});
    
});