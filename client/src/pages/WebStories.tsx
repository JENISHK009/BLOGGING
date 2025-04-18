import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

// Define static web story data (no DB connection)
const webStoriesData = [
  {
    id: 1,
    title: "10 Essential SEO Tips for Bloggers in 2023",
    slug: "10-seo-tips-bloggers-2023",
    coverImage: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "SEO",
    date: "2023-06-10",
    duration: "5 min",
    pages: 10
  },
  {
    id: 2,
    title: "The Future of Content Creation with AI Tools",
    slug: "future-content-creation-ai-tools",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Technology",
    date: "2023-05-25",
    duration: "4 min",
    pages: 8
  },
  {
    id: 3,
    title: "How to Build a Successful Blog from Scratch",
    slug: "build-successful-blog-scratch",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Blogging",
    date: "2023-05-12",
    duration: "6 min",
    pages: 12
  },
  {
    id: 4,
    title: "Instagram Marketing Strategies for Bloggers",
    slug: "instagram-marketing-strategies-bloggers",
    coverImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Social Media",
    date: "2023-04-30",
    duration: "3 min",
    pages: 7
  },
  {
    id: 5,
    title: "The Rise of Video Content in Digital Marketing",
    slug: "rise-video-content-digital-marketing",
    coverImage: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Video",
    date: "2023-04-15",
    duration: "5 min",
    pages: 9
  },
  {
    id: 6,
    title: "How to Monetize Your Blog: 7 Proven Methods",
    slug: "monetize-blog-7-proven-methods",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Monetization",
    date: "2023-03-28",
    duration: "7 min",
    pages: 14
  },
  {
    id: 7,
    title: "Email Marketing Best Practices for Bloggers",
    slug: "email-marketing-best-practices-bloggers",
    coverImage: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Email",
    date: "2023-03-15",
    duration: "4 min",
    pages: 8
  },
  {
    id: 8,
    title: "Creating a Content Calendar for Your Blog",
    slug: "creating-content-calendar-blog",
    coverImage: "https://images.unsplash.com/photo-1506784926709-22f1ec395907?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Planning",
    date: "2023-02-22",
    duration: "3 min",
    pages: 6
  }
];

// Categories for filtering
const categories = [
  "All", "SEO", "Technology", "Blogging", "Social Media",
  "Video", "Monetization", "Email", "Planning"
];

export default function WebStories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredStories = webStoriesData.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || story.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Web Stories | Bloggers Ground</title>
        <meta 
          name="description" 
          content="Explore our collection of visual Web Stories about blogging, SEO, digital marketing, and more on Bloggers Ground." 
        />
        <meta property="og:title" content="Web Stories | Bloggers Ground" />
        <meta 
          property="og:description" 
          content="Explore our collection of visual Web Stories about blogging, SEO, digital marketing, and more on Bloggers Ground." 
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "headline": "Web Stories | Bloggers Ground",
            "description": "Explore our collection of visual Web Stories about blogging, SEO, digital marketing, and more on Bloggers Ground.",
            "url": "https://bloggersground.com/web-stories",
            "publisher": {
              "@type": "Organization",
              "name": "Bloggers Ground",
              "logo": {
                "@type": "ImageObject",
                "url": "https://bloggersground.com/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      <AnimatedSection className="py-20 pt-32 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Web Stories</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Explore our visual stories with tips, insights, and trends in blogging, 
              SEO, and digital marketing.
            </p>
          </motion.div>

          {/* Search Bar - Enhanced Dark Mode */}
          <div className="mb-10">
            <div className="relative max-w-lg mx-auto mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-primary/20 dark:border-gray-600 p-2">
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-primary dark:text-primary-200">
                    <Search className="h-5 w-5" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search web stories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 h-12 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white dark:placeholder:text-gray-400"
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Category Tabs - Enhanced Dark Mode */}
            <div className="mb-8 relative">
              <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background dark:from-gray-950 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background dark:from-gray-950 to-transparent z-10 pointer-events-none"></div>
              
              <div className="overflow-x-auto hide-scrollbar py-2">
                <div className="flex space-x-2 px-4 min-w-max">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`
                        whitespace-nowrap px-5 py-2.5 rounded-full transition-all duration-300
                        ${category === activeCategory 
                          ? 'bg-primary text-white shadow-md font-medium dark:bg-primary-400 dark:hover:bg-primary-500' 
                          : 'bg-white/90 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary-400/20 border border-gray-200 dark:border-gray-700'}
                      `}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stories Grid */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredStories.map((story, index) => (
                <motion.div 
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group"
                >
                  <Link href={`/web-stories/${story.slug}`}>
                    <div className="cursor-pointer h-full">
                      <div className="relative aspect-[9/16] rounded-xl overflow-hidden shadow-md mb-3 group-hover:shadow-xl transition-shadow duration-300 dark:shadow-gray-800/30 ring-1 ring-gray-200 dark:ring-gray-700">
                        <img 
                          src={story.coverImage} 
                          alt={story.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                          <span className="text-xs text-white mb-1">
                            {story.duration} • {story.pages} pages
                          </span>
                          <h3 className="text-lg font-bold text-white leading-tight">
                            {story.title}
                          </h3>
                        </div>
                        <div className="absolute top-4 left-4 bg-primary/90 dark:bg-primary-400 text-white text-xs font-medium rounded-full py-1 px-3">
                          {story.category}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-300">
                          {new Date(story.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-primary dark:text-white bg-transparent hover:bg-primary/10 dark:hover:bg-primary-400/30 px-2 py-1 flex items-center font-medium"
                        >
                          View Story
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400 dark:text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No stories found</h3>
              <p className="text-gray-500 dark:text-gray-300 mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms or selecting a different category." 
                  : "Check back later for new stories."}
              </p>
              {searchTerm && (
                <Button 
                  onClick={() => setSearchTerm("")}
                  className="bg-primary hover:bg-primary/90 dark:bg-primary-400 dark:hover:bg-primary-500 text-white"
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </AnimatedSection>
    </>
  );
}