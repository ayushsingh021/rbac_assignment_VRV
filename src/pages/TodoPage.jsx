import React, { useEffect } from "react";
import { RiRefreshLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import TodoForm from "../components/TodoForm/TodoForm";
import TodoItems from "../components/TodoForm/TodoItems";
import { useToDo } from "../context/TodoContext";

const TodoPage = () => {
  const { todos, addToDo, updateToDo, deleteToDo, toggleComplete } = useToDo();
  const { logout, firestoreUser } = useAuth(); 
  const navigate = useNavigate();

  const canRead = firestoreUser?.permissions?.read; 
  const isAdmin = firestoreUser?.role === "Admin"; 

  useEffect(() => {
    console.log("Updated todos:", todos);
  }, [todos]);

  return (
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 m-5 text-white bg-gray-800">
     
      <div className="flex items-center justify-between mb-4">
        <div className="flex justify-center space-x-2 items-center">
          
          <button
            onClick={() => logout()}
            className="w-md text-white rotate-[-90deg] bg-red-400 shadow-red-400/40 dark:shadow-lg dark:shadow-red-400/40 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-full text-sm px-1 py-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <AiOutlineLogout className="text-lg text-center font-bold text-white" />
          </button>
        </div>

        <div>
          <TodoForm onAdd={(todo) => addToDo(todo)} />
        </div>

       
        <div className="relative group">
          <button
            onClick={() => navigate("/admin")}
            disabled={!isAdmin} // Disable button if not an Admin
            className={`w-full bg-[#ec1d23] shadow-red-800/80 dark:shadow-lg dark:shadow-red-800/80 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              isAdmin
                ? "text-white"
                : "text-gray-400 bg-gray-500 cursor-not-allowed" // Make button translucent if disabled
            }`}
          >
            Admin
          </button>
          {!isAdmin && (
            <span className="absolute top-[-30px] left-0 w-max px-2 py-1 text-xs text-white bg-black rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              Only Admins can access this section
            </span>
          )}
        </div>
      </div>

    
      {canRead ? ( 
        <div className="flex flex-wrap gap-y-3">
          {todos.map((todo) => (
            <div key={todo.id} className="w-full">
              <TodoItems
                todo={todo}
                onUpdate={(updatedTodo) => updateToDo(updatedTodo, todo.id)}
                onDelete={() => deleteToDo(todo.id)}
                onToggleComplete={() => toggleComplete(todo.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-6">
          <p>You don't have permission to view tasks.</p>
        </div>
      )}
    </div>
  );
};

export default TodoPage;
