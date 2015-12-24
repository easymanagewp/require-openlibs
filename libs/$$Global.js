define(function(require,exports,module){
	var W = require('$$Window');

   exports.exports = function(name,obj){
       W[name] = obj;
   }
});