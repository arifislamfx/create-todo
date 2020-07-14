import React, { useEffect } from "react";
import "./App.css";
import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import Todo from "./components/Todo/Todo";
import db from "./firebase";
import firebase from "firebase";

const App = () => {
  const [todos, setTodos] = useState(["Hey"]);
  const [input, setInput] = useState("");
  console.log(todos);

  const handleAddTodo = (event) => {
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // old style
    // const newTodo = [...todos, input];
    // setTodos(newTodo);
    setInput("");
  };

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  return (
    <div>
      <div className="todo-container">
        <h2>
          Todo App <span>🎇</span>{" "}
        </h2>
        <form>
          <TextField
            className="text-in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id="standard-basic"
            label="✔ Write a todo"
          />
          <Button
            className="add-btn"
            type="submit"
            disabled={!input}
            onClick={handleAddTodo}
            variant="contained"
            color="primary"
          >
            Add Todo
          </Button>
        </form>

        {todos.map((todo) => (
          <Todo todo={todo}></Todo>
        ))}
      </div>
    </div>
  );
};

export default App;
