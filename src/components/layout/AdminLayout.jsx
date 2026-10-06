import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { pageTitles } from "@/config/navigation";
import { LoaderSurface } from "@/hooks/use-loader";

function resolveTitle(pathname) {
  if (pageTitles[pathname]) return pageTitles[pathname];
  const base = "/" + pathname.split("/")[1];
  return pageTitles[base] || "Regnor Admin";
}

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col md:pl-64">
        <Topbar title={resolveTitle(location.pathname)} />
        <main className="relative flex-1 p-2 sm:p-2 lg:p-3">
          <Outlet />
          <LoaderSurface scope="outlet" />
        </main>
      </div>
    </div>
  );
}
