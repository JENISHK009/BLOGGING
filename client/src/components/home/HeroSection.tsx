import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";

export default function HeroSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const floatingImage = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatedSection className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 md:pr-10 text-center md:text-left mb-10 md:mb-0"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h1 
              className="font-inter font-bold text-4xl sm:text-5xl md:text-6xl leading-tight mb-6"
              variants={item}
            >
              Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Beautiful Blogs</span> That Convert
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl md:max-w-none"
              variants={item}
            >
              A next-generation blogging platform with top-tier SEO, advanced animations, and modern UI/UX that helps you grow your audience and monetize your content.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
              variants={item}
            >
              <Button size="lg" asChild>
                <Link href="/blogs">
                  <a>Browse Blogs</a>
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
              >
                <Link href="/about">
                  <a>Learn More</a>
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex items-center justify-center md:justify-start"
              variants={item}
            >
              <div className="flex -space-x-2">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" 
                  alt="User avatar" 
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" 
                  alt="User avatar" 
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" 
                  alt="User avatar" 
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" 
                />
              </div>
              <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">250+</span> creators joined the platform
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            animate="animate"
            variants={floatingImage}
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-3xl"></div>
              <div className="relative dark:neumorphic-dark rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Blog platform interface showcase" 
                  className="w-full h-auto rounded-t-xl object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-inter font-semibold text-lg">Modern Blogging Platform</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Edit and publish with ease</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs py-1 px-2 rounded-full">
                      Live Preview
                    </div>
                  </div>
                  <div className="flex space-x-2 mb-2">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-700 dark:text-gray-300">Content</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-700 dark:text-gray-300">SEO</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-700 dark:text-gray-300">Analytics</span>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="absolute -top-16 right-10 hidden md:block"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                delay: 1
              }}
            >
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                  <i className="fas fa-chart-line text-primary"></i>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-10 left-0 hidden md:block"
              animate={{ 
                y: [0, 10, 0],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                delay: 0.5
              }}
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                  <i className="fas fa-search text-secondary"></i>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
