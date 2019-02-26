# redux

Redux 是 JavaScript 状态容器，提供可预测化的状态管理，因为严格的单向数据流是 Redux 架构的设计核心。它并不是专属react的，还可以通过一些中间层连接后，和其他前端框架一起使用，例如

- [react-redux](https://github.com/gaearon/react-redux)
- `ng-redux`、[ng2-redux](https://github.com/wbuchwalter/ng2-redux)
- [backbone-redux](https://github.com/redbooth/backbone-redux)
- ...

## redux的三大原则  

1. 单一数据源
2. State是只读的
3. 使用纯函数来执行修改

## 三个组成部分

1. Action，把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 `store` 的有效载荷。它是 `store` 数据的唯一来源。
2. Reducer指定了应用状态的变化如何响应 `actions` 并发送到 `store` 的，而 `actions` 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。
3. Store， `action` 来描述“发生了什么”，和使用 `reducers` 来根据 `action` 更新 state 的用法。`Store` 就是把它们联系到一起的对象。
   - 维持应用的 state
   - 提供 getState() 方法获取 state
   - 提供 dispatch(action) 方法更新 state
   - 通过 subscribe(listener) 注册监听器
   - 通过 subscribe(listener) 返回的函数注销监听器

> Redux 应用只有一个单一的 store 创建一次`createStore()`。当需要拆分数据处理逻辑时，你应该使用 reducer 组合`combineReducers()` 而不是创建多个 store。
  
## redux数据流（工作流）原理

Redux 应用中数据的生命周期遵循下面 4 个步骤：  

1. 调用 store.dispatch(action)，如下：

   ```js
   store.dispatch({ type: 'ADD_TODO', text: 'Read the Redux docs.' })
   ```

2. Redux store 调用传入的 reducer 函数  
   Store 会把两个参数传入 reducer： 当前的 state 树和 action。reducer 是纯函数。它仅仅用于计算下一个 state。它应该是完全可预测的：多次传入相同的输入必须产生相同的输出。它不应做有副作用的操作，如 API 调用或路由跳转。这些应该在 dispatch action 前发生(异步处理方案 redux-thunk、redux-saga等)。

   ```js
   const addApp = (state, action) => {
     switch (action) {
       case "ADD_TODO":
       return {
         ...state,
         todoList: [...state.todoList, action.text]
       }
       default:
       return state
     }
   }
   ```

3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树
4. Redux store 保存了根 reducer 返回的完整 state 树

## Demo

### 创建store

1. 普通创建  

    ```jsx
    import React from 'react'
    import { render } from 'react-dom'
    import { Provider } from 'react-redux'
    import { createStore } from 'redux'
    import todoApp from './reducers'
    import App from './components/App'

    let store = createStore(todoApp)

    render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    )
    ```

2. 加入redux中间件创建  
   `applyMiddleware(...middlewares)`返回值是一个函数(Function) ，一个应用了 middleware 后的 store enhancer。这个 store enhancer 的签名是 createStore => createStore，但是最简单的使用方法就是直接作为最后一个 enhancer 参数传递给 createStore() 函数。

   ```jsx
   import React from 'react'
   import { render } from 'react-dom'
   import { Provider } from 'react-redux'
   import { createStore, applyMiddleware } from 'redux'
   import createLogger from 'redux-logger'
   import thunkMiddleware from 'redux-thunk'
   import todoApp from './reducers'
   import App from './components/App'

   const createStoreWithMiddleware = applyMiddleware(
     thunkMiddleware,
     createLogger(),
     // 其他中间件。。。如react-router-redux等
   )(createStore)
   let store = createStoreWithMiddleware(todoApp)

   /*或者这么用
   let store = createStore(todoApp, applyMiddleware(
     thunkMiddleware,
     createLogger(),
     // 其他中间件。。。如react-router-redux等
   ))
   */

   render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById('root')
   )
   ```

### 创建actions

### 创建reducers && 合并reducers

### 组件中使用

由于组件中使用时，使用context传递，因此，需要做格式校验，如下：  

```js
import PropTypes from 'prop-types'

ChildComponent.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
}
```

---
参考文章：  
《[redux中文官网](https://www.redux.org.cn/docs)》