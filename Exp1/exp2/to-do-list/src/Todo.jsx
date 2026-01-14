import { useState } from "react";

function Todo() {
  const [todoList, setTodoList] = useState([]);

  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");

  function addTodo() {
  if (!name) return;

  setTodoList((prev) => [
    ...prev,
    {
      name,
      dueDate: dueDate || "No date"
    }
  ]);

  setName("");
  setDueDate("");
}


  function deleteTodo(index) {
    setTodoList((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  return (
    <>
      <p>Todo List</p>

      <div className="todo-input-grid">
        <input
          className="name-input"
          placeholder="Todo name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="date"
          className="due-date-input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button className="add-todo-button" onClick={addTodo}>
          Add
        </button>
      </div>

      <div className="todo-grid">
        {todoList.map((todo, index) => (
          <div className="todo-row" key={index}>
            <div>{todo.name}</div>
            <div>{todo.dueDate}</div>
            <button
              className="delete-todo-button"
              onClick={() => deleteTodo(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todo;
