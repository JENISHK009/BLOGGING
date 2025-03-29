import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AnimatedSearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  showSearchButton?: boolean;
}

export default function AnimatedSearchBar({
  placeholder = "Search articles, topics, and more...",
  className = "",
  onSearch,
  showSearchButton = false,
}: AnimatedSearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isExpanded && 
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isExpanded]);

  const handleToggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 200);
    } else {
      setSearchQuery("");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        // Default behavior: redirect to search page
        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      }
      setIsExpanded(false);
    }
  };

  return (
    <div 
      ref={searchContainerRef}
      className={`relative z-10 ${className}`}
    >
      {/* Search trigger button */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleToggleSearch}
        className="relative rounded-full hover:bg-muted transition-colors duration-300 border-primary/30 hover:border-primary"
        aria-label={isExpanded ? "Close search" : "Open search"}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5 text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="search"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Search className="h-5 w-5 text-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* Animated search input */}
      <AnimatePresence>
        {isExpanded && (
          <motion.form
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "320px", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30, 
              opacity: { duration: 0.2 } 
            }}
            className="absolute right-0 top-0 overflow-hidden"
            onSubmit={handleSearchSubmit}
          >
            <div className="relative flex items-center">
              <div className="absolute left-3 text-primary">
                <Search className="h-4 w-4" />
              </div>
              
              <Input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-12 h-10 border-2 border-primary/30 focus:border-primary rounded-full bg-background shadow-sm focus:shadow-md transition-all duration-300"
              />
              
              {(searchQuery || showSearchButton) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-3"
                >
                  <Button 
                    type="submit" 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6 p-0 text-primary hover:text-primary/80 transition-colors duration-300"
                    disabled={!searchQuery.trim()}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}