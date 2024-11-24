import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import TodoPage from "./pages/TodoPage";
import { ToDoProvider } from "./context/TodoContext";
const PrivateRoute = ({ children, roleRequired }) => {
  const { user, firestoreUser, loading } = useAuth();
  const navigate = useNavigate();
  const [showPermissionError, setShowPermissionError] = React.useState(false);

  React.useEffect(() => {
    if (showPermissionError) {
      const timeout = setTimeout(() => {
        setShowPermissionError(false);
        navigate("/");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [showPermissionError, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && firestoreUser?.role !== roleRequired) {
    if (!showPermissionError) {
      setShowPermissionError(true);
    }
    return (
      <div>You don't have admin permission. Redirecting to homepage...</div>
    );
  }

  return children;
};

function App() {
  return (
    <section className="home-section">
      <Router basename="rbac_assignment_VRV">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                {" "}
                <ToDoProvider>
                  <TodoPage />
                </ToDoProvider>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute roleRequired="Admin">
                <AdminPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </section>
  );
}

export default App;
