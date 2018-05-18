var mongoose = require('mongoose');

global.db = mongoose.connect("mongodb://localhost:27017/test_restapi");
global.dbHandle = require('./db/handle');

require('./src/userGet')
require('./src/userPost')
require('./src/userPut')
require('./src/userDelete')
require('./src/login')