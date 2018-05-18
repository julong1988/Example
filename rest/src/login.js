var server = require('../config');
var user = global.dbHandle.getModel('user');
var encode = require('./tool/encode')

server.post('/login', function (req, res, next) {
  
  let pw = encode(req.body.password)
    user.find({ email: req.body.email, password: pw }, function(err, doc) {

        if (err) {
            res.send(err);
        } else if (!doc[0]) {
            res.send("账号密码错误");
        } else {
            res.send('登陆成功')
        }

        return next();
      });
});
