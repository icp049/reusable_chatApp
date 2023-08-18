import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import MyProfile from "./pages/MyProfile";
import LandingPage from "./pages/LandingPage";
function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <LandingPage/>
              </ProtectedRoute>
            }
          />
          <Route path = "message"  
           element = {
            <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
           }
          />
          <Route path = "myprofile"  
           element = {
            <ProtectedRoute>
                <MyProfile/>
              </ProtectedRoute>
           }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;