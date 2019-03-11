# BFC特性

BFC全称”Block Formatting Context”, 中文为“块级格式化上下文”。BFC元素特性表现原则就是： 内部无论怎么样，都不会超出他的BFC，影响BFC外的元素。  

触发BFC条件：

- float的值不为none。
- overflow的值为auto,scroll或hidden。
- display的值为table-cell, table-caption, inline-block中的任何一个。
- position的值不为relative和static。

## BFC能解决的常见问题

1. 外边距折叠问题

    ```html
    <style>
    .container {
      background-color: red;
      overflow: hidden; /* creates a block formatting context */
    }
    p {
      margin: 10px 0;
      background-color: lightgreen;
    }
    .newBFC {
      overflow: hidden;  /* creates new block formatting context */
    }
    </style>
    <!-- ... -->
    <div class="container">
      <p>Sibling 1</p>
      <p>Sibling 2</p>
      <div class="newBFC">
          <p>Sibling 3</p>
      </div>
    </div>
    ```

2. 浮动元素撑不开父元素的问题

   ```html
   <style>
   .container {
      overflow: hidden; /* creates block formatting context */
      background-color: green;
    }
    .container div {
      float: left;
      background-color: lightgreen;
      margin: 10px;
    }
   </style>
   <div class="container">
     <div>Sibling</div>
     <div>Sibling</div>
   </div>
   ```

3. 去除文字环绕效果问题
4. 多列布局column下沉问题

   ```html
   <style>
   .column {
      width: 31.33%;
      background-color: green;
      float: left;
      margin: 0 1%;
    }
    /*  Establishing a new block formatting
        context in the last column */
    .column:last-child {
      float: none;
      overflow: hidden;
    }
   </style>
   <div class="container">
     <div class="column">column 1</div>
     <div class="column">column 2</div>
     <div class="column">column 3</div>
   </div>
   ```