

[toc]

# JavaScipt ES6



## 函数调用

1.  ```javascript
    // 直接调用
    function test() {
        // ...
    }
    
    test();
    ```

2.  ```javascript
    // 对象调用
    var obj = {
        test: function() {
            // ...
        }
    }
    
    obj.test();
    ```

3.  ```javascript
    // 构造函数调用
    // 构造函数的调用会创建一个新的对象。新对象会继承构造函数的属性和方法。
    // Tips: 构造函数中 this 关键字没有任何的值。this 的值在函数调用实例化对象(new object)时创建。
    
    var a = new test();
    ```

4.  ```javascript
    // 作为函数方法调用
    // 使用 call() 或 apply()
    
    // 在 JavaScript 严格模式(strict mode)下, 在调用函数时第一个参数会成为 this 的值， 即使该参数不是一个对象。
    // 在 JavaScript 非严格模式(non-strict mode)下, 如果第一个参数的值是 null 或 undefined, 它将使用全局对象替代。
    
    myObj = test.call(myObj);
    myObj = test.apply(myObj);
    ```



## call(), apply(), bind()

相同点：

-   都是用来重定义 ``this`` 这个对象的
-    第一个参数都是 ``this`` 的指向对象 
-    三者的参数允许是各种类型

不同点：

-   ``call()`` 和 ``bind()`` 传入的参数是用 ``逗号 , `` 分割，``apply()`` 传入的是一个参数数组，需要将参数放入数组中去
-   ``bind()`` 返回的是一个新的函数，因此要调用它需要执行



## function*

-    这种声明方式(`function`关键字后跟一个星号）会定义一个***生成器函数\* (***generator function***)**，它返回一个  [`Generator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator) 对象。
-   Generator函数是ES6提供的一种异步编程解决方案
-   





# JavaScript 浏览器对象模型

<img src="./img/js.jpg" alt="js组成" style="zoom:85%;" />

 https://www.kancloud.cn/digest/web-basic/196456 





# Web API



### EventTarget.addEventListener()

[MDN 链接]( https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener )

**EventTarget.addEventListener()** 方法将指定的监听器注册到 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 上，当该对象触发指定的事件时，指定的回调函数就会被执行。 事件目标可以是一个文档上的元素 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element),[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)和[`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)或者任何其他支持事件的对象 (比如 `XMLHttpRequest`)`。`

`addEventListener()`的工作原理是将实现[`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener)的函数或对象添加到调用它的[`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)上的指定事件类型的事件侦听器列表中。

