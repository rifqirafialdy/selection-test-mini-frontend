import { Routes,Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Verification";
import ResetPassword from "./pages/ResetPassword";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchUser } from "./features/users/userSlice";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";

  function App() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const shouldLog= useRef(true)

    useEffect(() => {
      if (shouldLog.current) {
        shouldLog.current=false
        if (token) {
          dispatch(fetchUser(token));
        }
      }
    }, [token,dispatch]);
  
    return (
      <>
        {token  ? (
          <>
            <Sidebar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post/:id" element={<Post/>}/>
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verification/:token" element={<Verification />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        )}
      </>
    );
  }
  

export default App;
