import { Fragment, useState } from "react";
import { List } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import AddTodo from "./AddTodo";
import DeletedTodos from "./DeletedTodos";
import SearchTodo from "./SearchTodo";
import TodoDetails from "./TodoDetails";

import TodoItems from "./TodoItems";

const TodosList = (props) => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [deletedTasks, setDeleteTasks] = useState([]);

  // Add a new todo
  const addTodo = (title) => {
    let newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Marked a todo
  const markComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const delTodo = (task) => {
    setTodos(todos.filter((todo) => todo.id !== task.id));
    let newDeletedTask = {
      id: task.id,
      title: task.title,
    };
    setDeleteTasks([...deletedTasks, newDeletedTask]);
  };

  // Search in todos function
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <SearchTodo search={search} handleSearchChange={handleSearchChange} />
      <hr size="1" />
      <AddTodo addTodo={addTodo} />
      <br />
      {todos.length ? (
        <Fragment>
          <TodoDetails
            totalTasks={todos.length}
            completedTasks={todos.filter((todo) => todo.completed).length}
          />
          <List>
            {todos
              .filter((todo) =>
                todo.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((todo) => (
                <TodoItems
                  key={todo.id}
                  todo={todo}
                  markComplete={markComplete}
                  delTodo={delTodo}
                />
              ))}
          </List>
        </Fragment>
      ) : (
        <h6 className="text-center">Todo List Empty</h6>
      )}
      {deletedTasks.length > 0 ? <DeletedTodos deletedTasks={deletedTasks} /> : ""}
    </div>
  );
};

export default TodosList;
