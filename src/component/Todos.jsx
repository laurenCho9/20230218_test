import { useRef, useState } from "react";

const todoList = [
  { id: 1, text: "내용글1", done: true },
  { id: 2, text: "내용글2", done: false },
  { id: 3, text: "내용글3", done: false },
];

// let result = TodoList.map((todo) => <li>{todo.text}</li>);

function Todos() {
  const [todos, setTodos] = useState(todoList);
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const nextId = useRef(4);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "") return;
    setTodos(todos.concat({ id: nextId.current++, text: input, done: false }));
    setInput("");
  };

  const handleRemove = (del) => {
    if (window.confirm("삭제하시겠습니까?"))
      setTodos(todos.filter((todo) => todo.id !== del));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };
  //할일ㅠㅠㅠ ㅠ
  const leftTodo = () => {
    return todos.reduce(() => {
      return todos.filter((todo) => !todo.done).length;
    }, [todos]);
  };

  return (
    <>
      <header>
        <h1>TodoList</h1>
        <div className="leftTodo">
          해야할 일 :<span> {leftTodo()}</span>개
        </div>
      </header>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInput} value={input} />
        <button>추가</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            className="toggle"
            key={todo.id}
            onClick={() => handleToggle(todo.id)}
          >
            <span
              style={{
                textDecoration: todo.done && "line-through",
              }}
            >
              {todo.text}
            </span>
            <button
              className="delete"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(todo.id);
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Todos;
