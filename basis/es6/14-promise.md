# Promise

手写一个Promise：  
先分析下Promise有哪些特征：
1. 三种状态`pending`、`resolve`、`reject`
2. then 方法
3. catch 方法

## 思路

1. 根据使用初始化整体结构

    ```js
    // 使用时new Promise((resolve, reject) => { //... }).then(v => { //... }).catch(err => { //... })
    function PromiseA (fn){
      fn(resolve, reject)
    }
    PromiseA.prototype.then = function (fn) {
      this.thenCb = fn
    }
    PromiseA.prototype.catch = function (fn) {
      this.errorCb = fn
    }
    ```

2. 初始化内部属性状态，以及状态变化

    ```js
    function PromiseA (fn){
      this.status = 'pending'
      this.value = undefined
      this.reason = undefined
      this.thenCb = function () {}
      this.errorCb = function () {}

      function resolve(value){
        if(this.status == 'pending'){
          this.status = 'resolve'
          this.value = value
        }
        this.thenCb(value)
      }
      function reject(reason){
        if(this.status == 'pending'){
          this.status = 'reject'
          this.reason = reason
        }
        this.errorCb(reason)
      }
      fn(resolve, reject)
    }
    ```

  - `resolve`传递当前promise的返回值，到`then`方法中，并改变当前promise状态+传递value到下个then
  - `reject`传递当前promise失败的原因，到`catch`方法中，因此需要改变状态+传递reason到catch
  

3. 修改resolve、reject方法获取this

    ```js
    function PromiseA (fn){
      this.status = 'pending'
      this.value = undefined
      this.reason = undefined
      this.thenCb = function () {}
      this.errorCb = function () {}

      this.resolve = (value) => {
        if(this.status == 'pending'){
          this.status = 'resolve'
          this.value = value
        }
        this.thenCb(value)
      }
      this.reject = (reason) => {
        if(this.status == 'pending'){
          this.status = 'reject'
          this.reason = reason
        }
        this.errorCb(reason)
      }
      fn(this.resolve, this.reject)
    }

    PromiseA.prototype.then = function (fn) {
      this.thenCb = fn
      return this
    }
    PromiseA.prototype.catch = function (fn) {
      this.errorCb = fn
      return this
    }

    new PromiseA((resolve, reject) => {
      setTimeout(function() {
        var rand = Math.random() * 3
        if(rand >= 2){
          resolve(`resolve ${rand}`)
        } else {
          reject(`reject ${rand}`)
        }
      }, 1000)
    }).then(value => {
      console.log(value)
    }).then(value2 => {
      console.log('then2', value2)
    }).catch(error => {
      console.log(error)
    })
    ```

4. `TODO` 第二个then方法应该执行，value2应该是前一个then方法返回的值，目前做的是覆盖方案。因此，`this.thenCb`应该是个数组，逐个执行，并且支持链式注册，因此`PromiseA.prototype.then`应该返回的也是个`PromiseA`

    ```js
    PromiseA.prototype.then = function(fn) {
      return 
    }
    ```
