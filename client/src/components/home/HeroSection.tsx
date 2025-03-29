import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
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

const signUpSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type QuickSignUpFormValues = z.infer<typeof signUpSchema>;

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
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

  // Floating elements animation
  const floatingElements = [
    {
      icon: "📝",
      style: "top-[15%] right-[10%] w-16 h-16",
      animation: {
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 5, 0],
        transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
      },
    },
    {
      icon: "🔍",
      style: "top-[60%] left-[5%] w-12 h-12",
      animation: {
        y: [0, 15, 0],
        x: [0, -10, 0],
        rotate: [0, -5, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
      },
    },
    {
      icon: "📊",
      style: "bottom-[20%] right-[15%] w-14 h-14",
      animation: {
        y: [0, 10, 0],
        x: [0, -5, 0],
        rotate: [0, 3, 0],
        transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
      },
    },
  ];

  return (
    <div ref={ref} className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background min-h-screen">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-3xl"></div>
        
        {/* Floating animated elements */}
        {floatingElements.map((el, index) => (
          <motion.div
            key={index}
            className={`absolute ${el.style} bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg z-10 hidden md:flex`}
            animate={el.animation}
          >
            <span className="text-2xl">{el.icon}</span>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32"
        style={{ y, opacity }}
      >
        <div className="flex flex-col items-center text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
          >
            <span className="inline-block relative">
              Discover
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                className="absolute -bottom-2 left-0 h-3 bg-primary/30 rounded-lg -z-10"
              ></motion.span>
            </span>
            {" "}the World of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-snug">
              Blogging Excellence
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
          >
            Your destination for insightful content, expert opinions, and the latest trends across technology, lifestyle, travel, and more. Join our community of passionate readers and writers.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="w-full max-w-md mx-auto mb-8"
          >
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
                            className="h-12 px-4 focus-visible:ring-primary"
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
                  className="h-12 px-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex items-center justify-center space-x-6 mb-10"
          >
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                ].map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt={`User ${i+1}`}
                    className="w-8 h-8 rounded-full border-2 border-background"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + (i * 0.1) }}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold">700+</span> Active Members
              </span>
            </div>
            
            <div className="h-6 border-l border-gray-300 dark:border-gray-700"></div>
            
            <div className="flex items-center">
              <div className="flex items-center text-amber-500 mr-2">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 + (i * 0.1) }}
                  >
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </motion.svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold">4.9/5</span> Reviews
              </span>
            </div>
          </motion.div>
        </div>
        
        {/* Featured Blog Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="aspect-[16/9] bg-gradient-to-tr from-gray-900 to-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Featured blog post"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
            </div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
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
                <div className="ml-auto">
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/blogs/the-art-of-mindful-blogging">Read Now</Link>
                  </Button>
                </div>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                The Art of Mindful Blogging: Finding Your Authentic Voice
              </h2>
              
              <p className="text-white/80 mb-4 max-w-3xl text-base md:text-lg">
                Discover how mindful writing practices can transform your blogging journey, help you connect with your audience on a deeper level, and establish your unique voice in the digital world.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/20 text-white rounded-full text-xs font-medium">Mindfulness</span>
                <span className="px-3 py-1 bg-primary/20 text-white rounded-full text-xs font-medium">Writing</span>
                <span className="px-3 py-1 bg-primary/20 text-white rounded-full text-xs font-medium">Creativity</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="flex justify-center mt-12"
          variants={scrollIndicator}
          animate="animate"
        >
          <div className="text-primary/60 flex flex-col items-center">
            <p className="text-sm mb-2">Scroll to explore</p>
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
      </motion.div>
    </div>
  );
}
