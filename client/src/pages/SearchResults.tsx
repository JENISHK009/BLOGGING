import { useEffect, useState } from "react";
import { useSearch } from "wouter";
import { Helmet } from "react-helmet";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Post } from "@/lib/blog-data";

// Simulate fetching search results
const searchBlog = async (query: string, type = "all"): Promise<Post[]> => {
  // For demo purposes, we'll use the static blog data
  // In a real application, this would be an API call to search the database
  const allPosts = await import("@/lib/blog-data").then(
    (module) => module.fetchPosts()
  );
  
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  
  return allPosts.filter((post) => {
    const matchesTitle = post.title.toLowerCase().includes(lowerQuery);
    const matchesContent = post.content.toLowerCase().includes(lowerQuery);
    const matchesExcerpt = post.excerpt.toLowerCase().includes(lowerQuery);
    const matchesAuthor = post.author.name.toLowerCase().includes(lowerQuery);
    const matchesCategory = post.category.name.toLowerCase().includes(lowerQuery);
    const matchesTags = post.tags.some(tag => tag.name.toLowerCase().includes(lowerQuery));
    
    switch (type) {
      case "posts":
        return matchesTitle || matchesContent || matchesExcerpt;
      case "authors":
        return matchesAuthor;
      case "categories":
        return matchesCategory;
      case "tags":
        return matchesTags;
      default:
        return matchesTitle || matchesContent || matchesExcerpt || 
               matchesAuthor || matchesCategory || matchesTags;
    }
  });
};

export default function SearchResults() {
  const [searchParams] = useSearch();
  const query = new URLSearchParams(searchParams).get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [searchType, setSearchType] = useState("all");
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSearchInput(query);
    
    if (query) {
      setIsLoading(true);
      searchBlog(query, searchType)
        .then(setResults)
        .finally(() => setIsLoading(false));
    } else {
      setResults([]);
    }
  }, [query, searchType]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput)}`;
    }
  };

  return (
    <>
      <Helmet>
        <title>{query ? `Search Results: ${query}` : "Search"} | Bloggers Ground</title>
        <meta 
          name="description" 
          content={query ? `Search results for "${query}" on Bloggers Ground.` : "Search all blog posts, authors, and topics on Bloggers Ground."}
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <AnimatedSection className="py-20 pt-28 md:pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {query ? `Search Results: "${query}"` : "Search"}
            </motion.h1>

            {/* Search form with animation */}
            <motion.form 
              onSubmit={handleSearch}
              className="mb-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex gap-3 items-center">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search className="h-5 w-5" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search for articles, authors, or topics..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-10 pr-4 py-6 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    animate={{ 
                      boxShadow: searchInput 
                        ? "0 0 0 2px rgba(var(--primary-rgb), 0.5)" 
                        : "0 0 0 0 rgba(var(--primary-rgb), 0)"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                <Select
                  value={searchType}
                  onValueChange={setSearchType}
                >
                  <SelectTrigger className="w-[120px] md:w-[180px]">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="All" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="posts">Posts</SelectItem>
                    <SelectItem value="authors">Authors</SelectItem>
                    <SelectItem value="categories">Categories</SelectItem>
                    <SelectItem value="tags">Tags</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  type="submit" 
                  className="px-6 py-3 h-auto"
                  disabled={!searchInput.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
            </motion.form>

            {/* Results count and loading indicator */}
            {query && (
              <motion.div 
                className="mb-6 flex items-center text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    <span>Searching...</span>
                  </div>
                ) : (
                  <span>Found {results.length} results</span>
                )}
              </motion.div>
            )}

            {/* Results list with animation */}
            {results.length > 0 ? (
              <div className="space-y-6">
                {results.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="p-6 cursor-pointer">
                        <div className="flex items-center text-sm space-x-4 mb-3">
                          <span className="text-primary font-medium">{post.category.name}</span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {new Date(post.published_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img 
                                src={post.author.avatar} 
                                alt={post.author.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium">{post.author.name}</span>
                          </div>
                          <div className="text-primary font-medium text-sm flex items-center">
                            Read more <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              query && !isLoading && (
                <motion.div 
                  className="py-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="text-6xl mb-4 text-gray-300 dark:text-gray-600">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    We couldn't find any content matching your search for "{query}".
                    <br />Try different keywords or browse our categories.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/blogs">
                      Browse All Posts
                    </Link>
                  </Button>
                </motion.div>
              )
            )}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}