# JavaScipt ES6

[toc]

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
-   第一个参数都是 ``this`` 的指向对象 
-   三者的参数允许是各种类型

不同点：

-   ``call()`` 和 ``bind()`` 传入的参数是用 ``逗号 , `` 分割，``apply()`` 传入的是一个参数数组，需要将参数放入数组中去

-   ``bind()`` 返回的是一个新的函数，因此要调用它需要执行

    

### bind()

-   创建绑定函数

```js
this.x = 9;    // 在浏览器中，this 指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();   
// 返回 9, 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

-   偏函数

    `bind()` 可以使一个函数拥有预设的初始参数。只要将这些参数（如果有的话）作为 `bind()` 的参数写在 `this` 后面。当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。

    ```javascript
    function list() {
      return Array.prototype.slice.call(arguments);
    }
    
    function addArguments(arg1, arg2) {
        return arg1 + arg2
    }
    
    var list1 = list(1, 2, 3); // [1, 2, 3]
    
    var result1 = addArguments(1, 2); // 3
    
    // 创建一个函数，它拥有预设参数列表。
    var leadingThirtysevenList = list.bind(null, 37);
    
    // 创建一个函数，它拥有预设的第一个参数
    var addThirtySeven = addArguments.bind(null, 37); 
    
    var list2 = leadingThirtysevenList(); 
    // [37]
    
    var list3 = leadingThirtysevenList(1, 2, 3); 
    // [37, 1, 2, 3]
    
    var result2 = addThirtySeven(5); 
    // 37 + 5 = 42 
    
    var result3 = addThirtySeven(5, 10);
    // 37 + 5 = 42 ，第二个参数被忽略
    ```

- 配合 `setTimeout`

    在默认情况下，使用 `window.setTimeout()` 时，`this` 关键字会指向 `window`（或 `global`）对象。当类的方法中需要 `this` 指向类的实例时，你可能需要显式地把 `this` 绑定到回调函数，就不会丢失该实例的引用。

    



## function* - Generator迭代器

-    这种声明方式(`function`关键字后跟一个星号）会定义一个***生成器函数\* (***generator function***)**，它返回一个  [`Generator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator) 对象。
-    Generator函数是ES6提供的一种异步编程解决方案
-    await就是generator里的yield



## Object



### object.assign(target, ...sources)

- 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
- target: 目标对象, sources: 源对象

-   第一级属性深拷贝，从第二级属性开始就是浅拷贝。

```javascript
// 合并具有相同属性的对象
const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };

const obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
```



















