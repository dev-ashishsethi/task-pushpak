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

  function loginHandler(event) {
    event.preventDefault();
    console.log("login credentials", loginCred);

    axios({
      method: "POST",
      url: "http://13.76.214.165:8001/api/login",
      data: {
        username: loginCred?.username,
        password: loginCred?.password,
      },
    })
      .then((response) => {
        console.log({ response });
        if (response.status === 200) {
          const token = sessionStorage.setItem("login", response.data.token);
          setToken(sessionStorage.getItem("login", response.data.token));
          Toast("success", response.data.message);
          setLogin(true);
          navigate("/dashboard");
        } else {
          Toast("error", response.data.message);
        }
      })
      .catch((error) => {
        Toast("error", error.response.data.message);
        throw error;
      });
  }

  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <img src={logo} alt="" className="mb-3" />

      {/* <div className="form-signin w-50 m-auto">
        <h4 className="h4 mb-3 fw-normal">Sign In</h4>

        <div className="form-floating">
          <span className="text-start">Email</span>
          <input
            type="text"
            className="form-control singin-input"
            id="floatingInput"
            placeholder="Enter Email"
            name="username"
            value={loginCred.username}
            onChange={loginCredHandler}
          />
        </div>
        <div className="form-floating">
          <span htmlFor="" className="text-start">
            Password
          </span>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control singin-input "
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
        <button className="w-100 btn btn-lg btn-primary" onClick={loginHandler}>
          Sign in
        </button>
        <Link to="/forgotPassword">Forgot Password ?</Link>
        <p>
          Don't have an account? <Link to={"/"}>Sign Up</Link>
        </p>
      </div> */}

      <form
        onSubmit={loginHandler}
        className="border rounded ui-signin-form py-3 px-sm-5 px-3"
      >
        <h5 className="text-center text-decoration-underline fs-3">Sign In</h5>
        <div className="ui-signin-email my-2">
          <label htmlFor="email" className="fw-bold p-1">
            Email
          </label>
          <input
            type="text"
            className="form-control border-dark singin-input rounded-4"
            id="floatingInput"
            placeholder="Enter Email"
            name="username"
            value={loginCred.username}
            onChange={loginCredHandler}
            onKeyPress={(event) => {
              if (
                event.key === "Enter" &&
                (!loginCred.username || !loginCred.password)
              ) {
                event.preventDefault();
                return false;
              }
            }}
          />
        </div>
        <div className="ui-signin-password my-2">
          <label htmlFor="password" className="fw-bold p-1">
            Password
          </label>
          <div className="d-flex flex-row border border-dark rounded-4">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control singin-input border-0 rounded-4"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={loginCred.password}
              onChange={loginCredHandler}
              onKeyPress={(event) => {
                if (
                  event.key === "Enter" &&
                  (!loginCred.username || !loginCred.password)
                ) {
                  event.preventDefault();
                  return false;
                }
              }}
            />
            <button
              onClick={passwordToggler}
              type="button"
              className="btn border border-dark border-top-0 border-bottom-0 border-end-0 rounded-4"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Sign In
        </button>
        <div className="d-flex flex-column align-items-center mt-2">
          <Link to="/forgotPassword">Forgot Password ?</Link>
          <p className="mt-2">
            Don't have an account? <Link to={"/"}>Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
