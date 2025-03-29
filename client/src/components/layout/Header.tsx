import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

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

  // Glass effect classes
  const glassClasses = `
    fixed top-0 left-0 right-0 z-50 
    ${isScrolled ? "backdrop-blur-md bg-white/80 dark:bg-gray-900/80" : "bg-transparent"}
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
            
            <Button
              className="hidden md:block"
              variant="default"
              asChild
            >
              <Link href="/auth/login">
                <span>Sign In</span>
              </Link>
            </Button>
            
            <button 
              className="md:hidden text-gray-600 dark:text-gray-300"
              onClick={toggleMobileMenu}
              aria-label="Open mobile menu"
            >
              <i className="fas fa-bars text-xl"></i>
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
              <Link href="/auth/login">
                <div 
                  className="py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition font-medium text-center cursor-pointer"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </div>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
