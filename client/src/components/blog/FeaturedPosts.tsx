import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { fetchFeaturedPosts, type Post } from "@/lib/blog-data";
import { motion } from "framer-motion";

export default function FeaturedPosts() {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      try {
        const posts = await fetchFeaturedPosts();
        setFeaturedPosts(posts);
      } catch (error) {
        console.error("Error fetching featured posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 w-1/4 mb-6 rounded"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // If no featured posts, return empty (in production we'd have real data)
  if (featuredPosts.length === 0) {
    // Using placeholder data for demonstration
    return (
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Trending Articles</h2>
        </motion.div>

        <Carousel className="w-full">
          <CarouselContent>
            {/* Placeholder carousel items */}
            {[1, 2, 3].map((item) => (
              <CarouselItem key={item} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md">
                    <div className="aspect-video w-full bg-gray-100 dark:bg-gray-700"></div>
                    <div className="p-4">
                      <Badge>Technology</Badge>
                      <h3 className="mt-2 text-xl font-bold">Discover the Latest Tech Trends</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                        Explore the cutting-edge technologies shaping our future and how they impact daily life.
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700"></div>
                          <span className="text-sm">John Doe</span>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <Link href="/blogs/tech-trends">
                            <a>Read More</a>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Articles</h2>
      </motion.div>

      <Carousel className="w-full">
        <CarouselContent>
          {featuredPosts.map((post) => (
            <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="p-4">
                    <Badge>{post.category.name}</Badge>
                    <h3 className="mt-2 text-xl font-bold">{post.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <span className="text-sm">{post.author.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="dark:text-white dark:border-white/30"
                        asChild
                      >
                        <Link href={`/blogs/${post.id}`}>Read More</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
