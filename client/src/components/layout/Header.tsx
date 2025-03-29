import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import AnimatedSearchBar from "@/components/shared/AnimatedSearchBar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Settings, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Enhanced classic glass effect with subtle border and elegant shadow
  const glassClasses = `
    fixed top-0 left-0 right-0 z-50 
    ${isScrolled 
      ? "backdrop-blur-md bg-background/80 shadow-md border-b border-primary/10" 
      : "bg-transparent backdrop-blur-sm"
    }
    transition-all duration-500
  `;

  return (
    <header className={glassClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-lg relative overflow-hidden">
                {/* Classic decorative elements for logo */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute inset-0 border-2 border-white/20 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif font-bold text-xl text-white filter drop-shadow-sm">BG</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-tight group-hover:text-primary transition-colors">Bloggers Ground</span>
                <span className="text-xs text-muted-foreground/70 font-medium tracking-wide uppercase">Classic Blogging</span>
              </div>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: "/blogs", label: "Blogs" },
              { href: "/web-stories", label: "Web Stories" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" }
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <div className="relative group cursor-pointer">
                  <span className={cn(
                    "font-serif font-medium text-base transition-colors", 
                    location === link.href ? "text-primary" : "hover:text-primary"
                  )}>
                    {link.label}
                  </span>
                  <div className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 transform origin-left transition-transform duration-300",
                    location === link.href 
                      ? "bg-primary scale-x-100" 
                      : "bg-primary/40 scale-x-0 group-hover:scale-x-100"
                  )}></div>
                </div>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <AnimatedSearchBar className="hidden md:block" />
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar>
                      <AvatarImage src={user.avatar || undefined} alt={user.fullName || user.username} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.fullName || user.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/auth/signup">
                    <span>Sign Up</span>
                  </Link>
                </Button>
                <Button variant="default" asChild>
                  <Link href="/auth/login">
                    <span>Sign In</span>
                  </Link>
                </Button>
              </div>
            )}
            
            <button 
              className="md:hidden text-gray-600 dark:text-gray-300"
              onClick={toggleMobileMenu}
              aria-label="Open mobile menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 pb-6 px-4"
          >
            <nav className="flex flex-col space-y-4 pt-2 pb-4">
              <div className="px-4 py-2">
                <form 
                  className="relative"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.querySelector('input');
                    if (input && input.value.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(input.value)}`;
                      closeMobileMenu();
                    }
                  }}
                >
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-10 pr-4 py-2 rounded-full w-full"
                  />
                  <Button 
                    type="submit" 
                    variant="ghost" 
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  >
                    <Search className="h-3.5 w-3.5" />
                  </Button>
                </form>
              </div>
              
              <Link href="/blogs">
                <div 
                  className="font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer"
                  onClick={closeMobileMenu}
                >
                  Blogs
                </div>
              </Link>
              <Link href="/web-stories">
                <div 
                  className="font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer"
                  onClick={closeMobileMenu}
                >
                  Web Stories
                </div>
              </Link>
              <Link href="/about">
                <div 
                  className="font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer"
                  onClick={closeMobileMenu}
                >
                  About
                </div>
              </Link>
              <Link href="/contact">
                <div 
                  className="font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer"
                  onClick={closeMobileMenu}
                >
                  Contact
                </div>
              </Link>
              
              {user ? (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                    <div className="px-4 py-2">
                      <p className="font-medium">{user.fullName || user.username}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div
                    className="font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer"
                    onClick={() => {
                      logoutMutation.mutate();
                      closeMobileMenu();
                    }}
                  >
                    Log out
                  </div>
                </>
              ) : (
                <>
                  <Link href="/auth/signup">
                    <div 
                      className="font-medium py-2 px-4 text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer"
                      onClick={closeMobileMenu}
                    >
                      Sign Up
                    </div>
                  </Link>
                  <Link href="/auth/login">
                    <div 
                      className="py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition font-medium text-center cursor-pointer"
                      onClick={closeMobileMenu}
                    >
                      Sign In
                    </div>
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
