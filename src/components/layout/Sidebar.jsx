import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navigation } from "@/config/navigation";

function NavItem({ item, onNavigate, isOpen, onToggle }) {
  if (item.children) {
    return (
      <div className="space-y-1">
        <button
          type="button"
          onClick={() => onToggle(item.label)}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.14em] text-white/45 transition-colors hover:bg-white/5 hover:text-white"
        >
          {item.icon && <item.icon className="h-3.5 w-3.5 text-white/50" />}

          <span className="flex-1">{item.label}</span>

          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-white/50 transition-transform duration-300",
              isOpen && "rotate-90",
            )}
          />
        </button>

        <div
          className={cn(
            "ml-2 overflow-hidden border-l border-white/10 pl-2 transition-all duration-300 ease-out",
            isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="space-y-1 pt-1">
            {item.children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "flex items-center rounded-md px-2.5 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white",
                  )
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-white/10 text-white"
            : "text-white/60 hover:bg-white/5 hover:text-white",
        )
      }
    >
      {({ isActive }) => (
        <>
          <item.icon
            className={cn("h-4 w-4", isActive ? "text-white" : "text-white/40")}
          />

          <span>{item.label}</span>

          {isActive && (
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold" />
          )}
        </>
      )}
    </NavLink>
  );
}

export function SidebarContent({ onNavigate }) {
  const [expandedGroups, setExpandedGroups] = useState(() =>
    Object.fromEntries(
      navigation
        .filter((item) => item.children)
        .map((item) => [item.label, true]),
    ),
  );

  const handleToggle = (label) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* =========================
          BRAND / LOGO HEADER
      ========================== */}
      <div className="flex h-20 shrink-0 items-center px-3">
        <div className="w-full">
          <img
            src="/regnor-wordmark.svg"
            alt="Regnor Jewellery"
            className="h-9 w-auto max-w-[180px] object-contain"
          />
        </div>
      </div>

      {/* =========================
          NAVIGATION
      ========================== */}
      <nav className="flex-1 space-y-2 overflow-y-auto overflow-x-hidden px-3 pb-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 hover:[&::-webkit-scrollbar-thumb]:bg-white/25">
        {navigation.map((item) => (
          <NavItem
            key={item.to || item.label}
            item={item}
            onNavigate={onNavigate}
            isOpen={expandedGroups[item.label] ?? true}
            onToggle={handleToggle}
          />
        ))}
      </nav>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col bg-ink h-screen overflow-hidden">
      <SidebarContent />
    </aside>
  );
}
