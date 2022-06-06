import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import { useAuth } from "../../Context/AuthContext";
import { Toast } from "../Toast/Toast";
import "./SignIn.css";
export function SignIn() {
  const navigate = useNavigate();
  const { setToken, setLogin } = useAuth();
  const [loginCred, setLoginCred] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  function loginCredHandler(e) {
    const { name, value } = e.target;
    setLoginCred((loginCred) => ({
      ...loginCred,
      [name]: value,
    }));
  }

  function passwordToggler() {
    setShowPassword(!showPassword);
  }
  function loginHandler() {
    console.log("login credentials", loginCred);
    (async () => {
      try {
        const response = await axios({
          method: "POST",
          url: "http://13.76.214.165:8001/api/login",
          data: {
            username: loginCred?.username,
            password: loginCred?.password,
          },
        });
        if (response.status >= 200 && response.status <= 299) {
          const token = sessionStorage.setItem("login", response.data.token);
          setToken(token);
          Toast("success", response.data.message);
          setLogin(true);
          navigate("/dashboard");
        }
      } catch (error) {
        Toast("error", error);
      }
    })();
  }

  return (
    <div>
      <img src={logo} alt="" />

      <div class="form-signin w-50 m-auto">
        <h4 class="h4 mb-3 fw-normal">Sign In</h4>

        <div class="form-floating">
          <span className="text-start">Email</span>
          <input
            type="text"
            class="form-control singin-input"
            id="floatingInput"
            placeholder="Enter Email"
            name="username"
            value={loginCred.username}
            onChange={loginCredHandler}
          />
        </div>
        <div class="form-floating">
          <span htmlFor="" class="text-start">
            Password
          </span>
          <input
            type={showPassword ? "text" : "password"}
            class="form-control singin-input "
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={loginCred.password}
            onChange={loginCredHandler}
          />
        </div>
        <button onClick={passwordToggler}>
          {showPassword ? "Hide" : "Show"}
        </button>
        <button class="w-100 btn btn-lg btn-primary" onClick={loginHandler}>
          Sign in
        </button>
        <Link to="/forgotPassword">Forgot Password ?</Link>
        <p>
          Don't have an account? <Link to={"/"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
