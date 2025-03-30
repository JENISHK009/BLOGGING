import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// Define the sign-up schema
const signUpSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type QuickSignUpFormValues = z.infer<typeof signUpSchema>;

// Main Hero Section Component
export default function HeroSection() {
  const ref = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuickSignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: QuickSignUpFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Success!",
        description: "Check your email to complete your registration.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll indicators animation
  const scrollIndicator = {
    animate: {
      y: [0, 10, 0],
      opacity: [0.2, 1, 0.2],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Floating animation variants for decorative elements
  const floatingVariants = {
    float: {
      y: [0, 15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariantsAlt = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div ref={ref} className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      {/* Classic decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="absolute -top-[40%] left-[10%] w-[80%] h-[80%] bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariantsAlt}
          animate="float"
          className="absolute top-[60%] -right-[20%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Paper texture overlay for classic feel */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-5"></div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated dots with different delays and speeds */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-primary/10 dark:bg-primary/20`}
            style={{
              width: `${Math.max(4, Math.random() * 12)}px`,
              height: `${Math.max(4, Math.random() * 12)}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -40, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-20 md:pt-32 md:pb-32">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Left column - Classic text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2 md:pr-10 mb-10 md:mb-0"
          >
            {/* Badge */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 -z-10 bg-primary/10 rounded-lg blur-lg transform -rotate-2"></div>
              <span className="text-base uppercase tracking-widest font-medium text-primary/80 px-4 py-2 border border-primary/20 rounded-full bg-background/80 backdrop-blur-sm dark:text-white dark:border-white/30 dark:bg-gray-900/80">
                Discover • Connect • Create
              </span>
            </div>

            {/* Heading with animated reveal */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold tracking-tight leading-tight mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="overflow-hidden relative"
              >
                <span className="block mb-2 dark:text-white">Bloggers Ground:</span>
                <div className="h-0.5 w-0 bg-primary/30 mt-1 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
                    className="h-full bg-primary dark:bg-primary-400"
                  />
                </div>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 mb-2 dark:text-white"
              >
                SEO-Optimized Blogging
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="block relative dark:text-white"
              >
                Platform for Your Success
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 1.1, ease: "easeInOut" }}
                  className="absolute -bottom-2 left-0 h-1 bg-primary/20 rounded-full dark:bg-primary-400/20"
                />
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 font-serif max-w-xl dark:text-gray-300"
            >
              Welcome to Bloggers Ground, your premier destination for insightful content and beautifully crafted stories. Our platform offers comprehensive SEO optimization tools, responsive designs for all devices, and advanced analytics to help your content reach wider audiences. Discover the latest trends across technology, lifestyle, travel, and more while building a powerful online presence through our optimized publishing platform.
            </motion.p>

            {/* Classic CTA - Email signup with decorative elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="relative mb-12"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur"></div>
              <div className="relative bg-background/90 backdrop-blur-sm p-6 rounded-lg border border-primary/10 shadow-xl dark:bg-gray-900/80 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 font-serif dark:text-white">Join Our Community</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter your email"
                                {...field}
                                className="h-12 px-4 focus-visible:ring-primary border-primary/20 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary font-medium dark:from-primary-400 dark:to-primary-500 dark:hover:from-primary-500 dark:hover:to-primary-600 dark:text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center dark:text-white">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Subscribe Now"
                      )}
                    </Button>
                  </form>
                </Form>
                <div className="flex items-center mt-4 text-sm text-muted-foreground dark:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary dark:text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Get weekly insights and writing tips
                </div>
              </div>
            </motion.div>

            {/* Classic badge-style statistics */}
            <div className="flex flex-wrap gap-6">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                  value: "700+",
                  label: "Active Members",
                  delay: 1.4
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ),
                  value: "4.9/5",
                  label: "User Reviews",
                  delay: 1.6
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  ),
                  value: "1200+",
                  label: "Articles Published",
                  delay: 1.8
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  className="flex items-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3 dark:bg-primary-400/10">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Featured content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="md:w-1/2"
          >
            <div className="relative">
              {/* Classic paper-style elements */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-primary/5 rounded-lg transform rotate-3 dark:bg-primary-400/5"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-secondary/5 rounded-lg transform -rotate-2 dark:bg-secondary-400/5"></div>

              {/* Main featured card */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-primary/10 backdrop-blur-sm dark:border-gray-700">
                <div className="aspect-[4/3] bg-gradient-to-tr from-gray-900 to-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                      alt="Featured blog post"
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex -space-x-2 mr-4">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                          alt="Author avatar"
                          className="w-10 h-10 rounded-full border-2 border-white"
                        />
                      </div>
                      <div className="text-white">
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs opacity-70">Mar 24, 2025 • 5 min read</p>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2 font-serif">
                      The Art of Mindful Blogging: Finding Your Authentic Voice
                    </h2>

                    <p className="text-white/80 mb-4 line-clamp-2">
                      Discover how mindful writing practices can transform your blogging journey and establish your unique voice.
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-primary/20 text-white rounded-full text-xs font-medium">Mindfulness</span>
                        <span className="px-3 py-1 bg-primary/20 text-white rounded-full text-xs font-medium">Writing</span>
                      </div>

                      <Button
                        variant="secondary"
                        size="sm"
                        asChild
                        className="text-sm font-medium dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                      >
                        <Link href="/blogs/the-art-of-mindful-blogging">Read Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional featured posts - Smaller cards */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                {
                  title: "Modern Web Design Trends",
                  author: "Michael Chen",
                  image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                  category: "Design"
                },
                {
                  title: "Travel Photography Tips",
                  author: "Emma Wilson",
                  image: "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                  category: "Photography"
                }
              ].map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + (index * 0.2) }}
                  className="relative overflow-hidden rounded-lg shadow-md border border-primary/10 dark:border-gray-700 dark:bg-gray-800"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-xs text-primary font-medium dark:text-primary-400">{post.category}</p>
                    <h3 className="text-sm font-bold line-clamp-2 dark:text-white">{post.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 dark:text-gray-300">{post.author}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-12"
          variants={scrollIndicator}
          animate="animate"
        >
          <div className="text-primary/60 flex flex-col items-center dark:text-primary-400/60">
            <p className="text-sm mb-2 font-serif dark:text-white">Scroll to explore</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}