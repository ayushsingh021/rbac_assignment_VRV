import React, { useState } from "react";
import { useToDo } from "../../context/TodoContext";
import { useAuth } from "../../context/AuthContext";

function TodoItems({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updateToDo, deleteToDo, toggleComplete } = useToDo();
  const { firestoreUser } = useAuth(); 

  const editTodo = () => {
    updateToDo({ ...todo, todo: todoMsg }, todo.id);
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  const canWrite = firestoreUser?.permissions?.write;
  const canDelete = firestoreUser?.permissions?.delete;


  return (
    
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed
          ? "bg-gradient-to-r from-teal-400 to-yellow-200"
          : "bg-gradient-to-r from-lime-400 to-lime-500"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
        disabled={!canWrite} 
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable
            ? "bg-gradient-to-r from-slate-50 to-gray-200 p-1"
            : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <p className="text-xs">Created By : {todo.createdByName}</p>
      <p className="text-xs">Last Updated By : {todo.lastUpdatedByName}</p>

      
      <div className="relative group">
        <button
          className={`inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center ${
            canWrite
              ? "bg-gray-50 hover:bg-gray-100"
              : "bg-gray-200/50 cursor-not-allowed"
          }`}
          onClick={() => {
            if (todo.completed) return;

            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={!canWrite || todo.completed} 
        >
          {isTodoEditable ? "📁" : "✏️"}
        </button>
        {!canWrite && (
          <span className="absolute -top-10 left-0 w-max px-2 py-1 text-xs text-white bg-black rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            You don't have permission
          </span>
        )}
      </div>

      
      <div className="relative group">
        <button
          className={`inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center ${
            canDelete
              ? "bg-gray-50 hover:bg-gray-100"
              : "bg-gray-200/50 cursor-not-allowed"
          }`}
          onClick={() => deleteToDo(todo.id)}
          disabled={!canDelete} // Disable if no delete permission
        >
          ❌
        </button>
        {!canDelete && (
          <span className="absolute -top-10 left-0 w-max px-2 py-1 text-xs text-white bg-black rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            You don't have permission
          </span>
        )}
      </div>
      
    </div>
  );
}

export default TodoItems;
