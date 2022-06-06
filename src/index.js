import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { OrderListProvider } from "./Context/OrderListProvider";
import { AuthProvider } from "./Context/AuthContext";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <OrderListProvider>
          <App />
        </OrderListProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
