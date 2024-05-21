import React, { createContext, useState } from "react";

const TodoContext = createContext();
const TodoProvider = ({ children }) => {
  const sessionString = window.sessionStorage.getItem("todos");
  const sessionArr = sessionString ? JSON.parse(sessionString) : null;
  const [toDos, setTodos] = useState(sessionArr || []);
  const [signedIn, setSignedIn] = useState(false); //true: 로그인 됨, false: 로그인 안됨
  return (
    <TodoContext.Provider value={{ toDos, setTodos, signedIn, setSignedIn }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoProvider, TodoContext };
