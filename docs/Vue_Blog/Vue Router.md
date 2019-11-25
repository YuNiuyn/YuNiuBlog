[toc]

# Vue Router

Vue Router 是 [Vue.js](http://cn.vuejs.org/) 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。

## Vue Router 模块化路由配置

### HTML

```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/child">Go to child</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```



### js

1.  项目根目录下，`src` 文件夹，`router` 文件夹下，建立`routes.js` 文件。

    文件结构如下图： ![img](./Vue_img/vuerouter_1.png)

2.  `main.js` 文件

```javascript
// 项目核心文件
import Vue from 'vue'
import App from './App'

// ********* 引入router文件夹 **************
import router from './router'
// ***************************************

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    // ****** 将router标识出来 *****
    router,
    // ***************************
    components: { App },
    template: '<App/>'
})
```

3.  `router` 文件夹下 `index.js` ：

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter) // 模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history' // H5 history模式
})

export default router
```

4.  `routes.js` 文件：

```javascript
// 引入 vue 组件
import HelloWorld from '@/components/HelloWorld'
// 示例
export default [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
        children: [
            {
                path: '/child',
                name: 'child',
                component: () => import('@/components/child')
            }
        ]
    }
]
```





通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由。



## HTML5 history模式

[官方文档-H5 history模式]( https://router.vuejs.org/zh/guide/essentials/history-mode.html )

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的 **history 模式**，这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面，而URL 就像正常的 url，例如 `http://yoursite.com/user/id`。

因为我们的应用是个单页客户端应用，所以需要后台正确的配置支持。否则容易404.

所以要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 `index.html` 页面，这个页面就是 app 依赖的页面。