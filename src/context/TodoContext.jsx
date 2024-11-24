import { createContext, useContext, useState, useEffect } from "react";
import { db } from "./../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";


const ToDoContext = createContext();


export const ToDoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const { firestoreUser } = useAuth(); 

 
  const fetchTodos = async () => {
    if (!firestoreUser || firestoreUser.status !== "Active" || !firestoreUser.permissions.read) return; 

    try {
      const todosQuery = query(
        collection(db, "todos"),
        where("isDeleted", "==", false), 
      );
      const querySnapshot = await getDocs(todosQuery);
      const todosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosData);
    
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
 
  useEffect(() => {
    fetchTodos();
  }, [firestoreUser]);

  
  const addToDo = async (todo) => {
    if (!firestoreUser || !firestoreUser.permissions?.write) {
      console.error("Permission denied: User cannot create todos.");
      return;
    }
    console.log(firestoreUser);
    try {
      const newTodo = {
        ...todo,
        createdBy: firestoreUser.uid,
        createdByName: firestoreUser.name,
        lastUpdatedBy: firestoreUser.uid,
        lastUpdatedByName: firestoreUser.name,
        updateHistory: [
          {
            userId: firestoreUser.uid,
            timestamp: new Date().toISOString(),
            action: "Created",
          },
        ],
        isDeleted: false,
        createdAt: new Date().toISOString(),
      };
      console.log(newTodo);
      const docRef = await addDoc(collection(db, "todos"), newTodo);
      setTodos((prev) => [{ id: docRef.id, ...newTodo }, ...prev]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  
  const updateToDo = async (updatedTodo, id) => {
    if (!firestoreUser || !firestoreUser.permissions.write) {
      console.error("Permission denied: User cannot update todos.");
      return;
    }

    try {
      const todoRef = doc(db, "todos", id);
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;

      const updatedData = {
        ...updatedTodo,
        lastUpdatedBy: firestoreUser.uid,
        lastUpdatedByName: firestoreUser.name,
        updateHistory: [
          ...todo.updateHistory,
          {
            userId: firestoreUser.uid,
            timestamp: new Date().toISOString(),
            action: "Updated",
          },
        ],
      };

      await updateDoc(todoRef, updatedData);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };


  const deleteToDo = async (id) => {
    if (!firestoreUser || !firestoreUser.permissions.delete) {
      console.error("Permission denied: User cannot delete todos.");
      return;
    }

    try {
      const todoRef = doc(db, "todos", id);
      const updatedData = {
        isDeleted: true,
        lastUpdatedBy: firestoreUser.uid,
        lastUpdatedByName: firestoreUser.name,
        updateHistory: [
          ...todos.find((todo) => todo.id === id)?.updateHistory || [],
          {
            userId: firestoreUser.uid,
            timestamp: new Date().toISOString(),
            action: "Deleted",
          },
        ],
      };
      await updateDoc(todoRef, updatedData);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  
  const toggleComplete = async (id) => {
    if (!firestoreUser || !firestoreUser.permissions.write) {
      console.error("Permission denied: User cannot update todos.");
      return;
    }

    try {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;

      const updatedData = {
        completed: !todo.completed,
        lastUpdatedBy: firestoreUser.uid,
        updateHistory: [
          ...todo.updateHistory,
          {
            userId: firestoreUser.uid,
            timestamp: new Date().toISOString(),
            action: `Marked as ${!todo.completed ? "Completed" : "Incomplete"}`,
          },
        ],
      };
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, updatedData);

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  return (
    <ToDoContext.Provider
      value={{
        todos,
        addToDo,
        updateToDo,
        deleteToDo,
        toggleComplete,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};


export const useToDo = () =>  useContext(ToDoContext);