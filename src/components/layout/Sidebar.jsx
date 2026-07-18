import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Gem,
  ShoppingBag,
  Users,
  Boxes,
  Ticket,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/products", label: "Products", icon: Gem },
  { to: "/orders", label: "Orders", icon: ShoppingBag },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/inventory", label: "Inventory", icon: Boxes },
  { to: "/coupons", label: "Coupons", icon: Ticket },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gold-soft">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 9L12 3L20 9L12 21L4 9Z" stroke="hsl(36 55% 34%)" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M4 9H20M8 9L12 21M16 9L12 21M9 3L4 9M15 3L20 9" stroke="hsl(36 55% 34%)" strokeWidth="1" strokeLinejoin="round" opacity="0.6" />
          </svg>
        </div>
        <div>
          <p className="font-display text-lg font-semibold leading-none text-white">Lumière</p>
          <p className="text-[11px] uppercase tracking-widest text-white/40">Admin Studio</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn("h-4 w-4", isActive ? "text-gold" : "text-white/40")} />
                {label}
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mx-3 mb-3 rounded-md border border-white/10 bg-white/5 p-4">
        <p className="text-xs font-medium text-white/70">Storefront preview</p>
        <p className="mt-1 text-[11px] text-white/40">See what shoppers see, live.</p>
        <a
          href="#"
          className="mt-3 inline-flex items-center text-xs font-medium text-gold hover:text-gold-soft"
        >
          View storefront &rarr;
        </a>
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-ink">
      <SidebarContent />
    </aside>
  );
}
