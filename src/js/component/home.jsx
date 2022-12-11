import React, { useEffect } from "react";
import { useState } from "react";
import { getallTodos, updateTodos } from "../component/todosModel";

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

const localStorageKey = "Todos_key";
const Home = () => {
  const [Todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [previousToDo, setPreviousToDo] = useState(Todos);

  useEffect(async () => {
    console.log("Run it");
    console.log(localStorage.getItem(localStorageKey));
    // let localStorageTodos =JSON.parse(localStorage.getItem(localStorageKey));
    // setTodos(localStorageTodos);
    // setPreviousToDo(localStorageTodos);
    let apiTodos = await getallTodos();
    setTodos(apiTodos);
    setPreviousToDo(apiTodos);
  }, []);

  useEffect(async () => {
    console.log("Everytime To do changes");
    console.log(JSON.stringify(Todos));
    // localStorage.setItem(localStorageKey, JSON.stringify(Todos))
    let apiUpdatesTodos = await updateTodos(Todos);
  }, [Todos]);

  let onType = (event) => {
    console.log(event);
    if (event.key == "Enter") {
      let newTodos = [...Todos];
      newTodos.push({ label: event.target.value, done: true });
      setTodos(newTodos);
      setPreviousToDo(Todos);
      //clear input event.target.value
      event.target.value = "";
    } else {
      setInputValue(event.target.value);
      console.log(event);
    }
  };
  return (
    <div className="todo-container">
      <h1 className="todo-title">Todos</h1>
      <div className="todo-input-container">
        <input
          className="todo-input"
          onKeyUp={onType}
          placeholder="Enter Todo"
        />
      </div>
      <ul className="todo-ul">
        {Todos.map((todo, index) => {
          return (
            <li className="todo-item" key={index}>
              <input
                className="todo-checkbox"
                type="checkbox"
                checked={todo.done}
                onChange={() => {
                  let newTodos = [...Todos];
                  newTodos[index].done = !todo.done;
                  setTodos(newTodos);
                  setPreviousToDo(Todos);
                }}
              />
              <p className="todo-label">{todo.label}</p>
              {/* <p>{todo.done + ""}</p> */}
              <button
                className="todo-delete-item"
                onClick={() => {
                  let newTodos = [...Todos];
                  newTodos.splice(index, 1);
                  setTodos(newTodos);
                  setPreviousToDo(Todos);
                }}
              >
                🗑️
              </button>
            </li>
          );
        })}
      </ul>
      <div className="todo-footer">
        <p className="todo-items-left">{Todos.length} item(s) left</p>
        <button
          className="todo-undo-button"
          onClick={() => {
            // setTodos([]);
            setTodos(previousToDo);
          }}
        >
          Undo
        </button>

        <button
          className="todo-clearall-button"
          onClick={() => {
            setTodos([]);
            setPreviousToDo(Todos);
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Home;
