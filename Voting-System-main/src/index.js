import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";
import Auth from "./components/Context/Auth";
import Symbols from "./components/Context/Symbol";
import "react-toastify/dist/ReactToastify.css";
import Constituency from "./components/Context/constituency";
import Election from "./components/Context/election";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Election>
      <Constituency>
        <Symbols>
          <Auth>
            <App />
          </Auth>
        </Symbols>
      </Constituency>
    </Election>
    <ToastContainer />
  </React.StrictMode>
);
