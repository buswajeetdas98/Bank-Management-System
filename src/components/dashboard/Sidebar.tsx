import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  CreditCard,
  User,
  LifeBuoy,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ className, collapsed = false, onToggle }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    if (onToggle) onToggle();
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-blue-900 text-white transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white md:hidden"
        onClick={handleToggle}
      >
        {isCollapsed ? <Menu /> : <X />}
      </Button>

      {/* Logo and header */}
      <div className="flex items-center p-4 border-b border-blue-800">
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        {!isCollapsed && (
          <span className="ml-3 text-xl font-semibold">BankSystem</span>
        )}
      </div>

      {/* User profile */}
      <div
        className={cn(
          "flex items-center p-4 border-b border-blue-800",
          isCollapsed ? "justify-center" : "justify-start",
        )}
      >
        <Avatar>
          <AvatarImage
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            alt="User"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="ml-3">
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-blue-200">Premium Account</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          <NavItem
            to="/"
            icon={<Home className="h-5 w-5" />}
            label="Dashboard"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/accounts"
            icon={<CreditCard className="h-5 w-5" />}
            label="Accounts"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/profile"
            icon={<User className="h-5 w-5" />}
            label="Profile"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/support"
            icon={<LifeBuoy className="h-5 w-5" />}
            label="Support"
            isCollapsed={isCollapsed}
          />
        </ul>
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-blue-800">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-white hover:bg-blue-800 hover:text-white",
            isCollapsed && "justify-center p-2",
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon, label, isCollapsed }: NavItemProps) => {
  const isActive = window.location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex items-center rounded-md p-2 text-blue-100 hover:bg-blue-800 hover:text-white transition-colors",
          isCollapsed ? "justify-center" : "justify-between",
          isActive && "bg-blue-800 text-white",
        )}
      >
        <div className="flex items-center">
          {icon}
          {!isCollapsed && <span className="ml-3">{label}</span>}
        </div>
        {!isCollapsed && <ChevronRight className="h-4 w-4 opacity-50" />}
      </Link>
    </li>
  );
};

export default Sidebar;
