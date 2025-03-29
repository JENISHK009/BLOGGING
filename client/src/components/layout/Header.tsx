import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Settings } from "lucide-react";

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

  // Glass effect classes with less obtrusive background
  const glassClasses = `
    fixed top-0 left-0 right-0 z-50 
    ${isScrolled ? "backdrop-blur-sm bg-background/50 shadow-sm" : "bg-transparent"}
    transition-all duration-300
  `;

  return (
    <header className={glassClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                BG
              </div>
              <span className="font-inter font-bold text-xl">Bloggers Ground</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/blogs">
              <span className={cn("font-medium transition-colors cursor-pointer", 
                location === "/blogs" ? "text-primary" : "hover:text-primary")}>
                Blogs
              </span>
            </Link>
            <Link href="/web-stories">
              <span className={cn("font-medium transition-colors cursor-pointer", 
                location === "/web-stories" ? "text-primary" : "hover:text-primary")}>
                Web Stories
              </span>
            </Link>
            <Link href="/about">
              <span className={cn("font-medium transition-colors cursor-pointer", 
                location === "/about" ? "text-primary" : "hover:text-primary")}>
                About
              </span>
            </Link>
            <Link href="/contact">
              <span className={cn("font-medium transition-colors cursor-pointer", 
                location === "/contact" ? "text-primary" : "hover:text-primary")}>
                Contact
              </span>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
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
