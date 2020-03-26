# Javascript 基础

[[toc]]

## setTimeout() / setInterval()

-   setTimeout / setInterval方法是挂在window对象下的。
-   setTimeout最快执行时间是4毫秒。
-   setTimeout和setInterval函数，都返回一个表示计数器编号的整数值。
-   clearTimeout()、clearInterval()清除定时器，传参为计数器的 **ID**。


### setTimeout() & setInterval()

-   setTimeout函数接受两个参数
	``` js
    是推迟执行的毫秒数var timerId = setTimeout(func|code, delay)
    // func | code 是将要推迟执行的函数名或者一段代码
    // delay 是推迟执行的毫秒数
    ```
    
-   推迟执行的代码必须以字符串的形式，放入setTimeout，因为引擎内部使用eval函数，将字符串转为代码。

-   如果**推迟执行的是函数**，则可以直接将函数名，放入setTimeout。一方面eval函数有安全顾虑，另一方面为了便于`JavaScript`引擎优化代码。



-   **`setTimeOut` 传参**

    -   在`setTimeout()`的回调函数中调用函数 

        ```javascript
        setTimeout(function(){
            要执行的函数
        }, delay)
        ```

    -   使用**bind**或**apply**方法。

        ``` javascript
        setTimeout( function(arg1){}.bind(undefined, 10), 1000 );
        // bind方法第一个参数是undefined，表示将原函数的this绑定全局作用域，第二个参数是要传入原函数的参数。它运行后会返回一个新函数，该函数不带参数。
        ```

-   **setTimeout()中回调函数中的this**
    
    -   如果被setTimeout推迟执行的回调函数是某个对象的方法，那么该方法中的this关键字将指向全局环境，而不是定义时所在的那个对象。
-   **setTimeout() 运行机制**
    -   setTimeout和setInterval的运行机制是，将指定的代码移出本次执行，等到下一轮Event Loop时，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就等到再下一轮Event Loop时重新判断。这意味着，setTimeout指定的代码，必须等到本次执行的所有代码都执行完，才会执行。
    -   `setTimeout(function, 0)`将function移动到任务队列尾部，其它任务完成后立即执行此任务。
    -   `setTimeout(function, 0) `可分割代码块

### clearTimeout() & clearInterval()

-   每次设置定时器，都会产生一个此定时器的ID，因此**清除所有定时器**时可将所有的定时器push到一个list里面，然后再遍历列表，依次清除。
-   例如设置发送验证码倒计时时，在外部清除定时器需要用到以上方法。



## js中的遍历



### 数组遍历

1.  **forEach**

    ```js
    var arr = ['a', 'b', 'c', 'd'];
    arr.forEach(function(value, index) {
        console.log(value, index);
    })
    ```


2.  **map**

    ```javascript
    var arr = ['a', 'b', 'c', 'd'];
    arr.map(function(value, index, arr) {
        console.log(value, index);
    })
    ```

3.  **for 普通循环遍历**

4.  **for...in**

    ```javascript
    var arr = ['a', 'b', 'c', 'd'];
    for (var index in arr) {
        console.log(index, arr[index]);
    })
    // index值是字符串"0","1","2"
    ```

5.  **for...of (ES6)**

    ```javascript
    var arr = ['a', 'b', 'c', 'd'];
    for (var value of arr) {
        console.log(value);
    })
    // 只能遍历出value, 不饿能遍历出下标, 可遍历出Symbol数据类型的属性,此方法作为遍历所有数据结构的统一的方法
    ```



### 对象遍历

1.  **for...in**

    遍历输出的是对象自身的属性以及原型链上可枚举的属性(不含Symbol属性),原型链上的属性最后输出说明先遍历的是自身的可枚举属性,后遍历原型链上的

    ```javascript
    var obj = { 
        'name': "yayaya",
        'age': '12',
        'sex': 'female'
    };
    
    Object.prototype.pro1 = function() {}; //在原型链上添加属性
    
    Object.defineProperty(obj, 'country', {
      Enumerable: true //可枚举
    });
    
    Object.defineProperty(obj, 'nation', {
      Enumerable: false //不可枚举
    })
    
    obj.contry = 'china';
    
    for (var index in obj) {
      console.log(index, obj[index])
    }
    
    /* name yayaya
       age 12
       sex female
       contry china
       pro1 function()
    */
    ```

2.  **Object.keys()**

    遍历对象返回的是一个包含对象自身可枚举属性的数组(不含Symbol属性)

3.  **Objcet.getOwnPropertyNames()**

    输出对象自身的可枚举和不可枚举属性的数组,不输出原型链上的属性

4.  **Reflect.ownKeys()**





## this

[参考](https://segmentfault.com/a/1190000015444951) 作者： [**OBKoro1**](https://segmentfault.com/u/obkoro1)

### this 四种绑定规则

-   **默认绑定**

    -   非严格模式下，默认绑定的`this`指向全局对象。
    -   严格模式下，全局作用域中，`this`指向`window对象`。函数作用域中，`this`指向undefined

    ```javascript
    // 其中一个特殊情况
    var a = 2;
    
    function foo() {
      console.log(this.a); // foo函数不是严格模式，this默认绑定全局对象
    }
    
    function foo2(){
      "use strict";
      foo(); // 严格模式下调用其他函数，不影响其默认绑定
    }
    
    foo2(); // 输出2
    ```

-   **隐式绑定**

    -   函数在调用位置上是否有上下文对象，如果有，那么this就会隐式绑定到这个对象上。
    -   隐式绑定会丢失：
        -   函数调用时，并没有上下文对象，只是对函数的引用。
        -   情况在传入回调函数中也很常见。

    ```javascript
    var a = "global";
    
    let obj1 = {
      a: "obj1",
      obj2: obj2
    };
    
    let obj2 = {
      a: "obj2",
      foo: foo
    };
    
    function foo() {
      console.log(this.a);
    }
    
    obj2.foo(); // obj2 - this指向调用函数的对象
    obj1.obj2.foo(); // obj2 - this指向最后一层调用函数的对象
    
    // 隐式绑定丢失
    let bar = obj2.foo; // bar只是一个函数别名 是obj2.foo的一个引用
    bar(); // "global" - 指向全局
    
    // 回调函数中
    test(obj2.foo); // 传入函数的引用，调用时也是没有上下文对象。
    ```

-   **显式绑定**

    -   在某个对象上强制调用对象，通过`apply`、`call`、`bind`将函数中的`this`绑定到指定对象上。

    -   **传入的不是对象：**

        如果你传入了一个原始值(字符串,布尔类型，数字类型)，来当做this的绑定对象，这个原始值转换成它的对象形式。

        如果你把`null`或者`undefined`作为this的绑定对象传入`call`/`apply`/`bind`，这些值会在调用时被忽略，实际应用的是默认绑定规则。

    ```javascript
    let obj = {
        a: "obj"
    };
    
    function foo() {
        console.log(this.a);
    }
    
    foo.call(obj); // obj
    ```

-   **new绑定**
    -   使用构造函数的时候，this会自动绑定在new期间创建的对象上。
    -   















## 函数防抖（debounce）和函数节流（throttle）



### 防抖（debounce）







### 节流（throttle）









