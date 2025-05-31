import { Route, Routes } from "react-router-dom"
import SingUp from "./pages/Singup"
import { ToastContainer } from "react-toastify"
import LogIn from "./pages/LogIn"
import Home from "./pages/Home"
import ProtectedRoute from "./hoc/WithAuth"
import CreatePost from "./pages/CreatePost"
import PostUploadForm from "./pages/PostUploadForm"

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/create-post' element={<ProtectedRoute><PostUploadForm /></ProtectedRoute>} />
        <Route path='/signup' element={<ProtectedRoute isPublic><SingUp /></ProtectedRoute>} />
        <Route path='/login' element={<ProtectedRoute isPublic><LogIn /></ProtectedRoute>} />
      </Routes>

      <ToastContainer />

    </div>
  )
}

export default App
