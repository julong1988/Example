var server = require('../config');
var user = global.dbHandle.getModel('user');
var token = require('../token/token');

server.post('/myinfo', function (req, res, next) {
    let getToken = req.body.token||false;
    if(getToken && token.checkToken(getToken)){
        user.find({email:token.decodeToken(getToken).payload.data[0].email},{__v:0,password:0},function(err, doc){
            if(err){
                res.send(err)
            }else{
                res.send(doc);
            }
            return next();
        });
    }else{
        res.send('重新登陆')
    }
  
    
  
  });