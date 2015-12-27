requirejs.config({
	baseUrl : './',
	paths : {
		/* jQuery 以及相关插件 */
		'#jQuery' : 'bower_components/jquery_1.11.3/dist/jquery.min',
		'#jQuery#1' : 'bower_components/jquery_1.11.3/dist/jquery.min',
		'#jQuery#2' : 'bower_components/jquery_2.1.4/dist/jquery.min',
		'#jQuery#1.11.3' : 'bower_components/jquery_1.11.3/dist/jquery.min',
		'#jQuery#2.1.4' : 'bower_components/jquery_2.1.4/dist/jquery.min',
		'#jQuery-validate' : 'bower_components/jquery-validate/dist/jquery-validate.min',
		'#jQuery-validate-additional-method' : 'bower_components/jquery-validate/dist/additional-methods.min',

		/* 模版文件 */
		'#artTemplate' : 'bower_components/artTemplate/dist/template',
		'#artTemplate-native' : 'bower_components/artTemplate/dist/template-native',

		/* 自有组件 */
		'$$Window' : 'libs/$$Window',
		'$$Location' : 'libs/$$Location',
		'$$Css' : 'libs/$$Css',
		'$$Utils' : 'libs/$$Utils',
		'$$Global' : 'libs/$$Global',

		/* http相关组件 */
		'$$Cookie' : 'libs/http/$$Cookie',
		'$$Http' : 'libs/http/$$Http',

		/* 加密解密 */
		'$$MD5' : 'libs/$$MD5',

		/* 业务相关 */
		'$$Login' : 'libs/$$Login/$$Login',

		/* 插件 */
		'css' : 'libs/$$Css',
		'$$Ready' : 'libs/$$Ready'
 	},
	shim : {
		'#jQuery' : {
			exports : '$'
		},
		'#jQuery-validate' : ['#jQuery'],
		'#jQuery-validate-additional-method' : ['jQuery-validate'],

		'#artTemplate-native' : ['#artTemplate']
	}
});