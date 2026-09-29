import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { appRoutes } from "@/routes";

function renderRoutes(routes) {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path || "root"} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }

    return <Route key={route.path} path={route.path} element={route.element} />;
  });
}

export default function App() {
  return (
    <Routes>
      {renderRoutes(appRoutes)}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
