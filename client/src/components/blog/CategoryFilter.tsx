import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchCategories, type Category } from "@/lib/blog-data";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

export default function CategoryFilter() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isCategoryActive = (slug: string) => {
    return location === `/category/${slug}`;
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-4">Categories</h3>
      
      <Input 
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant={location === "/blogs" ? "default" : "outline"}
          size="sm"
          asChild
          className="mb-2"
        >
          <Link href="/blogs">
            <a>All</a>
          </Link>
        </Button>
        
        {isLoading ? (
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
          filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Button
                variant={isCategoryActive(category.slug) ? "default" : "outline"}
                size="sm"
                asChild
                className="mb-2"
              >
                <Link href={`/category/${category.slug}`}>
                  <a>{category.name}</a>
                </Link>
              </Button>
            </motion.div>
          ))
        )}
        
        {!isLoading && filteredCategories.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No categories found.</p>
        )}
      </div>
    </div>
  );
}
