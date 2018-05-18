var server = require('../config');
var user = global.dbHandle.getModel('user');
var encode = require('./tool/encode')
var token = require('../token/token')

server.post('/login', function (req, res, next) {
  
  let pw = encode(req.body.password)
    user.find({ email: req.body.email, password: pw }, {email:1,_id:0},function(err, doc) {

        if (err) { 
            res.send(err);
        } else if (!doc[0]) {
            res.send("账号密码错误");
        } else {
            
            res.send(token.createToken(doc,999999))

        }

        return next();
      });
});
