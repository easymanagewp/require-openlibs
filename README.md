# require-openlibs
## 使用requre-openlibs库
- 在页面顶部引入requrejs和requirejs-config两个文件
``` 
<script charset="utf-8" type="text/javascript" src="/bower_components/requirejs/require.js"></script>
<script chatset="utf-8" type="text/javascript" src="/requirejs-config.js"></script>
```
- 在页面内使用组件
```
// 使用jQuery
<script type="text/javascript">
  require(['#jQuery'],function($jQuery){
    // 在此处可以使用jQuery对象
  });
</script>
```
