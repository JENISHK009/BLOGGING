import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { fetchCategories, type Category } from "@/lib/blog-data";
import { Link, useLocation } from "wouter";
import { FilterIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export default function CategoryFilter() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  const isCategoryActive = (slug: string) => {
    return location === `/category/${slug}`;
  };

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <Button 
          onClick={toggleFilter} 
          variant="outline" 
          className="mb-4 flex items-center gap-2"
        >
          <FilterIcon size={16} />
          <span>Filter by Category</span>
          {isOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
        </Button>
        
        {/* Show currently active category name if one is selected */}
        {location !== "/blogs" && !location.startsWith("/category/") && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing all posts
          </div>
        )}
      </div>
      
      {isOpen && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md mb-6 animate-in fade-in-0 slide-in-from-top-5 duration-300">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={location === "/blogs" ? "default" : "outline"}
              size="sm"
              asChild
              className="mb-2"
            >
              <Link href="/blogs">
                All
              </Link>
            </Button>
            
            {isLoading ? (
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              categories.map((category) => (
                <Button
                  key={category.id}
                  variant={isCategoryActive(category.slug) ? "default" : "outline"}
                  size="sm"
                  asChild
                  className="mb-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={`/category/${category.slug}`}>
                    {category.name}
                  </Link>
                </Button>
              ))
            )}
            
            {!isLoading && categories.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No categories available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
