const crypto = require('crypto');

// 1MD5 Hash 2SHA-1 Hash
module.exports = function(str){
    return crypto.createHash('sha1').update(crypto.createHash('md5').update(str).digest('hex')).digest('hex');
};