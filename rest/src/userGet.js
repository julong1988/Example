var server = require('../config');
var user = global.dbHandle.getModel('user');

server.get('/user', function (req, res, next) {
    user.find({},{__v:0,password:0},function(err, doc){
        if(err){
            res.send(err)
        }else{
            res.send(doc);
        }
        return next();
    });
});

server.get('/user/:id', function (req, res, next) {

    user.find({_id:req.params.id},{_id:0,__v:0,password:0},function(err, doc){
        if(err){
            res.send("db send error");
        }else{
            res.send(doc);
        }
        return next();
    });

});