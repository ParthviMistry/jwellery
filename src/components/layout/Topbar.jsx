import React, { useState } from "react";
import { Menu, Search, Bell, ChevronDown, LogOut, User as UserIcon, Settings as SettingsIcon, Palette } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "@/components/layout/Sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useClientTheme } from "@/context/ClientThemeContext";

export default function Topbar({ title }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { selectedId, selectedTheme, setClientTheme, themeOptions } = useClientTheme();

  return (
    <header className="sticky top-0 z-30 flex h-12 items-center gap-3 border-b border-border bg-background/90 px-4 shadow-[0_1px_0_rgba(15,23,42,0.03)] backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SidebarContent onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">{title}</h1>
      </div>

      <div className="relative hidden sm:block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search orders, products…" className="w-56 border-border bg-muted/30 pl-8 lg:w-72" />
      </div>
{/* 
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5 text-sm font-medium transition-colors hover:bg-secondary">
            <Palette className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">{selectedTheme?.label || selectedId}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>Client theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themeOptions.map((theme) => (
            <DropdownMenuItem
              key={theme.value}
              onClick={() => setClientTheme(theme.value)}
              className={selectedId === theme.value ? "bg-secondary" : ""}
            >
              {theme.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu> */}

      <button className="relative flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-secondary" aria-label="Notifications">
        <Bell className="h-[18px] w-[18px]" />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-md py-1 pl-1 pr-2 transition-colors hover:bg-secondary">
            <Avatar className="h-7 w-7 border border-border">
              <AvatarFallback className="bg-primary/10 text-primary">PM</AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium sm:inline">Parthvi Mistry</span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:inline" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/settings")}>
            <UserIcon className="mr-2 h-4 w-4" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/settings")}>
            <SettingsIcon className="mr-2 h-4 w-4" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/login")}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
