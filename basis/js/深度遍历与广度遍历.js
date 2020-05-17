var obj = {
  id: "1",
  name: "根",
  children: [
    {
      id: "1-1",
      name: "1级1",
      children: [
        {
          id: "1-1-1",
          name: "2级1"
        },
        {
          id: "1-1-1",
          name: "2级2",
          children: [
            {
              id: "1-1-2-1",
              name: "3级1"
            }
          ]
        },
        {
          id: "1-1-3",
          name: "2级3"
        }
      ]
    },
    {
      id: "1-2",
      name: "1级2",
      children: [
        {
          id: "1-2-1",
          name: "2级4",
          children: [
            {
              id: "1-1-2-1",
              name: "3级3"
            }
          ]
        },
        {
          id: "1-2-2",
          name: "2级3"
        }
      ]
    },
    {
      id: "1-3",
      name: "1级3"
    }
  ]
};

function deep(node) {
  const result = []
  result.push(node)

  if(Array.isArray(node.children)) {
    for(let i = 0; i < node.children.length; i++) {
      result.push(...deep(node.children[i]))
    }
  }
  return result
}

function scope(node) {
  const result = []
  const stack = []

  stack.push(node)
  while(stack.length) {
    const item = stack.shift()
    result.push(item)
    if(Array.isArray(item.children)) {
      stack.push(...item.children)
    }
  }
  return result
}

console.log('deep===>', deep(obj))
console.log('scope===>', scope(obj))
