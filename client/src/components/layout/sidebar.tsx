"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full w-64 transform bg-background shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </Button>
          <h2 className="mb-4 text-xl font-semibold">Menu</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="block rounded-md px-4 py-2 hover:bg-secondary"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-md px-4 py-2 hover:bg-secondary"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-md px-4 py-2 hover:bg-secondary"
                >
                  Tasks
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-md px-4 py-2 hover:bg-secondary"
                >
                  Calendar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-md px-4 py-2 hover:bg-secondary"
                >
                  Reports
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
