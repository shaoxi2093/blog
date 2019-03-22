# Array

Array是js内置对象中的一员，表示数组数据结构。

<!-- TOC -->autoauto- [Array](#array)auto  - [Array方法](#array方法)auto    - [操作当前数组](#操作当前数组)auto      - [splice](#splice)auto      - [pop/push](#poppush)auto      - [shift/unshift](#shiftunshift)auto    - [返回新数组](#返回新数组)auto      - [map](#map)auto      - [concat](#concat)auto      - [filter](#filter)auto      - [slice](#slice)auto    - [其他不操作数组的方法](#其他不操作数组的方法)autoauto<!-- /TOC -->

## Array方法

Array在js中本身提供了很多很实用的方法，有些方法会改变当前数组，有些是返回新数组。

### 操作当前数组

#### splice

【操作当前数组】splice是数组操作的**增删改**功能，直接对原数组操作，返回是被删除的元素集合（数组）。

```js
Array.splice(index, length, addItem1, addItem2 ...)
```

#### pop/push

【操作当前数组】在数组末尾添加或者输出元素。

#### shift/unshift

【操作当前数组】在数组最前添加或者输出元素。

### 返回新数组

#### map

【返回新数组】map会对array里每个元素进行function操作，返回新的数组。

```js
Array.map(fn(item,index,arr))
```

#### concat

【返回新数组】合并数组。

```js
Array.concat(arr1,arr2...)
```

#### filter

【返回新数组】返回只满足条件的元素，行成新数组

#### slice

- 【返回新数组】截取数组里的一部分，返回新数组，不改变原数组。
  `slice(start,end)` 包不包括临界值如下`[start,end)`即包括开始，不包括结束下标
- 将类似数组的对象转化为真正的数组

  ```js
  Array.prototype.slice.call(arguments)
  ```

### 其他不操作数组的方法

1. every 当数组所有元素都满足条件时返回true
2. some 当数组有一个元素满足条件时返回true
3. find、findIndex
4. indexOf 返回需要查找元素的index下标
5. join 返回对每个元素之间添加join内的参数，如果没有参数，则用','分格
6. forEach遍历所有元素，参数是函数`fn(item, index, arr)`因为第三个参数是原数组，因此它也是可以做到改变原数组的
7. includes

