var server = require('../config');
var user = global.dbHandle.getModel('user');
var encode = require('./tool/encode')

server.post('/user', function (req, res, next) {
    user.find({ email: req.body.email }, function(err, doc) {

      let pw = encode(req.body.password);
      
        if (err) {
            res.send(err);
        } else if (doc[0]) {
            res.send("email 重复");
        } else {
            user.create({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                tel: req.body.tel,
                password: pw
              }, function(err, doc) {
                if (err) {
                  res.send("db send error");
                } else {
                  res.send("创建成功");
                }
              });
        }

        return next();
      });
});
