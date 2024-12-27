"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  Lock,
  type LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
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
        className={`fixed left-0 top-0 h-full w-64 transform bg-background text-slate-600 shadow-lg transition-transform duration-300 ease-in-out dark:text-slate-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
      >
        <div className="flex h-full flex-col">
          <div className="p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-4 top-4"
            >
              <X className="h-4 w-4" />
            </Button>
            <h2 className="mb-4 text-xl font-semibold capitalize">PROMA</h2>
            <Separator className="my-2" />
            <div className="flex items-center gap-3 py-2">
              <Image
                src="https://res.cloudinary.com/drqbhj6ft/image/upload/v1735266468/learning-webdev-blog/project-management/proma-logo_lsceq9.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="text-base font-bold">Zyllusc TEAM</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" /> Private
                </div>
              </div>
            </div>
            <Separator className="my-2" />
          </div>
          <ScrollArea>
            <nav className="flex-grow px-4">
              <SidebarLink icon={Home} label="Home" href="/" />
              <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
              <SidebarLink icon={Search} label="Search" href="/search" />
              <SidebarLink icon={Settings} label="Settings" href="/settings" />
              <SidebarLink icon={User} label="Users" href="/users" />
              <SidebarLink icon={Users} label="Teams" href="/teams" />
              <Button
                variant="ghost"
                onClick={() => setShowProjects((prev) => !prev)}
                className="flex w-full justify-between px-4 py-3 text-left"
              >
                <span>Projects</span>
                {showProjects ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
              {showProjects && (
                <>
                  <SidebarLink
                    icon={Briefcase}
                    label="Project 1"
                    href="/projects/1"
                  />
                  <SidebarLink
                    icon={Briefcase}
                    label="Project 2"
                    href="/projects/2"
                  />
                </>
              )}

              <Button
                variant="ghost"
                onClick={() => setShowPriority((prev) => !prev)}
                className="flex w-full justify-between px-4 py-3 text-left"
              >
                <span>Priority</span>
                {showPriority ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
              {showPriority && (
                <>
                  <SidebarLink
                    icon={AlertCircle}
                    label="Urgent"
                    href="/priority/urgent"
                  />
                  <SidebarLink
                    icon={ShieldAlert}
                    label="High"
                    href="/priority/high"
                  />
                  <SidebarLink
                    icon={AlertTriangle}
                    label="Medium"
                    href="/priority/medium"
                  />
                  <SidebarLink
                    icon={AlertOctagon}
                    label="Low"
                    href="/priority/low"
                  />
                  <SidebarLink
                    icon={Layers3}
                    label="Backlog"
                    href="/priority/backlog"
                  />
                </>
              )}
            </nav>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
          <div className="mt-auto p-4">
            <Separator className="mb-4" />
            <Avatar className="h-10 w-10">
              <AvatarImage
              // src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
              />
              <AvatarFallback className="border-2 border-blue-300 bg-blue-400 text-white dark:border-secondary"></AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium"></p>
              <Button
                variant="outline"
                //   onClick={handleSignOut}
              >
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon: Icon,
  label,
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="block">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={`w-full justify-start gap-3 px-4 py-3 ${
          isActive ? "bg-muted" : ""
        }`}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

export default Sidebar;
