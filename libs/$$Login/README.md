# 登录模块使用指南

## 快速入门

- 创建form表单
```
<form>
  <label>用户名：</label>
  <input name="login_name"/>
  <label>密码：</label>
  <input name="password"/>
  <button id="submit">提交</button>
</form>
```
- 初始化Login对象，绑定表单
```
require(['$$Login','#jQuery'],function($$Login,$jQuery){
  var _Login = $$Login.init({
    url : '/login.do',                            // 登录数据提交地址
    md5 : false,                                  // 是否md5加密
    loginNameKey : 'login_name',                  // 登录用户名的name
    validateCode : false,                         // 是否使用验证码（false）
    successUrl : '/main.html'                     // 登录成功跳转地址
  });
  
  // 绑定数据提交事件
  $jQuery('#submit').on('click',function(){
    _Login.action();    
  });
});
```

## 方法
- init(settings)
  
  初始化Login对象，设置相关属性
  
- getLoginName()

  获取用户填写的登录名

- getLoginNameElement()

  获取填写用户名的元素对象(jQuery对象)

- getPassword()

  获取用户填写的登录密码

- getPasswordElement()

  获取登录密码元素对象(jQuery对象)

- getValidateCode()

  获取用户填写的验证码（如果validateCode设置为false，则无法获取到任何内容）
  
- getValidateCodeElement()

  获取验证码填写元素

- action()

  提交登录数据
  
## Settings

  初始化表单的时候，使用此设置
  
|属性名称|类型|默认值|备注|
|:----|:----|:----|:----|:----|
|url|string|无|表单登录地址，登录地址接受的参数名称和表单input的name相同|
|md5|boolean|true|是否对密码进行md5加密传输|
|loginNameKey|string|loginName|用户名input框的name|
|validateCodeKey|string|code|验证码的输入框name|
|passwordElement|string|:input[type='password']|密码输入框的选择器|
|successUrl|string|无|登录成功之后跳转的地址|
|validateCode|boolean|true|是否开启验证码，如果不开启的话，将忽略验证码的相关设置，并且不进行验证|
|hint|function(msg,element)|utils.alert(msg)|错误提示方法，参数1为错误信息，参数2为错误的元素|
