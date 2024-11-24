import React, { useState } from "react";
import { useToDo } from "../../context/TodoContext";
import { useAuth } from "../../context/AuthContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addToDo } = useToDo();
  const { firestoreUser } = useAuth(); 

  const canWrite = firestoreUser?.permissions?.write;

  const add = (e) => {
    e.preventDefault();
    if (todo !== "") {
      addToDo({ todo, completed: false });
      setTodo("");
    } else {
      console.log("empty");
    }
  };

  return (
    <div className="relative group">
    
      <div id="todo" className="flex">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Write Your Tasks..."
          className={`w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 py-1.5 ${
            canWrite
              ? "bg-white/20"
              : "bg-gray-200/50 cursor-not-allowed" 
          }`}
          disabled={!canWrite} 
        />
        <button
          onClick={add}
          className={`rounded-r-lg px-3 py-1 text-white shrink-0 ${
            canWrite
              ? "bg-gradient-to-r from-purple-500 to-purple-900"
              : "bg-gray-200/50 cursor-not-allowed" 
          }`}
          disabled={!canWrite} 
        >
          Add
        </button>
      </div>

      
      {!canWrite && (
        <span className="absolute top-[-30px] left-0 w-max px-2 py-1 text-xs text-white bg-black rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          You don't have permission to add tasks
        </span>
      )}
    </div>
  );
}

export default TodoForm;
