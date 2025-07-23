import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  User, 
  Bell, 
  Menu,
  MapPin 
} from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-card">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span className="font-urbanist font-bold text-xl gradient-text">
            Rent Share
          </span>
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items to rent or swap..."
              className="pl-10 glass-effect border-0 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/explore" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/explore') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Explore
          </Link>
          <Link 
            to="/post" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/post') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Post Item
          </Link>
          <Link 
            to="/dashboard" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Dashboard
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover-scale"
          >
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-2 w-2 p-0 bg-destructive" />
          </Button>
          
          <Link to="/post">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Post Item</span>
            </Button>
          </Link>

          <Link to="/signup">
            <Button variant="ghost" size="icon" className="hover-scale">
              <User className="h-4 w-4" />
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 glass-card">
          <div className="container py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  className="pl-10 glass-effect border-0"
                />
              </div>
              <nav className="flex flex-col space-y-2">
                <Link 
                  to="/explore" 
                  className="text-sm font-medium py-2 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explore
                </Link>
                <Link 
                  to="/post" 
                  className="text-sm font-medium py-2 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Post Item
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-sm font-medium py-2 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};