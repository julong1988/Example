var server = require('../config');
var user = global.dbHandle.getModel('user');
var crypto = require('crypto');

server.post('/login', function (req, res, next) {
  // 1MD5 Hash 2SHA-1 Hash
  let pw = crypto.createHash('sha1').update(crypto.createHash('md5').update(req.body.password).digest('hex')).digest('hex');
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
