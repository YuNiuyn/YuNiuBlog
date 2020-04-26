# Vue.js

[toc]

# Vuejs生命周期

## 官方图例

![](./Vue_img/lifecycle.png)

>   不建议使用箭头函数来定义生命周期方法



## 图例详解



### 生命周期状态

#### new Vue()

```javascript
// 开始创建一个 Vue 的实例对象
var vm = new Vue({
    el: '#app',
    data: {},
    beforeCreated() {},
    .
    .
    .
    methods:{}
})
```



#### Init Events & Lifecycle

-   初始化了一个 ``Vue`` 的空的实例对象
-   此对象只有默认的生命钩子和默认事件，其它还没有创建



#### Init injections & reactivity

-   

-   `initInjections(vm)、initState(vm)、initProvide(vm)`：初始化数据: ``inject、state、provide``
-   ``initState`` 的作用是初始化 ``props、data、methods、watch、computed`` 等属性。



#### 模板编译

-   将内存中的数据等，编译模板，再渲染成DOM
-   还没有挂载到页面中去



#### Create vm.$el and replace "el" with it

-   将上面内存中编译好的模板，替换到当前页面中去



#### Mounted (实例状态)

-   组件 运行阶段 生命周期函数： ``beforeUpdate`` 和 ``updated``
-   实时监控数据，即时更新 DOM



#### Virtual DOM re-render and patch

-   根据 ``data`` 中的数据，在内存中重新渲染一份最新的 ``DOM tree`` 
-   将新的 ``DOM tree`` 渲染到当前页面中
-   完成``data`` => ``view`` 更新



### 生命周期钩子 - 创建：

#### beforeCreate

-    DOM渲染，``data`` 和 ``methods`` 初始化之前。



#### created

-   ``data`` 和 ``methods`` 初始化完成，DOM渲染完成（未挂载）。
-   可以在此进行页面初始化请求并渲染，但请求过多有可能会使页面加载速度变慢，用户感知略差。



#### beforeMount

-   DOM仍然未挂载，相关的 ``render`` 函数首次被调用 。
-   模板已经编辑完成，但是 ``{{ }}`` 只是占位，并没有把数据渲染进页面中去。



#### mounted

-   数据和DOM完成挂载，实例完全创建完成。如果有需要操作页面DOM，最早在此生命周期函数操作。
-   可以在此请求数据，然后数据可以渲染进当前页面里
-   只会执行一次



### 生命周期钩子 - 运行：

#### beforeUpdate

-   组件运行阶段

-   显示的数据与内存中的数据没有同步，显示的数据还没有更新
-   页面数据更新都会触发



#### update

-   组件运行阶段
-   显示数据已更新，与内存中的数据保持一致
-   页面数据更新都会触发，数据更新完毕
-   谨慎使用，对性能影响较大



### 生命周期钩子 - 销毁：

#### beforeDestory

-   Vue实例销毁前调用
-   实例所有的``data``与``methods``等，依旧可用。



#### destroyed

-   Vue实例被销毁后调用
-    调用后，Vue 实例指示的所有东西都会解绑，所有的事件监听器会被移除，所有的子实例也会被销毁 



>   只有初次渲染会在服务端进行， beforeCreate 和 created



## 生命周期相关知识点











# Vue.js 事件



## 事件处理

### javascript 可直接引用实例里的方法

```javascript
var vm = new Vue({
    el: 'app',
    data:{
        name: 'Vue.js'
    },
    methods:{
        greet: function(event) {
            console.log('Hi')
        }
    }
})
// 直接引用greet
vm.greet()
```



### 内联语句处理器访问原始DOM事件

-   用特殊变量 ``$event`` 把原始DOM传入方法中去

```html
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

```javascript
// ...
methods: {
  warn: function (message, event) {
    // 现在可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}
```



### 事件修饰符，按键修饰符

🔨ing...





# 计算属性(computed)，方法(methods)，侦听器(watcher)



## 计算属性 computed



###  computed 的 setter

 计算属性默认只有 getter ，也可以提供 setter

```javascript
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

 现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。 



### computed缓存


-   基于依赖进行缓存。

-   只有它的相关依赖发生改变时才会重新求值。

-   假设依赖的 ``data`` 没有发生改变，``computed`` 都会立即返回之前的计算结果，而不必再次执行函数。

-   ``Date.now()`` 不是响应式依赖，因此不会更新。

    ```javascript
    computed: {
        now: function() {
            return Date.now()
        }
    }
    ```




## 侦听器（watcher）

-   当需要在数据变化时执行异步或开销较大的操作时， 使用自定义``watch``会更有用。
-   使用 `watch` 选项允许执行异步操作 (访问一个 API)，限制执行操作的频率，并在得到最终结果前，设置中间状态。







# 全局API






## Vue.set( target, propertyName/index, value )

- **参数**：
  
    - `{Object | Array} target`
    - `{string | number} propertyName/index`
    - `{any} value`

- **返回值**：设置的值。

- **用法**：

    向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 this.myObject.newProperty = 'hi')

::: danger
注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。
:::

-   **示例**

```javascript
data() { // data数据
    return {
      arr: [1,2,3],
      obj:{
          a: 1,
          b: 2
      }
    };
  },
// 1、利用索引直接设置数组的某一项时， 数据更新 数组视图不更新 
this.arr[0] = 'OBKoro1';
this.arr.length = 1;
console.log(arr);  // ['OBKoro1'];
// 2、修改数组的长度时,  数据更新 对象视图不更新
this.obj.c = 'OBKoro1';
console.log(obj);  // {b:2,c:'OBKoro1'}
```

>   Vue 不能检测以上数组的变动，以及对象的添加/删除

-   **解决办法**

```javascript

this.$set(this.data, key, value);
Vue.set(target, key, value);
vm.$set(target, key, value);

// 数组原生方法触发视图更新
splice()、 push()、pop()、shift()、unshift()、sort()、reverse()
```

[从源码解析Vue.set和this.$set的区别](https://www.jb51.net/article/146580.htm)



## Vue.nextTick( [callback, context\] )

-   **参数**：

    -   `{Function} [callback]`
    -   `{Object} [context]`

-   **用法**：

    在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

    ```javascript
    // 修改数据
    vm.msg = 'Hello'
    // DOM 还没有更新
    Vue.nextTick(function () {
      // DOM 更新了
    })
    
    // 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
    Vue.nextTick()
      .then(function () {
        // DOM 更新了
      })
    ```

    >   2.1.0 起新增：如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise。请注意 Vue 不自带 Promise 的 polyfill.
    >
    >   如果目标浏览器不原生支持 Promise (IE：你们都看我干嘛)，需要提供 polyfill。
    >
    >   （hhh, 来自大佬的吐槽）

-   **示例**
    -   **问题**：swiper与vue结合使用时，会出现loop循环失效、dom渲染、顺序出错、自动循环失效等问题。
    -   **原因**：
        -   vue更新DOM时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。
        -   在页面加载初始时，网络请求的数据还没有加载完成，DOM也没有更新完成，此时swiper已初始化完成，导致swiper的有些属性并没有及时的绑定到全部的DOM上去。
    -   **解决办法**

```javascript
// swiper方法
var mySwiper = new Swiper('.swiper-container', {
    observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, // 修改swiper的父元素时，自动初始化swiper
})

// vue.nextTick
// 此时另一种最为有效的方法为在vue请求到数据更新完DOM后再进行swiper的初始化
var vm = new Vue({
    el: '#app',
    data: {},
    created() {
        axios.get().then((res) => {
            Vue.nextTick(function () { // 在下次 DOM 更新循环结束之后执行延迟回调
                window.initSwiper(); // 这时再初始化swiper
            })
            // 或者在组件内部可使用 vm.$nextTick(),this.$nextTick()
            // 因为它不需要全局 Vue，并且回调函数中的 this 将自动绑定到当前的 Vue 实例上
            // $nextTick 返回一个Promise对象，可使用async和await
        })
    },
    // ...
})

function initSwiper() {
     // swiper5
    new Swiper ('#swiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        observer: true, // 也需要加上observer
        observeParents: true // 也需要加上observeParents
    })
}
```
