import { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X, Filter, ArrowDown, ArrowUp, ChevronDown, ChevronUp, BookOpen, TrendingUp, CalendarDays } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { fetchPosts, type Post, fetchCategories, type Category } from "@/lib/blog-data";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars, Text3D, Float } from "@react-three/drei";
import { Suspense } from "react";

// 3D header title component
function BlogSectionTitle() {
  return (
    <Float 
      speed={2} 
      rotationIntensity={0.2} 
      floatIntensity={0.2}
      position={[0, 0, 0]}
    >
      <Text3D
        font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
        size={1.5}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-6, 0, 0]}
      >
        Blog
        <meshNormalMaterial />
      </Text3D>
    </Float>
  );
}

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [location] = useLocation();
  const filterRef = useRef<HTMLDivElement>(null);
  
  // Extract category from URL if present
  const categorySlug = location.startsWith("/category/") ? location.split("/category/")[1] : null;
  
  // Load posts and categories
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [postsData, categoriesData] = await Promise.all([
        fetchPosts(categorySlug || undefined),
        fetchCategories()
      ]);
      setPosts(postsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [categorySlug]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Close mobile filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowMobileFilters(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter and sort posts
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === "latest") {
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    } else if (sortOption === "oldest") {
      return new Date(a.published_at).getTime() - new Date(b.published_at).getTime();
    } else if (sortOption === "popular") {
      return b.views - a.views;
    }
    return 0;
  });

  // Title based on category
  const title = categorySlug 
    ? `${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)} Blogs` 
    : "All Blogs";

  const sortIcons = {
    latest: <CalendarDays className="h-4 w-4 mr-2" />,
    oldest: <CalendarDays className="h-4 w-4 mr-2" />,
    popular: <TrendingUp className="h-4 w-4 mr-2" />
  };

  return (
    <>
      <Helmet>
        <title>{title} | Bloggers Ground</title>
        <meta name="description" content={`Explore our collection of ${categorySlug || ''} blogs about technology, design, business and more.`} />
        <meta property="og:title" content={`${title} | Bloggers Ground`} />
        <meta property="og:description" content={`Explore our collection of ${categorySlug || ''} blogs about technology, design, business and more.`} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Hero Section with classic design (removed 3D for now) */}
      <div className="relative h-64 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/30 dark:to-primary/10 overflow-hidden">
        {/* Background paper texture and decorative elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        
        {/* Animated elements */}
        <motion.div 
          className="absolute top-1/4 left-10 w-8 h-8 rounded-full bg-primary/10"
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-10 w-6 h-6 rounded-full bg-primary/20"
          animate={{ y: [0, 15, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-primary/15"
          animate={{ y: [0, -10, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {title}
          </motion.h1>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 rounded mb-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "6rem", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {categorySlug 
              ? `Explore our latest articles about ${categorySlug}.` 
              : "Discover insightful articles on technology, design, business and more."}
          </motion.p>
        </div>
      </div>
      
      <AnimatedSection className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Classic paper texture search bar */}
          <motion.div 
            className="relative max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-lg blur-sm"></div>
            <div className="relative bg-background p-1 rounded-lg border border-primary/20 backdrop-blur-sm">
              <div className="relative flex items-center">
                <div className="absolute left-4 text-primary">
                  <Search className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-10 h-14 border-0 bg-transparent text-base md:text-lg focus-visible:ring-0 focus-visible:ring-offset-0 font-serif placeholder:font-serif"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Mobile filter toggle - Enhanced with classic styling */}
          <div className="lg:hidden mb-6">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full gap-2 text-base border border-primary/20 bg-background/50 backdrop-blur-sm shadow-sm hover:bg-primary/5 transition-all duration-300"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="h-5 w-5 text-primary/80" />
              <span className="font-serif">Filters & Categories</span>
              <div className="ml-auto bg-primary/10 rounded-full p-1">
                {showMobileFilters ? 
                  <ChevronUp className="h-4 w-4 text-primary" /> : 
                  <ChevronDown className="h-4 w-4 text-primary" />
                }
              </div>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters sidebar - Desktop (always visible) and Mobile (collapsible) */}
            <AnimatePresence>
              {(showMobileFilters || window.innerWidth >= 1024) && (
                <motion.div 
                  ref={filterRef}
                  className={`${showMobileFilters ? 'fixed inset-0 z-50 bg-background/90 backdrop-blur-md pt-20 px-4 pb-4 overflow-auto lg:static lg:bg-transparent lg:pt-0 lg:px-0 lg:pb-0 lg:z-auto lg:col-span-1' : 'lg:block hidden lg:col-span-1'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Mobile close button */}
                  {showMobileFilters && (
                    <div className="lg:hidden absolute top-4 right-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowMobileFilters(false)}
                        className="border border-primary/20 bg-background/80 backdrop-blur-sm hover:bg-primary/5 transition-all rounded-full w-10 h-10"
                      >
                        <X className="h-5 w-5 text-primary" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="space-y-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-primary/10 backdrop-blur-sm">
                    {/* Classic design title */}
                    <div className="relative">
                      <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary/10 rounded-full"></div>
                      <h2 className="text-2xl font-serif font-bold mb-4 relative">Refine Results</h2>
                      <div className="h-0.5 w-full bg-primary/20 rounded mb-6"></div>
                    </div>
                    
                    {/* Sort options */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 font-serif flex items-center">
                        <ArrowDown className="h-4 w-4 mr-2" />
                        <ArrowUp className="h-4 w-4 mr-2" />
                        Sort By
                      </h3>
                      <div className="space-y-2">
                        {["latest", "oldest", "popular"].map(option => (
                          <div 
                            key={option}
                            onClick={() => setSortOption(option)}
                            className={`cursor-pointer p-3 rounded-lg flex items-center ${sortOption === option ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                          >
                            {sortIcons[option as keyof typeof sortIcons]}
                            <span className="capitalize">{option}</span>
                            {sortOption === option && (
                              <div className="ml-auto">
                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Categories */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 font-serif flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Categories
                      </h3>
                      <div className="space-y-2">
                        <Link href="/blogs">
                          <a className={`block p-3 rounded-lg ${!categorySlug ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                            All Categories
                            {!categorySlug && (
                              <div className="float-right">
                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                              </div>
                            )}
                          </a>
                        </Link>
                        
                        {categories.map(category => (
                          <Link key={category.id} href={`/category/${category.slug}`}>
                            <a className={`block p-3 rounded-lg ${categorySlug === category.slug ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                              {category.name}
                              {categorySlug === category.slug && (
                                <div className="float-right">
                                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                                </div>
                              )}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Results summary */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                <p className="text-gray-600 dark:text-gray-400 font-serif">
                  {isLoading ? (
                    <span className="animate-pulse">Loading posts...</span>
                  ) : (
                    <span>Showing {sortedPosts.length} results</span>
                  )}
                </p>
                <div className="hidden lg:flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Currently sorted by:</span>
                  <span className="text-sm font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center">
                    {sortIcons[sortOption as keyof typeof sortIcons]}
                    <span className="capitalize">{sortOption}</span>
                  </span>
                </div>
              </div>
              
              {/* Blog posts grid or loading state */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse shadow-md border border-gray-200 dark:border-gray-700">
                      <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : sortedPosts.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, staggerChildren: 0.1 }}
                >
                  {sortedPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <BlogCard post={post} index={index} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 font-serif">No posts found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    {searchTerm 
                      ? "Try adjusting your search terms or filters to find what you're looking for." 
                      : "Check back later for new content in this category."}
                  </p>
                  {searchTerm && (
                    <Button onClick={() => setSearchTerm("")} className="bg-primary hover:bg-primary/90">
                      Clear Search
                    </Button>
                  )}
                </motion.div>
              )}
              
              {/* Pagination - improved with hover effects */}
              {!isLoading && sortedPosts.length > 0 && (
                <div className="mt-12">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-8"></div>
                  <div className="flex justify-center flex-wrap gap-2">
                    <Button 
                      disabled 
                      variant="outline" 
                      size="lg"
                      className="border-primary/20 hover:bg-primary/5 transition-all duration-300 text-base font-medium px-4"
                    >
                      Previous
                    </Button>
                    <Button 
                      variant="default" 
                      size="lg"
                      className="bg-primary hover:bg-primary/90 transition-all duration-300 font-medium px-4 min-w-[3rem]"
                    >
                      1
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-primary/20 hover:bg-primary/5 transition-all duration-300 font-medium px-4 min-w-[3rem]"
                    >
                      2
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-primary/20 hover:bg-primary/5 transition-all duration-300 font-medium px-4 min-w-[3rem]"
                    >
                      3
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-primary/20 hover:bg-primary/5 transition-all duration-300 text-base font-medium px-4"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
