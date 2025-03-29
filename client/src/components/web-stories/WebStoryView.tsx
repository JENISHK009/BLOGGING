import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, X, Share2 } from "lucide-react";

// Sample data for a web story (in a real app, this would come from an API)
interface StoryPage {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
}

interface WebStory {
  id: number;
  title: string;
  slug: string;
  authorName: string;
  authorAvatar: string;
  publishDate: string;
  category: string;
  pages: StoryPage[];
}

// Mock data function (would be replaced with API call in production)
const fetchStoryBySlug = (slug: string): WebStory => {
  // This would be a real API call in production
  return {
    id: 1,
    title: "10 Essential SEO Tips for Bloggers in 2023",
    slug: "10-seo-tips-bloggers-2023",
    authorName: "Alex Morgan",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    publishDate: "2023-06-10",
    category: "SEO",
    pages: [
      {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        title: "10 Essential SEO Tips for Bloggers in 2023",
        content: "Discover the most effective SEO strategies that every blogger should implement this year to boost their search visibility."
      },
      {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        title: "1. Optimize for Voice Search",
        content: "Voice searches account for 30% of all searches. Focus on natural language phrases and question-based keywords in your content."
      },
      {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        title: "2. Core Web Vitals",
        content: "Google now prioritizes page experience signals. Optimize loading performance, interactivity, and visual stability of your blog."
      },
      {
        id: 4,
        imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        title: "3. Create In-Depth Content",
        content: "Comprehensive, authoritative content outperforms shorter posts. Aim for 1,500+ words for pillar content and cover topics thoroughly."
      },
      {
        id: 5,
        imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        title: "4. Build Topic Clusters",
        content: "Organize content into clusters with pillar pages and related posts. This creates topical authority and better site structure."
      },
      {
        id: 6,
        imageUrl: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        title: "5. Mobile-First Optimization",
        content: "With mobile-first indexing, ensure your blog is fully responsive and provides excellent mobile user experience."
      },
      {
        id: 7,
        imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        title: "6. Improve E-A-T Signals",
        content: "Boost your Expertise, Authoritativeness, and Trustworthiness by adding author bios, credentials, and citing reliable sources."
      },
      {
        id: 8,
        imageUrl: "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        title: "7. Optimize Internal Linking",
        content: "Create a strategic internal linking structure to distribute page authority and help users navigate your content effectively."
      },
      {
        id: 9,
        imageUrl: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        title: "8. Generate Quality Backlinks",
        content: "Focus on earning backlinks from authoritative sites in your niche through guest posting, creating shareable content, and outreach."
      },
      {
        id: 10,
        imageUrl: "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        title: "9. Use Schema Markup",
        content: "Implement structured data to help search engines understand your content better and potentially earn rich snippets in search results."
      },
      {
        id: 11,
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        title: "10. Analyze & Adapt",
        content: "Regularly monitor your SEO performance using tools like Google Search Console and Analytics. Adjust your strategy based on data-driven insights."
      }
    ]
  };
};

export default function WebStoryView() {
  const [location, navigate] = useLocation();
  const params = location.split('/').pop() || "";
  const slug = params;
  const [currentStory, setCurrentStory] = useState<WebStory | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    try {
      const story = fetchStoryBySlug(slug);
      setCurrentStory(story);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching story:", error);
      setIsLoading(false);
    }
  }, [slug]);

  const navigateToNextPage = () => {
    if (currentStory && currentPage < currentStory.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const navigateToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      navigateToNextPage();
    } else if (e.key === "ArrowLeft") {
      navigateToPrevPage();
    } else if (e.key === "Escape") {
      setIsExiting(true);
      setTimeout(() => {
        navigate("/web-stories");
      }, 300);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, currentStory]);

  const shareStory = () => {
    if (navigator.share && currentStory) {
      navigator.share({
        title: currentStory.title,
        text: `Check out this web story: ${currentStory.title}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      alert("Sharing is not supported in your browser. Copy the URL to share.");
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full mb-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading story...</p>
        </div>
      </div>
    );
  }

  if (!currentStory) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-center max-w-md p-6">
          <div className="text-5xl mb-4 opacity-50">🔍</div>
          <h2 className="text-2xl font-bold mb-2">Story Not Found</h2>
          <p className="mb-6">The story you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/web-stories")}>
            Back to Web Stories
          </Button>
        </div>
      </div>
    );
  }

  const page = currentStory.pages[currentPage];
  const progress = ((currentPage + 1) / currentStory.pages.length) * 100;

  return (
    <>
      <Helmet>
        <title>{currentStory.title} | Web Story | Bloggers Ground</title>
        <meta name="description" content={page.content} />
        <meta property="og:title" content={currentStory.title} />
        <meta property="og:description" content={page.content} />
        <meta property="og:image" content={page.imageUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex flex-col"
          >
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-2">
              <div className="flex space-x-1">
                {currentStory.pages.map((_, i) => (
                  <div 
                    key={i} 
                    className="h-1 flex-1 rounded-full overflow-hidden bg-gray-600"
                    onClick={() => setCurrentPage(i)}
                  >
                    <div 
                      className={`h-full bg-white transition-all duration-300 ${i <= currentPage ? 'w-full' : 'w-0'}`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation controls */}
            <button 
              onClick={() => {
                setIsExiting(true);
                setTimeout(() => {
                  navigate("/web-stories");
                }, 300);
              }}
              className="absolute top-4 right-4 z-10 text-white p-2 rounded-full bg-black/30 backdrop-blur-sm"
              aria-label="Close story"
            >
              <X size={20} />
            </button>

            <button 
              onClick={shareStory}
              className="absolute top-4 right-16 z-10 text-white p-2 rounded-full bg-black/30 backdrop-blur-sm"
              aria-label="Share story"
            >
              <Share2 size={20} />
            </button>

            {/* Story pages */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={page.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex-1 relative w-full h-full"
              >
                <div className="absolute inset-0">
                  <img 
                    src={page.imageUrl} 
                    alt={page.title}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 text-white z-10">
                  <div className="max-w-md mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{page.title}</h2>
                    <p className="text-lg mb-8">{page.content}</p>
                    
                    {currentPage === 0 && (
                      <div className="flex items-center space-x-3 opacity-80 mb-6">
                        <img 
                          src={currentStory.authorAvatar} 
                          alt={currentStory.authorName}
                          className="w-8 h-8 rounded-full object-cover" 
                        />
                        <div>
                          <div className="text-sm font-semibold">{currentStory.authorName}</div>
                          <div className="text-xs">{new Date(currentStory.publishDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="absolute inset-y-0 left-0 w-1/3 flex items-center justify-start" onClick={navigateToPrevPage}>
              {currentPage > 0 && (
                <button 
                  className="ml-4 p-3 bg-black/30 backdrop-blur-sm text-white rounded-full"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
            </div>

            <div className="absolute inset-y-0 right-0 w-1/3 flex items-center justify-end" onClick={navigateToNextPage}>
              {currentPage < currentStory.pages.length - 1 ? (
                <button 
                  className="mr-4 p-3 bg-black/30 backdrop-blur-sm text-white rounded-full"
                  aria-label="Next page"
                >
                  <ChevronRight size={24} />
                </button>
              ) : (
                <Button
                  className="mr-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExiting(true);
                    setTimeout(() => {
                      navigate("/web-stories");
                    }, 300);
                  }}
                >
                  Finish
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}