# Vue Router

Vue Router 是 [Vue.js](http://cn.vuejs.org/) 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。

[toc]

[参考来源：Vue Router官方文档](https://router.vuejs.org/zh/)



## API



### 路由对象

一个**路由对象 (route object)** 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的**路由记录 (route records)**。

路由对象是不可变 (immutable) 的，每次成功的导航后都会产生一个新的对象。

路由对象出现在多个地方:

-   在组件内，即 `this.$route`

-   在 `$route` 观察者回调内

-   `router.match(location)` 的返回值

-   导航守卫的参数：

    ```js
    router.beforeEach((to, from, next) => {
      // `to` 和 `from` 都是路由对象
    })
    ```

-   `scrollBehavior` 方法的参数:

    ```js
    const router = new VueRouter({
      scrollBehavior(to, from, savedPosition) {
        // `to` 和 `from` 都是路由对象
      }
    })
    ```



### 路由对象属性

-   **$route.path**

    -   类型: `string`

        字符串，对应当前路由的路径，总是解析为绝对路径，如 `"/foo/bar"`。

-   **$route.params**

    -   类型: `Object`

        一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。

-   **$route.query**

    -   类型: `Object`

        一个 key/value 对象，表示 URL 查询参数。例如，对于路径 `/foo?user=1`，则有 `$route.query.user == 1`，如果没有查询参数，则是个空对象。

-   **$route.hash**

    -   类型: `string`

        当前路由的 hash 值 (带 `#`) ，如果没有 hash 值，则为空字符串。

-   **$route.fullPath**

    -   类型: `string`

        完成解析后的 URL，包含查询参数和 hash 的完整路径。

-   **$route.matched**

    -   类型: `Array`

    一个数组，包含当前路由的所有嵌套路径片段的**路由记录** 。路由记录就是 `routes` 配置数组中的对象副本 (还有在 `children` 数组)。

    ```js
    const router = new VueRouter({
      routes: [
        // 下面的对象就是路由记录
        {
          path: '/foo',
          component: Foo,
          children: [
            // 这也是个路由记录
            { path: 'bar', component: Bar }
          ]
        }
      ]
    })
    ```

    当 URL 为 `/foo/bar`，`$route.matched` 将会是一个包含从上到下的所有对象 (副本)。

-   **$route.name**

    当前路由的名称，如果有的话。(查看[命名路由](https://router.vuejs.org/zh/guide/essentials/named-routes.html))

-   **$route.redirectedFrom**

    如果存在重定向，即为重定向来源的路由的名字。(参阅[重定向和别名](https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html)）



### 组件注入

- 注入的属性

通过在 Vue 根实例的 `router` 配置传入 router 实例，下面这些属性成员会被注入到每个子组件。

-   **this.$router**

    router 实例。

-   **this.$route**

    当前激活的[路由信息对象](https://router.vuejs.org/zh/api/#路由对象)。这个属性是只读的，里面的属性是 immutable (不可变) 的，不过你可以 watch (监测变化) 它。









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

    文件结构如下图： ![img](C:/Users/NiuYu/Desktop/Vue_img/vuerouter_1.png)

2.  `main.js` 文件

```javascript
// 项目核心文件
import Vue from 'vue'
import App from './App'

// 引入router文件夹
import router from './router'

Vue.config.productionTip = false

// eslint-disable no-new
new Vue({
    el: '#app',
    // 将router标识出来
    router,
    
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



## 监听路由变化

```javascript
let vm = new Vue({ // 监听路由变化
    el: "#app",
    data: {},
    router,
    watch: {
        '$route.path': function (to, from) {
        // to , from 分别表示从哪跳转到哪，都是一个对象
        // to.path  ( 表示的是要跳转到的路由的地址 eg: /home );
        }
    }
})
```



## 动态路由匹配



### 动态路径参数

```javascript
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
// 一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
```



### 多段路径参数

```javascript
const router = new VueRouter({
  routes: [
    // 多段路径参数
    { path: '/user/:username/post/:post_id',
      name: 'user', // 命名路由
      component: User,
    }
  ]
});

// 编程式导航
router.push({ name: 'user', params: { username: 'Gary', post_id: '001' }});

// 最终路由导航至 '/user/Gary/post/001'
// PS: 如果提供了path而不是name，params会被忽略
```





## 编程式导航

**在 Vue 实例内部，你可以通过 `this.$router` 访问路由实例。**

>   声明式：`<router-link :to="...">`

### router实例方法

>   Vue Router 的导航方法 (`push`、 `replace`、 `go`) 在各类路由模式 (`history`、 `hash` 和 `abstract`) 下表现一致。

```javascript
// 向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
router.push(location, onComplete?, onAbort?)
router.push(location).then(onComplete).catch(onAbort)

// 在 history 栈中替换掉当前的记录。
router.replace(location, onComplete?, onAbort?)
router.replace(location).then(onComplete).catch(onAbort)

// 参数是一个整数，在 history 记录中向前或者后退多少步，类似 window.history.go(n)。
// n > 0, 在浏览器记录中前进一步，等同于 history.forward()
// n < 0, 在浏览器记录中后退一步，等同于 history.back()
// 如果 history 记录不够用，就失败
router.go(n)
```



### 关于router.push和router-link 组件的 `to` 属性

```javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

**注意：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path`：**

```javascript
const userId = '123'
// 可以通过名称来标识一个路由，在创建Router实例时，在routes配置中给某个路由设置名称。
// 使用以下两种方式来添加 params
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 以下的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

>   在 3.1.0+，可以省略第二个和第三个参数，此时如果支持 Promise，`router.push` 或 `router.replace` 将返回一个 Promise。
>
>   如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 `/users/1` =》`/users/2`)，你需要使用 [`beforeRouteUpdate`](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化) 来响应这个变化 (比如抓取用户信息)。





## 命名视图

-  (同级) 展示多个视图，而不是嵌套展示.

-   例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。
-   如果 `router-view` 没有设置名字，那么默认为 `default`。

-   一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 s)：

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

-   嵌套命名视图

    使用命名视图创建嵌套视图的复杂布局。这时你也需要命名用到的嵌套 `router-view` 组件。



## 重定向和别名

- 重定向

    ```javascript
    const router = new VueRouter({
    	routes: [
            // 通过 routes 配置来完成
            { path: '/a', redirect: '/b' },
            // 命名的路由
            { path: '/a', redirect: { name: 'foo' }},
            // 动态返回重定向目标
    		{ path: '/a', redirect: to => {
              // 方法接收 目标路由 作为参数
              // return 重定向的 字符串路径/路径对象
            }}
        ]
    })
    ```

    

- 别名

    /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。

    上面对应的路由配置为：

    ```javascript
    const router = new VueRouter({
      routes: [
        { path: '/a', component: A, alias: '/b' }
      ]
    })
    
    ```

    “别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。



## 路由组件传参



### 组件和路由解耦

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

使用 `props` 将组件和路由解耦：

**取代与 `$route` 的耦合**

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

**通过 `props` 解耦**

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试。



### 布尔模式

如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性。

### 对象模式

如果 `props` 是一个对象，它会被按原样设置为组件属性。当 `props` 是静态的时候有用。

```js
const router = new VueRouter({
  routes: [
    { path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }
  ]
})
```

### 函数模式

你可以创建一个函数返回 `props`。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

```js
const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
  ]
})
```

URL `/search?q=vue` 会将 `{query: 'vue'}` 作为属性传递给 `SearchUser` 组件。

请尽可能保持 `props` 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 `props`，请使用包装组件，这样 Vue 才可以对状态变化做出反应。




```vue
import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './Hello.vue'

Vue.use(VueRouter)

function dynamicPropsFn (route) {
  const now = new Date()
  return {
    name: (now.getFullYear() + parseInt(route.params.years)) + '!'
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
	// No props, no nothing
    { path: '/', component: Hello }, 

	 // Pass route.params to props
    { path: '/hello/:name', component: Hello, props: true },

	// static values
    { path: '/static', component: Hello, props: { name: 'world' }},

	// route和props之间映射的自定义fucntion
    { path: '/dynamic/:years', component: Hello, props: dynamicPropsFn },

    { path: '/attrs', component: Hello, props: { name: 'attrs' }}
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Route props</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/hello/you">/hello/you</router-link></li>
        <li><router-link to="/static">/static</router-link></li>
        <li><router-link to="/dynamic/1">/dynamic/1</router-link></li>
        <li><router-link to="/attrs">/attrs</router-link></li>
      </ul>
      <router-view class="view" foo="123"></router-view>
    </div>
  `
}).$mount('#app')
```







## 导航守卫

`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

-   **参数或查询的改变并不会触发进入/离开的导航守卫**。

-   可以通过[观察 `$route` 对象](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化)来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。



### router.beforeEach (全局前置守卫)

-   使用 `router.beforeEach` 注册一个全局前置守卫：

```javascript
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

-   当一个导航触发时，全局前置守卫按照创建顺序调用。**守卫是异步解析执行**，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

每个守卫方法接收三个参数：

-   **`to: Route`**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#路由对象)
-   **`from: Route`**: 当前导航正要离开的路由
-   **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
    -   **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
    -   **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
    -   **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
    -   **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。

-   **确保要调用 `next` 方法，否则钩子就不会被 resolved。**



### router.beforeResolve(全局解析守卫)

和 `router.beforeEach` 类似，区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。

### router.afterEach(全局后置钩子)

- 不会接受 next 函数
- 不会改变导航本身.

### 路由独享守卫

可以在路由配置上直接定义 beforeEnter 守卫：
```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
这些守卫与全局前置守卫的方法参数是一样的。

### 组件内的守卫

可以在路由组件内直接定义以下路由导航守卫：
- beforeRouteEnter
- beforeRouteUpdate
- beforeRouteLeave

```javascript
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // 可以通过传一个回调给 next来访问组件实例。
    // 在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
    //  ***注意 beforeRouteEnter 是支持给 next 传递回调的唯一守卫。***
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

```javascript
// 不支持传递回调
// 'this' 可用
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```

```javascript
// 离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```



### 完整的导航解析流程

1.  导航被触发。
2.  在失活的组件里调用离开守卫。
3.  调用全局的 `beforeEach` 守卫。
4.  在重用的组件里调用 `beforeRouteUpdate` 守卫。
5.  在路由配置里调用 `beforeEnter`。
6.  解析异步路由组件。
7.  在被激活的组件里调用 `beforeRouteEnter`。
8.  调用全局的 `beforeResolve` 守卫 。
9.  导航被确认。
10.  调用全局的 `afterEach` 钩子。
11.  触发 DOM 更新。
12.  用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。





## 路由元信息

**定义路由的时候可以配置 `meta` 字段：**

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

-   `routes` 配置中的每个路由对象为 **路由记录**。
-   路由记录可以是嵌套的，因此当一个路由匹配成功后，他可能匹配多个路由记录。例如：`/foo/bar` 这个 URL 将会匹配父路由记录以及子路由记录。

TODO

-   一个路由匹配到的所有路由记录会暴露为 `$route` 对象 (还有在导航守卫中的路由对象) 的 `$route.matched` 数组。因此，我们需要遍历 `$route.matched` 来检查路由记录中的 `meta` 字段。

下面例子展示在全局导航守卫中检查元字段：

```javascript
router.beforeEach((to, from, next) => {
    // Array.some()
    // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
	// some() 方法会依次执行数组的每个元素：
	// 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
	// 如果没有满足条件的元素，则返回false。
	// 注意： some() 不会对空数组进行检测。some() 不会改变原始数组。
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```



## 路由过度动效

可以用 `transition` 组件给它添加一些过渡效果：

```html
const Foo = {
  template: `
    <transition name="slide">
      <div class="foo">...</div>
    </transition>
  `
}
```

[Transition 的所有功能](https://cn.vuejs.org/guide/transitions.html) 在这里同样适用



## 数据获取

1.  导航完成前获取数据，在created里获取



2.  导航完成后获取数据，在接下来的组件的 `beforeRouteEnter` 守卫中获取数据，当数据获取成功后只调用 `next` 方法。

```js
export default {
  data () {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }
}
```



## 路由懒加载

TODO

将异步组件和 webpack 的 code-splitting 功能一起配合使用：

###  VUE异步组件

VUE允许以一个`Promise`的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身) 的方式定义组件，该工厂函数会异步解析组件定义。vue只有在该组件被需要渲染的时候才会触发该工厂函数，把结果缓存起来供未来重渲染。

```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: '/support-system/dist',
	routes: [{
        path: '/',
        // 路由懒加载
        // const Foo = () => Promise.resolve({ /* 组件定义对象 */ })
        // require 使 webpack 自动将你的构建代码分成多个包，这些包会通过Ajax请求加载
        component: resolve => require(['../views/login'], resolve),
	}]
})

// 异步组件工厂函数也可以返回一个对象
const AsyncComponent = () => ({
    // 需要加载的组件(应该是一个'Promise'对象)
    component: import('./MyComponent.vue'),
    // 异步组件加载时使用的组件
    loading: LoadingComponent,
    // 加载失败时使用的组件
    error: ErrorComponent,
    // 展示加载时组件的延时(ms)
    delay: 200,
    // 如果提供了超时时间且组件加载也超时了。
    // 则使用加载失败时使用的组件。
    // 默认值是：'Infinity'
    timeout: 3000
})
```

### [webpack 代码分离code-splitting](https://www.webpackjs.com/guides/code-splitting/)

-   可以使用动态 import语法来定义代码分块点 (split point)
-   常用的代码分离的三种方式
    1.  入口起点（entry points）: 使用 [`entry`](https://www.webpackjs.com/configuration/entry-context) 配置手动地分离代码。（虽然简单直观，但是不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来）
    2.  防止重复(prevent duplication)：使用 [`CommonsChunkPlugin`](https://www.webpackjs.com/plugins/commons-chunk-plugin) 去重和分离 chunk。
    3.  动态导入(dynamic imports)：通过模块的内联函数调用来分离代码。
        1.  优先选择的方式是，使用符合 [ECMAScript 提案](https://github.com/tc39/proposal-dynamic-import) 的 [`import()` 语法](https://www.webpackjs.com/api/module-methods#import-)。
        2.  使用 webpack 特定的 [`require.ensure`](https://www.webpackjs.com/api/module-methods#require-ensure)

```javascript
const Foo = () => import('./Foo.vue');

const router = new VueRouter({
    routes: [
        { path: '/foo', component: Foo }
    ]
})
```



### 把组件按组分块

只需要使用 [命名 chunk](https://webpack.js.org/guides/code-splitting-require/#chunkname)，一个特殊的注释语法来提供 chunk name

```javascript
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。