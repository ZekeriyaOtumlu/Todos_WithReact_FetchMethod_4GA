import React, { useEffect } from "react";
import { useState } from "react";

//include images into your bundle
// import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
/*h1 = todos

div =
input
a list (ul)
  list items of todos (li)
	 text (p, label, whatver)
	 a button to delete
	 */

const localStorageKey = "Todos_key"
const Home = () => {
	const [Todos, setTodos] = useState(["a","b","c"]);
	const [inputValue, setInputValue] = useState("");
	const [previousToDo, setPreviousToDo] =useState(Todos);

	useEffect(()=>{
		console.log("Run it")
		console.log(localStorage.getItem(localStorageKey))
		let localStorageTodos =JSON.parse(localStorage.getItem(localStorageKey));
		setTodos(localStorageTodos);
		setPreviousToDo(localStorageTodos);

	}, []);

	useEffect(()=>{
		console.log("Everytime To do changes")
		console.log(JSON.stringify(Todos))
		localStorage.setItem(localStorageKey, JSON.stringify(Todos))

	}, [Todos.length]);

let onType=((event) =>{
	console.log(event)
	if(event.key == 'Enter'){
		let newTodos= [...Todos];
				newTodos.push(event.target.value);
				setTodos(newTodos);
				setPreviousToDo(Todos)
				//clear input event.target.value
				event.target.value="";


	} else{
		setInputValue(event.target.value);
		console.log(event);
	}

})
	return (
		<div className="text-center">
			<h1>Todo List</h1>
			<div>
				<input onKeyUp={onType} placeholder="Enter Todo"/>
				<ul>
					{Todos.map((todo, index)=>{
						return (<li key={index}>
							<p>{todo}</p>
							<button onClick={()=>{
								let newTodos= [...Todos];
								newTodos.splice(index, 1);
								setTodos(newTodos);
								setPreviousToDo(Todos)
							}}>X</button>
						</li>)
					})}
				
				</ul>

			</div>
			<p>
				{Todos.length} item(s) in the List 
				<button onClick={()=>{
								setTodos([]);
								setPreviousToDo(Todos);
							}}>Erase Todo</button>

						 
			</p>
			<button onClick={()=>{
								// setTodos([]);
								setTodos(previousToDo);
							}}>Undo</button>	
			
		</div>
	);
};

export default Home;
