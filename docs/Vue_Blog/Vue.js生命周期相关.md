# Vue的生命周期

[toc]

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