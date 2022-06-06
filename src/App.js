import logo from "./logo.svg";
import "./App.css";
import { SignIn } from "./Components/SignIn/SignIn";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./Context/AuthContext";
import { ForgotPassword } from "./Pages/Forgot Password/ForgotPassword";

function App() {
  const { login } = useAuth();
  return (
    <>
      <ToastContainer />
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          {login && <Route path="/dashboard" element={<Dashboard />} />}
        </Routes>
      </div>
    </>
  );
}

export default App;
