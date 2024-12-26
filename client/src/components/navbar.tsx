"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, Moon, Search, Settings, Sun, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const isSidebarCollapsed = true;

  return (
    <nav className="flex items-center justify-between border-b bg-background px-4 py-3">
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <Button
            variant="outline"
            size="icon"
            className="rounded-md bg-secondary"
          >
            <Menu className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </Button>
        )}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            className="w-[250px] rounded-md pl-8"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="bg-secondary"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          ) : (
            <Moon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          )}
        </Button>
        <Button variant="outline" size="icon" asChild className="bg-secondary">
          <Link href="/settings">
            <Settings className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </Link>
        </Button>
        <div className="hidden h-6 w-px bg-border md:block" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-10 w-10 border">
                <AvatarFallback>
                  <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
