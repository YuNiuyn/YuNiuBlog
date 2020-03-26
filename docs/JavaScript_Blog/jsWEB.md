# Web相关

## JavaScript 浏览器对象模型

<img src="./img/js.jpg" alt="js组成" style="zoom:85%;" />

 https://www.kancloud.cn/digest/web-basic/196456 


## Web API

### EventTarget.addEventListener()

[MDN 链接]( https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener )

**EventTarget.addEventListener()** 方法将指定的监听器注册到 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 上，当该对象触发指定的事件时，指定的回调函数就会被执行。 事件目标可以是一个文档上的元素 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element),[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)和[`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)或者任何其他支持事件的对象 (比如 `XMLHttpRequest`)`。`

`addEventListener()`的工作原理是将实现[`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener)的函数或对象添加到调用它的[`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)上的指定事件类型的事件侦听器列表中。


## 页面跳转url传参

以下为自己使用过的通过 ``url`` 传参时的加密解密方法，不是万全的，但是比明文传输要好很多。

>   也可以使用cache方法，但是局限性略大，因此选择了 ``url`` 传参


### URL加密

```javascript
function encryUrl(data) {
    let query = null;
	try {
		query = window.encodeURIComponent(JSON.stringify(data));
		return window.btoa(query);
	} catch (err) {
		console.log('%c url-encry-error：' + JSON.stringify(err), 'color:red;');
	}
    return "";
}
```

### URL 解密

```javascript
function getQueryParam (param) {
    let h = window.location.href;
    let reg = new RegExp("[\?\&]?" + param + "=([,-\w]+)[\&]?", "i");
    if (reg.test(h)) {
      let v = reg.exec(h)[1];
      return v;
    }
    return "";
};

function decryptUrl(val) {
    try {
      let decryStr = window.atob(val); 
      return window.decodeURIComponent(decryStr);
    } catch (err) {
      console.log('%c url-decry-error：' + JSON.stringify(err.stack), 'color:red;');
    }
    return false;
}
```

### 使用方法

```javascript
let url = 'https://www.test.com/test.html'
let param1 = '12345'
let param2 = 'Jack'

// 加密
let p1 = encryUrl('12345')
let p2 = encryUrl('Jack')

// 地址栏url为
let url = 'https://www.test.com/test.html?param1=' + p1 + '&param2=' + p2

// 解密
let param1 = JSON.parse(decryptUrl(getQueryParam('param1')));
let param2 = JSON.parse(decryptUrl(getQueryParam('param2')));
```


>小坑： 记得经过页面跳转后，解密需要 ``JSON.parse`` 










