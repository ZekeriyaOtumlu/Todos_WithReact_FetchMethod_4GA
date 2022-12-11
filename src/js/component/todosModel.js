async function getallTodos(){
     await fetch('https://assets.breatheco.de/apis/fake/todos/user/zackO', {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json"
        },
})
    const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/zackO', {
        method: "GET",
        // body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json"
        }
})
const data = await response.json()
console.log(data);
// return data.map((todoInfo)=>{
//     return todoInfo.label

// })
return data;

}
async function updateTodos(abc) {
  // let apiTodos = updatedTodos.map((todoItem) => {
  //   return {
  //     label: todoItem,
  //     done: false
  //   }

  // })
   const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/zackO', {
        method: "PUT",
        // body: JSON.stringify(apiTodos),
        body: JSON.stringify(abc),
        headers: {
          "Content-Type": "application/json"
        },
})
console.log(response)

}

export {getallTodos, updateTodos};