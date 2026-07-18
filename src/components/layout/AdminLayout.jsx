import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const titles = {
  "/": "Dashboard",
  "/products": "Products",
  "/orders": "Orders",
  "/customers": "Customers",
  "/inventory": "Inventory",
  "/coupons": "Coupons",
  "/settings": "Settings",
};

function resolveTitle(pathname) {
  if (titles[pathname]) return titles[pathname];
  const base = "/" + pathname.split("/")[1];
  return titles[base] || "Lumière Admin";
}

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col md:pl-64">
        <Topbar title={resolveTitle(location.pathname)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
