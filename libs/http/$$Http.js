/**
 * 基于jQuery的Http组件，完成ajax相关操作
 */
define(['#jQuery','$$Console'],function(jQuery){

	/**
	 * 创建一个Ajax对象
	 * @param url 请求路径
     */
	var	Ajax = function(url){
		if(url.indexOf('?')==-1){
			url += "?_TIMESTAMP_="+ new Date().getTime();
		}else{
			url += "&_TIMESTAMP_="+ new Date().getTime();
		}
		this._url = url;
		this._params = {};
		this._success = function(){};
		this._error = function(){};
		this._method = 'GET';
		this._async = !0;
		this._dataType = 'json';
	};

	/**
	 * 设置请求参数
	 * @param key 参数名称 - 可设置为一个{}对象，key,value一次性设置多个参数
	 * @param value 参数值 - 如果key为{}对象，则此值可不进行设置
	 * @returns {Ajax}
     */
	Ajax.prototype.params = function(key,value){
		if(arguments.length == 1 && typeof(key) == 'object'){
			this._params = jQuery.extend(this._params,key);
		}else if(typeof(key) == 'string' && typeof(value) == 'string'){
			var _para = {};
			_para[key] = value;
			this.params(_para);
		}
		return this;
	};

	/**
	 * 设置是否进行异步加载，默认为true
	 * @param async true | false
	 * @returns {Ajax}
     */
	Ajax.prototype.async = function(async){
		this._async = !!async;
		return this;
	};

	/**
	 * 设置请求的数据类型，默认值为json
	 * @param dataType 请求的数据类型
	 * @returns {Ajax}
     */
	Ajax.prototype.dataType = function(dataType){
		this._dataType = dataType;
		return this;
	};

	/**
	 * 请求成功之后的回调函数
	 * @param successCall 请求成功的回调函数
	 * @returns {Ajax}
     */
	Ajax.prototype.success = function(successCall){
		this._success = successCall;
		return this;
	};

	/**
	 * 发生错误的时候的回调函数
	 * @param errorCall
	 * @returns {Ajax}
     */
	Ajax.prototype.error = function(errorCall){
		this._error = errorCall;
		return this;
	};

	/**
	 * 发送请求
	 * @returns {Ajax}
     */
	Ajax.prototype.go = function(){
		var ajax = this;
		jQuery.ajax(ajax._url,{
			type : ajax._method,
			data : ajax._params,
			dataType : this._dataType,
			async : ajax._async,
			error : ajax._error,
			success : ajax._success
		});
		return this;
	};

	/**
	 * 设置请求模式
	 * @param method
	 * @returns {Ajax}
     */
	Ajax.prototype.method = function(method){
		this._method = method;
		return this;
	};
	
	var Http = {
			Get : function(url){return new Ajax(url).method('GET');},
			Post : function(url){return new Ajax(url).method('POST');},
			Put : function(url){return new Ajax(url).method('put');},
			Delete : function(url){return new Ajax(url).method('delete');},
			Patch : function(url){return new Ajax(url).method('patch');},
			ValidateResp : {
				success : function(resp){
					return resp.status == 0 ;
				}
			},
			GetHtml : function(url,$element){
				var _ajax = new Ajax(url).dataType('text');
				_ajax.success(function(resp){
					$element.html(resp);
				}).error(function(e){
					console.info(e);
				}).go();
			}
	};
	
	return Http;
});