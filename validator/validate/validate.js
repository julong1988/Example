var validadatorTool = require('validator.tool');

var user_validate = new validadatorTool('example_form',[
    {
        //name 字段
        name: 'username',
        display:"你输入的不{{email}}是合法邮箱|不能为空|太长|太短",
        // 验证条件
        rules: 'is_emil|max_length(12)'
        // rules: 'valid_email|required|max_length(12)|min_length(2)'
    },
    {
        //name 字段
        name: 'password',
        display:"请你选择性别{{sex}}",
        // 验证条件
        rules: 'required'
    },
    {
        //name 字段
        name: 'sex',
        display:"请你选择性别{{sex}}",
        // 验证条件
        rules: 'required'
    }
  ],function(obj,evt){
      if(obj.errors){
          // 判断是否错误
      }
  })

module.exports.user_validate = user_validate;  
