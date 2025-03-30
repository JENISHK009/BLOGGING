import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";

// Use the same data from WebStories page
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
  }
];

export default function WebStoriesPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle manual navigation only (removed auto-scroll)
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % webStoriesData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + webStoriesData.length) % webStoriesData.length);
  };

  // Show the active story without scrolling the page
  useEffect(() => {
    if (containerRef.current) {
      const storyElements = containerRef.current.querySelectorAll('.story-item');
      if (storyElements[activeIndex]) {
        // Just scroll the horizontal container without affecting page scroll
        const container = containerRef.current;
        const item = storyElements[activeIndex] as HTMLElement;

        if (container && item) {
          const containerLeft = container.getBoundingClientRect().left;
          const itemLeft = item.getBoundingClientRect().left;
          const scrollPosition = container.scrollLeft + (itemLeft - containerLeft - (container.offsetWidth - item.offsetWidth) / 2);

          container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [activeIndex]);

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-1">Latest Web Stories</h2>
              <p className="text-gray-600 dark:text-gray-400">Visual stories to inspire and educate</p>
            </div>
            <Button
              asChild
              variant="outline"
              className="dark:text-white dark:border-white/40 dark:hover:bg-white/20 dark:hover:border-white/60"
            >
              <Link href="/web-stories">
                View All Stories
              </Link>
            </Button>
          </motion.div>

          <div className="relative">
            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors -ml-4"
              aria-label="Previous story"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors -mr-4"
              aria-label="Next story"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>

            {/* Stories container */}
            <div
              ref={containerRef}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar py-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {webStoriesData.map((story, index) => (
                <div
                  key={story.id}
                  className={`story-item flex-shrink-0 w-64 md:w-72 mx-3 snap-center transition-transform duration-300 ${index === activeIndex ? 'scale-105 z-10' : 'scale-95 opacity-80'
                    }`}
                >
                  <Link href={`/web-stories/${story.slug}`}>
                    <div className="cursor-pointer group">
                      <div className="relative aspect-[9/16] rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                          <span className="text-xs text-white/80 mb-1">
                            {story.duration} • {story.pages} pages
                          </span>
                          <h3 className="text-lg font-bold text-white leading-tight">
                            {story.title}
                          </h3>
                        </div>
                        <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-medium rounded-full py-1 px-3">
                          {story.category}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Story dots indicator */}
            <div className="flex justify-center mt-6">
              {webStoriesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 mx-1 rounded-full transition-all ${index === activeIndex
                      ? 'bg-primary w-6'
                      : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}