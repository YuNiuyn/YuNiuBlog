# 页面跳转url传参

[toc]

以下为自己使用过的通过 ``url`` 传参时的加密解密方法，不是万全的，但是比明文传输要好很多。

>   也可以使用cache方法，但是局限性略大，因此选择了 ``url`` 传参

## URL加密

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

## URL 解密

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



## 使用方法

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

