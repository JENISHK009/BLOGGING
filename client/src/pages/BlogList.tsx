import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { fetchPosts, type Post } from "@/lib/blog-data";

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [location] = useLocation();
  
  // Extract category from URL if present
  const categorySlug = location.startsWith("/category/") ? location.split("/category/")[1] : null;
  
  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchPosts(categorySlug || undefined);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [categorySlug]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

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

  return (
    <>
      <Helmet>
        <title>{title} | BlogWave</title>
        <meta name="description" content={`Explore our collection of ${categorySlug || ''} blogs about technology, design, business and more.`} />
        <meta property="og:title" content={`${title} | BlogWave`} />
        <meta property="og:description" content={`Explore our collection of ${categorySlug || ''} blogs about technology, design, business and more.`} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {categorySlug 
                ? `Explore our latest articles about ${categorySlug}.` 
                : "Discover insightful articles on technology, design, business and more."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <CategoryFilter />
                
                <div>
                  <h3 className="text-lg font-bold mb-4">Sort By</h3>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-primary/20 p-2">
                  <div className="relative flex items-center">
                    <div className="absolute left-4 text-primary">
                      <Search className="h-5 w-5" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 pr-4 h-12 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
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
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden animate-pulse">
                      <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700"></div>
                      <div className="p-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : sortedPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sortedPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {searchTerm 
                      ? "Try adjusting your search terms or filters." 
                      : "Check back later for new content."}
                  </p>
                  {searchTerm && (
                    <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
                  )}
                </div>
              )}
              
              {/* Pagination */}
              {!isLoading && sortedPosts.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <Button disabled variant="outline" size="sm" className="mr-2">
                    Previous
                  </Button>
                  <Button variant="default" size="sm" className="mx-1">1</Button>
                  <Button variant="outline" size="sm" className="mx-1">2</Button>
                  <Button variant="outline" size="sm" className="mx-1">3</Button>
                  <Button variant="outline" size="sm" className="ml-2">
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
