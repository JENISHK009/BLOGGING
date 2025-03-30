import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Filter, ArrowDown, ArrowUp, ChevronDown, ChevronUp, BookOpen, TrendingUp, CalendarDays } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { fetchPosts, type Post, fetchCategories, type Category } from "@/lib/blog-data";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_SIZE = 10;
const MAX_VISIBLE_PAGES = 5;
const SCROLL_TOP_OPTIONS = { top: 0, behavior: 'smooth' } as const;

export default function BlogList() {
  const [location, setLocation] = useLocation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalItems: 0,
    startItem: 1,
    endItem: PAGE_SIZE
  });
  const filterRef = useRef<HTMLDivElement>(null);

  const categorySlug = useMemo(() => 
    location.startsWith("/category/") ? location.split("/category/")[1].split("?")[0] : null,
    [location]
  );

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [postsData, categoriesData] = await Promise.all([
        fetchPosts(categorySlug || undefined, { page: currentPage, limit: PAGE_SIZE }),
        fetchCategories()
      ]);

      setPosts(postsData.posts);
      setCategories(categoriesData);
      
      const startItem = (currentPage - 1) * PAGE_SIZE + 1;
      const endItem = Math.min(currentPage * PAGE_SIZE, postsData.pagination.totalItems);

      setPaginationInfo({
        totalPages: postsData.pagination.totalPages,
        totalItems: postsData.pagination.totalItems,
        startItem,
        endItem
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [categorySlug, currentPage]);

  useEffect(() => {
    loadData();
    window.scrollTo(SCROLL_TOP_OPTIONS);
  }, [loadData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowMobileFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > paginationInfo.totalPages) return;
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (slug: string) => {
    setCurrentPage(1);
    window.scrollTo(SCROLL_TOP_OPTIONS);
    setLocation(slug ? `/category/${slug}` : "/blogs");
  };

  const filteredPosts = useMemo(() => 
    posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [posts, searchTerm]
  );

  const sortedPosts = useMemo(() => [...filteredPosts].sort((a, b) => {
    if (sortOption === "latest") return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    if (sortOption === "oldest") return new Date(a.published_at).getTime() - new Date(b.published_at).getTime();
    if (sortOption === "popular") return b.views - a.views;
    return 0;
  }), [filteredPosts, sortOption]);

  const title = categorySlug
    ? `${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)} Blogs`
    : "All Blogs";

  const sortIcons = {
    latest: <CalendarDays className="h-4 w-4 mr-2" />,
    oldest: <CalendarDays className="h-4 w-4 mr-2" />,
    popular: <TrendingUp className="h-4 w-4 mr-2" />
  };

  const renderPaginationButtons = () => {
    if (window.innerWidth < 768) {
      return (
        <div className="flex justify-center gap-2 w-full">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="border-primary/20 hover:bg-primary/5 transition-all duration-300 flex-1 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Prev
          </Button>
          <div className="flex items-center px-4 text-sm font-medium bg-primary/10 rounded-lg dark:bg-gray-700 dark:text-gray-200">
            {currentPage} / {paginationInfo.totalPages}
          </div>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= paginationInfo.totalPages}
            variant="outline"
            size="sm"
            className="border-primary/20 hover:bg-primary/5 transition-all duration-300 flex-1 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Next
          </Button>
        </div>
      );
    }

    let startPage = 1;
    let endPage = Math.min(MAX_VISIBLE_PAGES, paginationInfo.totalPages);

    if (paginationInfo.totalPages > MAX_VISIBLE_PAGES) {
      const half = Math.floor(MAX_VISIBLE_PAGES / 2);
      if (currentPage > half + 1) {
        startPage = Math.min(currentPage - half, paginationInfo.totalPages - MAX_VISIBLE_PAGES + 1);
        endPage = startPage + MAX_VISIBLE_PAGES - 1;
      }
    }

    return (
      <>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="lg"
          className="border-primary/20 hover:bg-primary/5 transition-all duration-300 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Previous
        </Button>

        {startPage > 1 && (
          <>
            <Button
              onClick={() => handlePageChange(1)}
              variant="outline"
              size="lg"
              className="border-primary/20 hover:bg-primary/5 transition-all duration-300 min-w-[3rem] dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              1
            </Button>
            {startPage > 2 && (
              <span className="flex items-center px-2 text-gray-500 dark:text-gray-300">...</span>
            )}
          </>
        )}

        {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
          const page = startPage + i;
          return (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              variant={currentPage === page ? "default" : "outline"}
              size="lg"
              className={`${
                currentPage === page 
                  ? "bg-primary hover:bg-primary/90 dark:bg-primary dark:text-white" 
                  : "border-primary/20 hover:bg-primary/5 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              } transition-all duration-300 min-w-[3rem]`}
            >
              {page}
            </Button>
          );
        })}

        {endPage < paginationInfo.totalPages && (
          <>
            {endPage < paginationInfo.totalPages - 1 && (
              <span className="flex items-center px-2 text-gray-500 dark:text-gray-300">...</span>
            )}
            <Button
              onClick={() => handlePageChange(paginationInfo.totalPages)}
              variant="outline"
              size="lg"
              className="border-primary/20 hover:bg-primary/5 transition-all duration-300 min-w-[3rem] dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {paginationInfo.totalPages}
            </Button>
          </>
        )}

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= paginationInfo.totalPages}
          variant="outline"
          size="lg"
          className="border-primary/20 hover:bg-primary/5 transition-all duration-300 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Next
        </Button>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>{title} | Bloggers Ground</title>
        <meta name="description" content={`Explore our collection of ${categorySlug || ''} blogs`} />
      </Helmet>

      <div className="relative h-64 bg-gradient-to-r from-primary/10 to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-5" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

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

        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <motion.h1
            className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center dark:text-white"
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
          <motion.div
            className="relative max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-lg blur-sm" />
            <div className="relative bg-background p-1 rounded-lg border border-primary/20 backdrop-blur-sm dark:border-gray-700">
              <div className="relative flex items-center">
                <div className="absolute left-4 text-primary dark:text-primary-foreground">
                  <Search className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-10 h-14 border-0 bg-transparent text-base md:text-lg focus-visible:ring-0 focus-visible:ring-offset-0 font-serif placeholder:font-serif dark:text-white dark:placeholder-gray-400"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          <div className="lg:hidden mb-6">
            <Button
              variant="outline"
              size="lg"
              className="w-full gap-2 text-base border border-primary/20 bg-background/50 backdrop-blur-sm shadow-sm hover:bg-primary/5 transition-all duration-300 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="h-5 w-5 text-primary/80 dark:text-primary-foreground" />
              <span className="font-serif dark:text-gray-200">Filters & Categories</span>
              <div className="ml-auto bg-primary/10 rounded-full p-1 dark:bg-primary/20">
                {showMobileFilters ? (
                  <ChevronUp className="h-4 w-4 text-primary dark:text-primary-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-primary dark:text-primary-foreground" />
                )}
              </div>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {(showMobileFilters || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                <motion.div
                  ref={filterRef}
                  className={`${
                    showMobileFilters
                      ? 'fixed inset-0 z-50 bg-background/90 backdrop-blur-md pt-20 px-4 pb-4 overflow-auto lg:static lg:bg-transparent lg:pt-0 lg:px-0 lg:pb-0 lg:z-auto lg:col-span-1'
                      : 'lg:block hidden lg:col-span-1'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {showMobileFilters && (
                    <div className="lg:hidden absolute top-4 right-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowMobileFilters(false)}
                        className="border border-primary/20 bg-background/80 backdrop-blur-sm hover:bg-primary/5 transition-all rounded-full w-10 h-10 dark:border-gray-600 dark:hover:bg-gray-700"
                      >
                        <X className="h-5 w-5 text-primary dark:text-gray-200" />
                      </Button>
                    </div>
                  )}

                  <div className="space-y-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-primary/10 backdrop-blur-sm lg:sticky lg:top-4 dark:border-gray-700">
                    <div className="relative">
                      <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary/10 rounded-full dark:bg-primary/20" />
                      <h2 className="text-2xl font-serif font-bold mb-4 relative dark:text-white">Refine Results</h2>
                      <div className="h-0.5 w-full bg-primary/20 rounded mb-6 dark:bg-primary/30" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 font-serif flex items-center dark:text-white">
                        <ArrowDown className="h-4 w-4 mr-2 dark:text-gray-300" />
                        <ArrowUp className="h-4 w-4 mr-2 dark:text-gray-300" />
                        Sort By
                      </h3>
                      <div className="space-y-2">
                        {["latest", "oldest", "popular"].map((option) => (
                          <div
                            key={option}
                            onClick={() => setSortOption(option)}
                            className={`cursor-pointer p-3 rounded-lg flex items-center ${
                              sortOption === option
                                ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'
                            }`}
                          >
                            {sortIcons[option as keyof typeof sortIcons]}
                            <span className="capitalize">{option}</span>
                            {sortOption === option && (
                              <div className="ml-auto">
                                <div className="w-3 h-3 rounded-full bg-primary dark:bg-primary-foreground" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 font-serif flex items-center dark:text-white">
                        <BookOpen className="h-4 w-4 mr-2 dark:text-gray-300" />
                        Categories
                      </h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleCategoryChange("")}
                          className={`w-full text-left p-3 rounded-lg ${
                            !categorySlug
                              ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'
                          }`}
                        >
                          All Categories
                          {!categorySlug && (
                            <div className="float-right">
                              <div className="w-3 h-3 rounded-full bg-primary dark:bg-primary-foreground" />
                            </div>
                          )}
                        </button>

                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.slug)}
                            className={`w-full text-left p-3 rounded-lg ${
                              categorySlug === category.slug
                                ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'
                            }`}
                          >
                            {category.name}
                            {categorySlug === category.slug && (
                              <div className="float-right">
                                <div className="w-3 h-3 rounded-full bg-primary dark:bg-primary-foreground" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                <p className="text-gray-600 dark:text-gray-300 font-serif">
                  {isLoading ? (
                    <span className="animate-pulse">Loading posts...</span>
                  ) : (
                    <span>
                      Showing {paginationInfo.startItem}-{paginationInfo.endItem} of {paginationInfo.totalItems} results
                    </span>
                  )}
                </p>
                <div className="hidden lg:flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Sorted by:</span>
                  <span className="text-sm font-medium bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full flex items-center dark:text-gray-200">
                    {sortIcons[sortOption as keyof typeof sortIcons]}
                    <span className="capitalize">{sortOption}</span>
                  </span>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(PAGE_SIZE)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse shadow-md">
                      <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700" />
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4" />
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : sortedPosts.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {sortedPosts.map((post) => (
                    <BlogCard key={post.id} post={post} index={0} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400 dark:text-gray-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 font-serif dark:text-white">No posts found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    {searchTerm
                      ? "Try adjusting your search terms or filters to find what you're looking for."
                      : "Check back later for new content in this category."}
                  </p>
                  {searchTerm && (
                    <Button onClick={() => setSearchTerm("")} className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90">
                      Clear Search
                    </Button>
                  )}
                </motion.div>
              )}

              {!isLoading && paginationInfo.totalPages > 1 && (
                <div className="mt-12">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-8" />
                  <div className="flex justify-center flex-wrap gap-2">
                    {renderPaginationButtons()}
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