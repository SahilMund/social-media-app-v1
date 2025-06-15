import { Route, Routes } from "react-router-dom";
import SingUp from "./pages/Singup";
import { ToastContainer } from "react-toastify";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import ProtectedRoute from "./hoc/WithAuth";
import PostUploadForm from "./pages/PostUploadForm";
import UserProfile from "./pages/UserProfile";
import { getuserInfo } from "./service/user";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  const { setUser } = useAuth();

  const fetchLoggedInUserInfo = async () => {

    const { data } = await getuserInfo();
    if (data.success) {
      setUser({
        name: data?.data?.user?.name,
        email: data?.data?.user?.email,
        userId: data?.data?.user?._id,
      });
    }
  };

  useEffect(() => {
    fetchLoggedInUserInfo();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-posts"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <PostUploadForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-post/:id"
          element={
            <ProtectedRoute>
              <PostUploadForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute isPublic>
              <SingUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute isPublic>
              <LogIn />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
