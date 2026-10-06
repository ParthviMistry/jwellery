import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ClientThemeProvider } from "@/context/ClientThemeContext";
import { LoaderProvider } from "@/context/LoaderContext";
import { Toaster } from "@/components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClientThemeProvider>
        <LoaderProvider>
          <App />
          <Toaster />
        </LoaderProvider>
      </ClientThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
