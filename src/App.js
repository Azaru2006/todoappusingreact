import React, { useState, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState(["Learn React", "Build a project"]);
  const inputRef = useRef(null);

  // Create refs for all todos
  const nodeRefs = useRef({});

  const addTodo = () => {
    if (inputRef.current.value.trim() === "") return;
    setTodos([...todos, inputRef.current.value]);
    inputRef.current.value = "";
  };

  const removeTodo = (todo) => {
    setTodos(todos.filter((t) => t !== todo));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input ref={inputRef} type="text" placeholder="Add a task..." />
      <button onClick={addTodo}>Add</button>

      <TransitionGroup component="ul">
        {todos.map((todo) => {
          if (!nodeRefs.current[todo]) {
            nodeRefs.current[todo] = React.createRef();
          }

          return (
            <CSSTransition
              key={todo}
              timeout={500}
              classNames="fade"
              nodeRef={nodeRefs.current[todo]}
            >
              <li ref={nodeRefs.current[todo]} onClick={() => removeTodo(todo)}>
                {todo}
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}
