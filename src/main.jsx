import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ClientThemeProvider } from "@/context/ClientThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClientThemeProvider>
        <App />
      </ClientThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
