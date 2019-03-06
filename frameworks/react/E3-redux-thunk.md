# redux-thunk

redux中间件，用于处理异步操作（副作用），即负责封装了以下dispatch的功能，使其支持action可以为一个function。

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

大致内容就是，当action为一个函数时，将`dispatch`、`getState`传给这个function。  

当我们要使用它来调用接口等异步操作时，需要创建两个action，和一个错误action

1. 发起时action
2. 成果回调action
3. 失败回调action