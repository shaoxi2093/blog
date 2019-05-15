# React  
只是大概的总结下我所知道的react，原理和源代码之后分开成小文章总结。

## 特点
说到特点，首先就要看要拿它和谁比较了，和老牌的jquery那些比，还是和目前的其他两大前端框架angular、vue比。  
撇开当前新版本（v16.x）的那些更新点先不说，总体概括下React相对于老牌框架们的特点：  
1. 组件化
2. jsx写法
3. 所有页面变动由框架操作，开发者只需控制和关心data的变化
4. virtual dom 在页面更新过程中起到的重大性能作用

### 组件化Components
组件化最大的特点，就是在UI和公共业务逻辑代码的复用性和可维护性。  

三种方式的组件创建方式和区别：  
1. 函数定义式 无状态组件
2. es5原生方式`React.CreateClass`
3. ES6的`extends React.Component`

后两种属于功能式，第一种属于函数式。
- 函数式：无状态state、无生命周期，无this。适合那种无需考虑复杂交互、更新的UI展示组件。例如：  
```
function Item(props) {
  return (
    <div className='item'>
      {props.title}
      <span
        className='deleteItem'
        onClick={props.remove(props.id)}
      > x </span>
    </div>
  )
}
```
- 功能式：有state、生命周期。  
功能式组件，目前需要提到`React.PureComponent`和`React.Component`，当props或者state改变时，PureComponent将对props和state进行浅比较。另一方面，Component不会比较当前和下个状态的props和state。因此，每当shouldComponentUpdate被调用时，组件默认的会重新渲染。简单来说，PureComponent通过更新时props和state的浅比较优化了不必要的重新渲染。  

### jsx语法
Javascript和XML结合的一种格式写法。利用HTML语法来创建虚拟DOM。当遇到<，JSX就当HTML解析，遇到{就当JavaScript解析。  
因此我们就可以将一段html当作一个对象赋值给某个变量。但前提是，必须只能有一个根节点，如下：  
补充：v16.x中render() 开始支持返回 Arrays
```
const testUl =(
  <ul className="my-list">
    <li>First Text Content</li>
    <li>Second Text Content</li>
  </ul>
)
```
> 这里的个人理解，应该是后续的jsx-loader或者babel-loader对jsx写法进行了转换，转换成创建dom节点后，赋值dom对象给变量，并不是真正的将html赋值。  

### 不再直接接触真实dom
所有展示、更新，甚至大半的渲染优化都交给框架考虑，开发者只需关心data的变化。

### virtual dom
virtual dom就是一个js的对象，内容其实就是真实dom树抽象化后的js对象树。当然，virtual dom先生成，真实dom后，这里不是说真正的从真实dom抽象出来。  
#### 为什么要有这个
为了能统一快速定位到dom树中需要更新的地方。  
#### 为什么会更快
首先，它==有时==（后面解释）并不会比你直接更新dom更快，因为他还有生成新virtual dom和对比的diff过程。常听见的更快应该是和其他框架层直接操作真实dom的框架做对比的。  
但是，当你页面中同时有n个地方需要更新的时候：  
对于传统框架如jq，你需要找到该节点，然后更新，不提性能，性能还是你直接操作dom更快。  
缺点：
1. 对于开发者来说，找到和认识dom，然后操作它，需要人力和时间成本降低开发效率。
2. 多处的操作dom代码代码重复度高、可维护性差、开发者编写出错的概率也会提升（例如变更dom时选错节点等）

此时如果将所有变更真实的dom都交给框架：  
优点：
1. 少写了很多dom操作那块的代码
2. 代码可读性和可维护性提高  

通过构建virtual dom，当数据更新后，生成新的virtualdom再和之前的进行对比后，将差异部分进行变更。
缺点：  
性能上有限的降低。  

此时，作为开发者会怎么选择？框架从来都不是为了用户来创建的，而是为了它的使用者也就是开发者来创建的。统一规范了代码，增加了代码可维护性，最重要的是少写了重复代码增加了开发效率，在损失可以接受，甚至可以无视的情况下，框架才展现出它真正的价值。  

---
...扯远了，拉回来。  
virtual dom是对js代码的对象树进行操作，因此会比如angular1.x稍快。  

上面提到的==有时==，其实要结合实际情况的dom操作和react 操作，根据页面变更时的重绘和重排情况来说。例如：  
当变更后，父子节点都要变更，且都会引起重排，操作真实dom时，如果一个个变更，就会引发浏览器两次重排，而最佳的情况是，一次性直接替换掉父子引发一次重排。







## 过去、如今、未来
### v15.x
目前github发布稳定版本最新已经到了v16.7.0，老实说，目前本菜鸟使用最多的还是v15的内容，比如生命周期...大部分新功能也只处于远观和demo阶段。  

#### 生命周期
- 创建阶段：  
getDeFaultProps-->getInitialState-->componentWillMount-->render-->componentDidMount  
- 更新阶段：  
props有更新  
componentWillReceiveProps-->shouldComponentUpdate-->componentWillUpdate-->render-->componentDidUpdate  
仅state更新  
shouldComponentUpdate-->componentWillUpdate-->render-->componentDidUpdate  
- 销毁阶段：
componentWillUnMount-->销毁  

#### setState()更新组件
- 异步机制  
背景：setState同步re-render机制会引发多次re-render导致较差的性能体验，例如当父子组件，同时存在点击事件，触发setState，不希望事件冒泡，子组件re-render后，父组件setState后，props传递给子组件后，第二次渲染。==因此，setState与re-render是异步设计。==  用来在父子组件都更新完毕后，统一更新到真实dom上。

1. 因为上述背景，所以异步的re-render，如果搭配同步的setState，会导致，父组件的state更新完毕后，子组件的props不能同步更新，导致内部同一数据，却不一致的情况。
2. 方便构建事务机制，批量更新组件
3. 今后并行更新组件
4.   

异步机制：  
```setState```调用过程中有两件主要操作：  
1. 调用```enqueueSetState```，将partialState添加到```_pendingStateQueue```队列中，然后执行```enqueueUpdate```方法。
2. 如果存在callback就调用```enqueueCallback```存储进入一个```_pendingCallback```队列中。  
  

- 事务机制（批量更新）：
1. ReactDOM.render()后，会执行一个``_renderNewRootComponent``方法，isBatchingUpdates=false
2. 上述方法中执行``ReactUpdates.batchedUpdates()``,初始化事务实例，transaction.perform(method)，它是ReactDefaultBatchingStrategyTransaction的实例。
3. 初始化ComponentDidMount
4. 调用setState方法
5. 初始化异步机制，如上述，isBatchingUpdates=true
6. 事务结束后，即method后，按照[FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES]依次调用其close方法，先结束当前事务，再重制事务isBatchingUpdates=false
7. 此时数据已经更新，可以打印
7. enqueueUpdate涉及的组件加入dirtyComponents中
8. diff算法
9. 渲染

#### react的diff算法
高性能的diff算法，是react的一大优势，如果diff的复杂度高，当遇到大规模dom更新的情况下，会引发很严重的对比性能问题。  
- React的diff策略
1. 策略一：忽略Web UI中DOM节点跨层级移动，tree diff；  
React 只会简单的考虑同层级节点的位置变换，而对于不同层级的节点，只有创建和删除操作。当出现节点跨层级移动时，并不会出现想象中的移动操作，而是以 A 为根节点的树被整个重新创建，这是一种影响 React 性能的操作，因此 React 官方建议不要进行 DOM 节点跨层级的操作。
2. 策略二：拥有相同类型的两个组件产生的DOM结构也是相似的，不同类型的两个组件产生的DOM结构则不近相同，component diff  
子结构类似的组件，如果出现交换，react会直接替换整个组件，不会对比其子结构，比如A组件和B组件都有表格和检索区，如果交换组件时，react会直接销毁A，然后再创建B，并不会根据AB除表格和检索区外其他地方的差异点进行对比更新，因此创建组件要存异。
3. 策略三：对于同一层级的一组子节点，通过分配唯一唯一id进行区分（key值），element diff

### v16.x
v16已经出来有一年多了，最主要的更新内容我觉得就是Concurrent Render了。  

1. Concurrent Render  
    - Time Slicing(Fiber)  
将整个渲染过程分为两个阶段：render/reconciliation（包括到componentWillUpdate之前的所有生命周期）和commit，前一个可中断，后一个不可中断  
时间切片主要对第一阶段进行优化。通过浏览器接口requestIdelCallback利用空闲时间进行。
    - Suspense  
字面意思悬起，暂停当前组件的渲染, 当完成某件事以后再继续渲染。  
主要是对一些IO过程的时间优化。

```js
// fiber
Fiber = {
      tag: TypeOfWork, // fiber的类型，参考最后的tag类型
      alternate: Fiber|null, // 在fiber更新时克隆出的镜像fiber，对fiber的修改会标记在这个fiber上,相当于workInProgress
      return: Fiber|null, // 指向fiber树中的父节点
      child: Fiber|null, // 指向第一个子节点
      sibling: Fiber|null, // 指向兄弟节点
  }
```

```js
// suspense demo
import React, { lazy, Suspense } from 'react'
const OtherComponent = lazy(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <OtherComponent />
    </Suspense>
  )
}
```

2. render 新增的返回类型，如数组
3. 新的生命周期（16.3） 
    - `getDerivedStateFromProps(nextProps, prevState)`: 更加语义化, 用来替代 componentWillMount() 和 componentWillReceiveProps(nextProps);

    - `getSnapshotBeforeUpdate(prevProps, prevState)`: 可以将该钩子返回的结果传入 componentDidUpdate 的第三个参数中, 从而达到 dom 数据统一。用来替代 componentWillUpdate();
4. componentDidCatch  
componentDidCatch(error, errorInfo), 组件的捕错钩子，防止页面报错崩溃
5. hooks  

#### hooks

hooks为什么会出现，就要说到目前react使用上的几个问题，Reusing logic、Giant Components、Confusing Classes，也是几个痛点：

1. 高阶组件使用和context的使用，导致的无限嵌套Wrapper hell
2. 生命周期中componentDidMount、componentWillReceiveProps做的同样的数据获取操作，以及前后添加监听和销毁监听
3. 无状态组件和Class component的使用问题

对于Reusing logic，通常采用的有两种方法：  

- Higher-order components
- Render props  



## react展开
### 展开
1. virtual dom
2. jsx
3. 组件化
4. 生命周期
5. diff算法
6. re-render
7. 事件监听
8. render props和hoc


### 扩展  

1. redux
2. react-router
3. redux-thunk/redux-saga
4. immutable
5. fiber
6. hooks