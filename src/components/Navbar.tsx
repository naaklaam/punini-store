import { Link, useLocation } from "react-router-dom";
import { Coins, User, Store, LogOut, Banana } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  userBalance: number;
  userName: string;
  onLogout: () => void;
}

export const Navbar = ({ userBalance, userName, onLogout }: NavbarProps) => {
  const location = useLocation();

  const navLinks = [
    { to: "/store", label: "Store", icon: Store },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/store" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Banana className="w-6 h-6 text-primary" />
            </div>
            <span className="font-cinzel text-xl text-gold-gradient font-bold hidden sm:block">
              Punini Store
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to}>
                <Button
                  variant="fantasy-ghost"
                  size="sm"
                  className={cn(
                    "gap-2",
                    location.pathname === to && "bg-primary/10 border-primary/30"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* User section */}
          <div className="flex items-center gap-4">
            {/* Balance */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
              <Coins className="w-4 h-4 text-primary" />
              <span className="font-cinzel text-sm text-primary font-semibold">
                {userBalance.toLocaleString()}
              </span>
            </div>

            {/* User name */}
            <span className="text-sm text-muted-foreground hidden md:block">
              {userName}
            </span>

            {/* Logout */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
