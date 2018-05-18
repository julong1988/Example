var server = require('../config');
var user = global.dbHandle.getModel('user');

server.del('/user', function (req, res, next) {
    user.find({email:req.body.email},{__v:0,password:0},function(err, doc){
        if(err){
            res.send(err)
        }else if(!doc[0]){
            res.send("没有相关数据");
        }else{
            user.remove({email:req.body.email},function(err, doc){
                if(err){
                    res.send("db send error");
                }else{
                    res.send("删除成功");
                }
            });
        }
    });
    
    return next();
});

