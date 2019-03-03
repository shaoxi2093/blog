# BFC特性

BFC全称”Block Formatting Context”, 中文为“块级格式化上下文”。BFC元素特性表现原则就是： 内部无论怎么样，都不会超出他的BFC，影响BFC外的元素。  

触发BFC条件：

- float的值不为none。
- overflow的值为auto,scroll或hidden。
- display的值为table-cell, table-caption, inline-block中的任何一个。
- position的值不为relative和static。