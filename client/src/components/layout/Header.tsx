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

  const glassClasses = `
    fixed top-0 left-0 right-0 z-50 
    ${isScrolled
      ? "backdrop-blur-md bg-background/95 shadow-md border-b border-gray-200 dark:border-gray-600 dark:shadow-black/30"
      : "bg-background/70 dark:bg-gray-900/90 backdrop-blur-md"
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute inset-0 border-2 border-white/20 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif font-bold text-xl text-white filter drop-shadow-sm">BG</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-tight group-hover:text-primary transition-colors dark:text-white">Bloggers Ground</span>
                <span className="text-xs text-muted-foreground/70 font-medium tracking-wide uppercase dark:text-gray-300">Classic Blogging</span>
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
                    location === link.href
                      ? "text-primary-500 dark:text-gray-100 font-semibold"
                      : "text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-gray-100"
                  )}>
                    {link.label}
                  </span>
                  <div className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 transform origin-left transition-transform duration-300",
                    location === link.href
                      ? "bg-primary-500 dark:bg-gray-100 scale-x-100"
                      : "bg-primary-500/40 dark:bg-gray-100/40 scale-x-0 group-hover:scale-x-100"
                  )}></div>
                </div>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <AnimatedSearchBar className="hidden md:block [&_button]:dark:text-white [&_svg]:dark:text-white" />

            <div className="text-gray-700 dark:text-white hover:text-primary dark:hover:text-primary-400">
              <ThemeToggle />
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar>
                      <AvatarImage src={user.avatar || undefined} alt={user.fullName || user.username} />
                      <AvatarFallback className="bg-primary/10 text-primary dark:bg-primary-400/10 dark:text-primary-400">
                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 dropdown-menu-content dark:bg-gray-800 dark:border-gray-600" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal dark:text-white">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.fullName || user.username}</p>
                      <p className="text-xs leading-none text-muted-foreground dark:text-gray-300">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="dark:bg-gray-600" />
                  <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                    <User className="mr-2 h-4 w-4 dark:text-white" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                    <Settings className="mr-2 h-4 w-4 dark:text-white" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="dark:bg-gray-600" />
                  <DropdownMenuItem
                    className="dark:text-white dark:hover:bg-gray-700"
                    onClick={() => logoutMutation.mutate()}
                  >
                    <LogOut className="mr-2 h-4 w-4 dark:text-white" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Button
                  variant="outline"
                  asChild
                  className={cn(
                    "font-medium py-2 px-4 rounded-md transition-colors cursor-pointer",
                    location === "/auth/signup"
                      ? "text-primary-600 dark:text-white bg-gray-100 dark:bg-primary-300"
                      : "text-primary-500 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  )}
                >
                  <Link href="/auth/signup">
                    <span>Sign Up</span>
                  </Link>
                </Button>
                <Button
                  variant="default"
                  asChild
                  className={cn(
                    location === "/auth/login"
                      ? "dark:bg-primary-300 dark:hover:bg-primary-400 dark:text-gray-900"
                      : "dark:bg-primary-400 dark:hover:bg-primary-500 dark:text-white"
                  )}
                >
                  <Link href="/auth/login">
                    <span>Sign In</span>
                  </Link>
                </Button>
              </div>
            )}

            <button
              className="md:hidden text-gray-600 dark:text-white hover:text-primary dark:hover:text-primary-400"
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 pb-6 px-4 border-t dark:border-gray-600 shadow-lg dark:shadow-black/30"
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
                    <Search className="h-4 w-4 text-muted-foreground dark:text-white" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 rounded-full w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 dark:hover:bg-gray-700 dark:text-white"
                  >
                    <Search className="h-3.5 w-3.5 text-gray-700 dark:text-white" />
                  </Button>
                </form>
              </div>

              <Link href="/blogs">
                <div
                  className={cn(
                    "font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer",
                    location === "/blogs"
                      ? "text-primary-500 dark:text-gray-100 bg-gray-100 dark:bg-gray-700"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                  onClick={closeMobileMenu}
                >
                  Blogs
                </div>
              </Link>
              <Link href="/web-stories">
                <div
                  className={cn(
                    "font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer",
                    location === "/web-stories"
                      ? "text-primary-500 dark:text-gray-100 bg-gray-100 dark:bg-gray-700"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                  onClick={closeMobileMenu}
                >
                  Web Stories
                </div>
              </Link>
              <Link href="/about">
                <div
                  className={cn(
                    "font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer",
                    location === "/about"
                      ? "text-primary-500 dark:text-gray-100 bg-gray-100 dark:bg-gray-700"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                  onClick={closeMobileMenu}
                >
                  About
                </div>
              </Link>
              <Link href="/contact">
                <div
                  className={cn(
                    "font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer",
                    location === "/contact"
                      ? "text-primary-500 dark:text-gray-100 bg-gray-100 dark:bg-gray-700"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                  onClick={closeMobileMenu}
                >
                  Contact
                </div>
              </Link>

              {user ? (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-600 my-2 pt-2">
                    <div className="px-4 py-2">
                      <p className="font-medium dark:text-white">{user.fullName || user.username}</p>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">{user.email}</p>
                    </div>
                  </div>
                  <div
                    className="font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white rounded-md transition-colors cursor-pointer"
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
                      className={cn(
                        "font-medium py-2 px-4 rounded-md transition-colors cursor-pointer",
                        location === "/auth/signup"
                          ? "text-primary-600 dark:bg-primary-300 bg-gray-100 dark:bg-gray-700"
                          : "text-primary-500 hover:bg-gray-100 dark:text-primary-400 dark:hover:bg-gray-700"
                      )}
                      onClick={closeMobileMenu}
                    >
                      Sign Up
                    </div>
                  </Link>
                  <Link href="/auth/login">
                    <div
                      className={cn(
                        "py-2 px-4 rounded-lg transition font-medium text-center cursor-pointer",
                        location === "/auth/login"
                          ? "bg-primary-600 dark:bg-primary-300 text-white dark:text-gray-900"
                          : "bg-primary hover:bg-primary/90 dark:bg-primary-400 dark:hover:bg-primary-500 text-white"
                      )}
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