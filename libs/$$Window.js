define(function(require,exports,module){
	var $$Location = require('$$Location');
	window.location = $$Location;
	
	module.exports = window;
});