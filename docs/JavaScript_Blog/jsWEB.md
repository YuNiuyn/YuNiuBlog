# Web相关

[toc]

## JavaScript 浏览器对象模型

<img src="./img/js.jpg" alt="js组成" style="zoom:85%;" />

 https://www.kancloud.cn/digest/web-basic/196456 



## JavaScript 文档对象模型

todo



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



## WebSocket

在单个TCP连接上进行全双工通信的协议, 可实现服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息。



### 特点

（1）建立在 TCP 协议之上，服务器端的实现比较容易。

（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

（3）数据格式比较轻量，性能开销小，通信高效。

（4）可以发送文本，也可以发送二进制数据。

（5）没有同源限制，客户端可以与任意服务器通信。

（6）协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL。



### 客户端简单示例

```javascript
var ws = new WebSocket("wss://echo.websocket.org"); // WebSocket 构造函数

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};
```



-   webSocket.readyState
    -   CONNECTING：值为0，表示正在连接。
    -   OPEN：值为1，表示连接成功，可以通信了。
    -   CLOSING：值为2，表示连接正在关闭。
    -   CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

-   webSocket.onopen || webSocket.onclose

    -   onopen用于指定连接成功后的回调函数, onclose用于指定连接关闭后的回调函数。

    ```javascript
    ws.onopen = function() {
        // ...
    }
    // 指定多个回调函数
    ws.addEventListener('open', function(event) {
        // ...
    })
    ```



-   webSocket.onmessage

    用于指定收到服务器数据后的回调函数

    ```javascript
    ws.onmessage = function(event) {
      var data = event.data;
      // 处理数据
    };
    
    ws.addEventListener("message", function(event) {
      var data = event.data;
      // 处理数据
    });
    ```

    注意，服务器数据可能是文本，也可能是二进制数据（`blob`对象或`Arraybuffer`对象）。

-   webSocket.send()

    用于向服务器发送数据

    ```javascript
    ws.send('hello, world');
    ```

-   webSocket.onerror

    用于指定报错时的回调函数。

    ```javascript
    ws.onerror = function(error) {
        // handle error
    }
    ```

    












