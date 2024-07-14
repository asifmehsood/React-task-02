import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFirebase } from "../Context/Firebase";

export default function Todos() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);
  const [btnText, setBtnText] = useState("Show Done");
  const [history, setHistory] = useState([]);
  const { user, saveTodosToFirebase, fetchTodosFromFirebase } = useFirebase();

  useEffect(() => {
    if (user) {
      fetchTodosFromFirebase().then((savedTodos) => {
        setTodos(savedTodos || []);
      });
    }
  }, [user, fetchTodosFromFirebase]);

  const saveToFirebase = (updatedTodos) => {
    setTodos(updatedTodos);
    saveTodosToFirebase(updatedTodos);
  };

  const handleAdd = () => {
    if (text === "") {
      alert("Specify a title first!!!");
    } else {
      const newTodo = { id: uuidv4(), text, iscompleted: false };
      const updatedTodos = [...todos, newTodo];
      saveToFirebase(updatedTodos);
      setText("");
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleEdit = (e, id) => {
    const t = todos.find((item) => item.id === id);
    setText(t.text);
    const temp = todos.filter((item) => item.id !== id);
    saveToFirebase(temp);
  };

  const handleDelete = (e, id) => {
    const temp = todos.filter((item) => item.id !== id);
    const deleted = todos.filter((item) => item.id === id);
    if (window.confirm("Do you really want to delete this task?")) {
      saveToFirebase(temp);
      setHistory([...history, ...deleted]);
      // Optionally save history to Firebase
    }
  };

  const chkChange = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const temp = [...todos];
    temp[index].iscompleted = !temp[index].iscompleted;
    saveToFirebase(temp);
  };

  const filterTodo = () => {
    setShowFinished(!showFinished);
    setBtnText(showFinished ? "Show Done" : "Hide Done");
  };

  return (
    <div className="lg:container mx-auto bg-violet-200 rounded-xl my-5 p-3 min-h-[85vh] lg:w-2/3 w-3/4">
      <div className="addtodo">
        <h2 className="font-bold my-2 text-xl">Add new Task</h2>
        <input
          type="text"
          onChange={handleChange}
          value={text}
          className="w-3/4 mx-3 px-2 py-1 rounded-lg text-ellipsis text-violet-700"
        />
        <button
          onClick={handleAdd}
          className="mx-3 shadow-lg shadow-gray-500 bg-slate-900 px-2 py-1 rounded-lg text-sm text-red-600 cursor-pointer hover:text-lg transition-all"
        >
          Save
        </button>
      </div>

      <h2 className="my-4 mb-0 text-xl font-bold">Your Todos</h2>

      <button
        className="m-3 w-24 h-8 shadow-lg shadow-gray-500 bg-slate-900 px-2 py-0 rounded-lg text-red-600 cursor-pointer hover:font-bold transition-all text-sm"
        onClick={filterTodo}
      >
        {btnText}
      </button>

      {todos.length === 0 && <div className="m-2">You have no work to do. Enjoy!!!</div>}

      {todos.map((item, index) => (
        (showFinished || !item.iscompleted) && (
          <div
            key={index}
            className="todo flex justify-between items-center mx-3 my-1 border-2 border-black rounded-lg p-2"
          >
            <div className={`${item.iscompleted ? "line-through" : ""}`}>
              <input
                type="checkbox"
                name={item.id}
                checked={item.iscompleted}
                onChange={chkChange}
              />{" "}
              {item.text}
            </div>
            <div className="buttons flex gap-8">
              <button
                onClick={(e) => handleEdit(e, item.id)}
                className="w-16 shadow-lg shadow-gray-500 bg-slate-900 px-2 py-1 rounded-lg text-red-600 cursor-pointer hover:text-sm transition-all"
              >
                Edit
              </button>

              <button
                id={item.id}
                onClick={(e) => handleDelete(e, item.id)}
                className="w-16 shadow-lg shadow-gray-500 bg-slate-900 px-2 py-1 rounded-lg text-red-600 cursor-pointer hover:text-sm transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        )
      ))}
    </div>
  );
}
