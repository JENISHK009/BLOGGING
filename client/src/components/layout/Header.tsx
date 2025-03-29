import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
          <div className="flex items-center space-x-2">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                  B
                </div>
                <span className="font-inter font-bold text-xl">BlogWave</span>
              </a>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/blogs">
              <a className={`font-medium transition-colors ${location === "/blogs" ? "text-primary" : "hover:text-primary"}`}>
                Blogs
              </a>
            </Link>
            <Link href="/about">
              <a className={`font-medium transition-colors ${location === "/about" ? "text-primary" : "hover:text-primary"}`}>
                About
              </a>
            </Link>
            <Link href="/contact">
              <a className={`font-medium transition-colors ${location === "/contact" ? "text-primary" : "hover:text-primary"}`}>
                Contact
              </a>
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
                <a>Sign In</a>
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
                <a 
                  className="font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={closeMobileMenu}
                >
                  Blogs
                </a>
              </Link>
              <Link href="/about">
                <a 
                  className="font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={closeMobileMenu}
                >
                  About
                </a>
              </Link>
              <Link href="/contact">
                <a 
                  className="font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={closeMobileMenu}
                >
                  Contact
                </a>
              </Link>
              <Link href="/auth/login">
                <a 
                  className="py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition font-medium text-center"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </a>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
