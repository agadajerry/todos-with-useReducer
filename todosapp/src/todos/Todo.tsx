import React, { useReducer, useState } from "react";
import "../counter.css";
import styled from "styled-components";
import darkBg from "./images/bg-desktop-dark.jpg";
import lightBg from "./images/bg-desktop-light.jpg";
import "font-awesome/css/font-awesome.css"

const ACTIONS = {
  ADD_TODOS: "add_todos",
  EDIT_TODOS: "edit_todos",
  DELETE_TODO: "delete_todo",
  FILTER_ACTIVE_TODO: "FILTER_TODO",
  FILTER_COMPLETE_TODO: "FILTER_TODO",
  CLEAR_COMPLETE_TODO: "CLEAR_COMPLETE_TODO",
};

const Header = styled.div`
  background: url("${(props: any) => props.img}");
  background-size: cover;
  background-repeat: no-repeat;
  height: 300px;
  display: flex;
  justify-content: center;
`;
const Logo = styled.img`
  width: 200px;
  height: 300px;
`;

const HeaderContainer = styled.div`
  width: 40%;
  margin-top: 32px;
`;

const Container = styled.div`
  height: auto;
  background-color: #fff;
  border-radius: 4px;
`;
const Input = styled.input`
  width: 100%;
  padding: 16px 10px;
  margin-bottom: 30px;
  border-radius: 3px;
  border: none;
`;

const reducer = (todos: any, action: any) => {
  switch (action.type) {
    case ACTIONS.ADD_TODOS:
      return [...todos, newTodos(action.payload.todoName)];
    case ACTIONS.EDIT_TODOS:
      return todos.map((val: any) => (val.id === action.payload.id ? { ...val, complete: !val.complete } : val));

    //delete todo
    case ACTIONS.DELETE_TODO:
      return todos.filter((val: any) => val.id !== action.payload.id);
    case ACTIONS.FILTER_ACTIVE_TODO:
      return todos.filter((val: any) => val.complete === action.payload.active);
    case ACTIONS.FILTER_COMPLETE_TODO:
      return todos.filter((val: any) => val.complete === action.payload.active);

    case ACTIONS.CLEAR_COMPLETE_TODO:
      return todos.filter((val: any) => val.complete !== action.payload.active);
  }
};
// nppx json-server --watch data/db.json --port 80000
const newTodos = (todoName: string) => {
  return { id: Date.now(), name: todoName, complete: false };
};

function Todo() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [todoName, setTodoName] = useState("");
  const [checked, setChecked] = useState(false);
  const [countActive, setCountActive] = useState([]);
  const [isDay, setIsDay] = useState(false);

  const submitData = (e: React.FormEvent<HTMLFormElement>) => {
    if (todoName === "") return alert("Empty field");
    e.preventDefault();

    dispatch({ type: ACTIONS.ADD_TODOS, payload: { todoName: todoName } });
    // setCountActive(todos)
    setTodoName("");
    // let count = todos.filter((val:any)=>val.complete!== false);
    console.log(countActive);
  };
  function editTodo(id: number) {
    dispatch({ type: ACTIONS.EDIT_TODOS, payload: { id: id } });

    let count = todos.filter((val: any) => val.complete === false);
    setCountActive(count);
    // console.log(count)
  }
  function deleteTodo(id: number) {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: id } });
  }

  function handleFilterActive() {
    dispatch({ type: ACTIONS.FILTER_ACTIVE_TODO, payload: { active: false } });
  }
  function handleCompletedTask() {
    dispatch({ type: ACTIONS.FILTER_COMPLETE_TODO, payload: { active: true } });
  }
  function handleClearCompleted() {
    dispatch({ type: ACTIONS.CLEAR_COMPLETE_TODO, payload: { active: true } });
  }

  console.log(todos);

  return (
    <>
      {/* <Logo img ={lightBg}/> */}
      <div
        className="header"
        style={{
          backgroundImage: isDay ? `url(${darkBg})` : `url(${lightBg})`,
        }}
      >
        <div className="headerContainer">
          <div className="logo-switch">
            <label>Todo</label>
            <label className="btn" onClick={() => setIsDay(!isDay)}>
              {isDay ? <i className="fa fa-moon-o"></i>:<i className="fa fa-sun-o"></i>}
            </label>
          </div>
          <div className="input-container">
            <form onSubmit={submitData}>
              <Input type="text" value={todoName} placeholder="Enter your todo" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoName(e.target.value)} />
            </form>
          </div>
          <div>
            <div className={isDay ? "todo-container-dark" : "todo-container"}>
              {todos?.map((val: any, index: number) => (
                <div className="todo-content" key={index}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    value="My Todo"
                    id={index + "todo-msg"}
                    onClick={() => editTodo(val.id)}
                    checked={val.complete}
                    onChange={() => setChecked(val.complete)}
                  />
                  <label className={val.complete ? "todo-msg" : ""} htmlFor={index + "todo-msg"}>
                    {val.name}
                  </label>
                  <label className="exit" onClick={() => deleteTodo(val.id)}>
                    <i className="fa fa-times"></i>
                  </label>
                </div>
              ))}
              {/* {JSON.stringify(todos,null,3)} */}
              <div className="filtercontainer">
                <h4>{todos.length} item left</h4>
                <div className="filter-btns">
                  <button>All</button>
                  <button onClick={handleFilterActive}>Active</button>
                  <button onClick={handleCompletedTask}>Completed</button>
                </div>
                <button onClick={handleClearCompleted}> Clear Completed</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={isDay ? "container-dark" : "container"}></div>
    </>
  );
}

export default Todo;
