/**
 * Created by ?? on 2015/8/12.
 * LoginAcion ??ogin??????????????
 */
define(['#jQuery','$$Utils','$$Gttp','$$MD5'],function($,utils,http,md5){
    var defaultOptions = {
        url : "",                                                               /* 登录地址 */
        md5 : true,                                                             /* 是否对密码进行md5加密*/
        loginNameKey : "loginName",                                         /* 用户名提交的key*/
        passwordKey : "password",                                           /* 密码提交key*/
        validateCodeKey : "code",                                           /* 验证码提交key*/
        passwordElement : ":input[type='password']",                            /* 密码元素 */
        successUrl : "",                                                             /* 登录成功跳转url */
        validateCode : true,
        hint : function(msg,element){                                               /* 信息提示方式 */
            utils.alert(msg);
            element.focus();
        }
    };

    var Login = function(options){}

    /**
     * ??ʼ??Login?????
     * @param options
     * ??Ϊ????Ϣ????????ֵΪĬ?ֵ
     *  url : "",                                                                ??????ύ???
     * md5 : true,                                                              ????????MD5???
     * loginNameKey : "loginName",                                              ??????ύ??????
     * passwordKey : "password",                                                ???????ύ??????
     *  validateCodeKey : "code",                                               ?֤???ύ??????
     * loginNameElement : ":input[name='"+this.loginNameKey+"']",               ????ҳ?Ԫ?
     * passwordElement : ":input[type='password']",                            ?????ҳ?Ԫ?
     * validateCodeElement : ":input[name='"+this.validateCodeKey+"']",         ?֤?Ԫ?
     * hint : function(nsg,element){                                            ??????ʾ
     *     require(['utils'],function(utils){
     *       utils.alert(msg);
     *       element.focus()
     *     }
    *   }
     */
    Login.prototype.init = function(options){
      var _login = this;
        this._options = $.extend({},defaultOptions,options);
        $('form').on('submit',function(){
          _login.action();
          return false;
        })
    }

    /**
     * ???????
     * @returns ????д??û?????
     */
    Login.prototype.getLoginName = function(){
        return this.getLoginNameElement().val();
    }

    /**
     * ???????Ԫ?
     * @returns ????Ԫ?
     */
    Login.prototype.getLoginNameElement = function(){
        return $(":input[name='"+this._options.loginNameKey+"']");
    }

    /**
     * ???????û???
     * @returns ????д????
     */
    Login.prototype.getPassword = function(){
        return this.getPasswordElement().val();
    }

    /**
     * ????????HtmlԪ?
     * @returns ?????HtmlԪ?
     */
    Login.prototype.getPasswordElement = function(){
        return $(this._options.passwordElement);
    }



    /**
     * ?????????????
     * @returns ????д?????
     */
    Login.prototype.getValidateCode = function(){
        return this.getValidateCodeElement().val();
    }

    /**
     * ???????֤?htmlԪ?
     * @returns ????֤?htmlԪ?
     */
    Login.prototype.getValidateCodeElement = function(){
        return $(":input[name='"+this._options.validateCodeKey+"']");
    }

    /**
     * ִ???????
     */
    Login.prototype.action = function(){
       /*
       ???????Ϣ
        */
       var params = {};
        var inthis = this;
       params[inthis._options.loginNameKey] = inthis.getLoginName();
       if(inthis._options.validateCode){
         params[inthis._options.validateCodeKey] = inthis.getValidateCode();
        }
       if(inthis._options.md5 && utils.strNotBlankOrNull(inthis.getPassword())){
           params[inthis._options.passwordKey] = md5(inthis.getPassword());
       }else{
           params[inthis._options.passwordKey] = inthis.getPassword();
       }

       /*
       ?֤????Ϣ
        */
       if(utils.strIsBlankOrNull(params[inthis._options.loginNameKey])){
           inthis._options.hint("用户名不能为空",inthis.getLoginNameElement());
           return false;
       }

       if(utils.strIsBlankOrNull(params[inthis._options.passwordKey])){
           inthis._options.hint("登录密码不能为空",inthis.getPasswordElement());
           return false;
       }

       if(inthis._options.validateCode && utils.strIsBlankOrNull(params[inthis._options.validateCodeKey])){
           inthis._options.hint("请填写验证码",inthis.getValidateCodeElement());
           return false;
       }

       /*
       ִ???????
        */
       http.Post(inthis._options.url).params(params).success(function(resp){
            if(http.ValidateResp.success(resp)){
                utils.next(inthis._options.successUrl);
            }else{
                inthis._options.hint(resp.status,inthis.getLoginNameElement())
            }
       }).error(function(){
           inthis._options.hint("登录失败，请检查网络是否连接",inthis.getLoginNameElement());
       }).go();
    }

    return new Login();
})
