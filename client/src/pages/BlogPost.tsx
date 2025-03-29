import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchPostBySlug, type Post } from "@/lib/blog-data";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      try {
        const data = await fetchPostBySlug(slug);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 w-3/4 mb-4 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-1/4 mb-8 rounded"></div>
              <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-3/4 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/blogs">
                <a>Browse All Blogs</a>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Display a placeholder blog with dummy content
  return (
    <>
      <Helmet>
        <title>Building the Ultimate Blog Platform | BlogWave</title>
        <meta name="description" content="Learn about the features and benefits of modern blogging platforms and how they can help you grow your audience." />
        <meta property="og:title" content="Building the Ultimate Blog Platform | BlogWave" />
        <meta property="og:description" content="Learn about the features and benefits of modern blogging platforms and how they can help you grow your audience." />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2023-05-15T10:00:00+00:00" />
        <meta property="article:author" content="Sarah Johnson" />
        <meta property="article:section" content="Technology" />
        <meta property="article:tag" content="Blogging" />
        <meta property="article:tag" content="SEO" />
      </Helmet>

      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link href="/blogs">
                <a className="text-primary hover:text-primary/80 transition-colors flex items-center mb-4">
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Blogs
                </a>
              </Link>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Building the Ultimate Blog Platform</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Badge variant="outline">Technology</Badge>
                <span className="text-gray-500 dark:text-gray-400">
                  <i className="far fa-calendar mr-1"></i>
                  May 15, 2023
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  <i className="far fa-eye mr-1"></i>
                  2,547 views
                </span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl overflow-hidden mb-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Building the Ultimate Blog Platform" 
                className="w-full h-auto"
              />
            </motion.div>
            
            <div className="flex items-center mb-8">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" alt="Sarah Johnson" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Content Strategist & SEO Expert</p>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <h2>Introduction to Modern Blogging</h2>
              <p>
                In the ever-evolving digital landscape, blogging has transformed from simple online journaling to sophisticated content marketing platforms. The most successful blogs today combine engaging content with powerful technical features that enhance both user experience and search engine visibility.
              </p>
              
              <p>
                The key to building a successful blog in today's competitive environment lies in prioritizing three critical elements:
              </p>
              
              <ul>
                <li>Technical excellence and SEO optimization</li>
                <li>Engaging user experience with modern design</li>
                <li>Monetization strategies that drive sustainable growth</li>
              </ul>
              
              <h2>SEO: The Foundation of Visibility</h2>
              <p>
                Search Engine Optimization remains the cornerstone of any successful blogging platform. Modern blogs need to implement:
              </p>
              
              <ul>
                <li><strong>Server-Side Rendering (SSR)</strong>: Improves page load times and makes content immediately visible to search engine crawlers</li>
                <li><strong>Static Site Generation (SSG)</strong>: Pre-renders pages at build time for lightning-fast delivery</li>
                <li><strong>Schema Markup</strong>: Structured data that helps search engines understand your content and display rich snippets</li>
                <li><strong>Core Web Vitals optimization</strong>: Focusing on Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS)</li>
              </ul>
              
              <p>
                Implementing these technical features can dramatically improve organic traffic and visibility, setting your blog apart from competitors who neglect these critical aspects.
              </p>
              
              <blockquote>
                "The best SEO strategy is to create exceptional content on a technically sound platform. When these elements align, organic growth becomes inevitable."
              </blockquote>
              
              <h2>User Experience: Beyond Aesthetics</h2>
              <p>
                While beautiful design attracts users, it's the overall experience that retains them. Modern blogs should feature:
              </p>
              
              <ul>
                <li><strong>Responsive design</strong> that works flawlessly across all devices</li>
                <li><strong>Dark mode support</strong> to reduce eye strain and provide options</li>
                <li><strong>Accessibility features</strong> that make content available to everyone</li>
                <li><strong>Intuitive navigation</strong> that helps users discover more content</li>
              </ul>
              
              <p>
                Incorporating micro-interactions and subtle animations can also dramatically improve engagement, creating a memorable experience that encourages users to return and share your content.
              </p>
              
              <h2>Monetization: Sustainable Growth</h2>
              <p>
                Building a great blog platform ultimately needs to support business goals. Effective monetization strategies include:
              </p>
              
              <ul>
                <li>Programmatic advertising with Google AdSense</li>
                <li>Affiliate marketing with strategically placed links</li>
                <li>Premium content and subscription models</li>
                <li>Sponsored content opportunities</li>
              </ul>
              
              <p>
                The key is implementing these revenue streams without sacrificing user experience or content quality. The best blogging platforms seamlessly integrate monetization in ways that feel natural and non-intrusive.
              </p>
              
              <h2>Conclusion: The Future of Blogging</h2>
              <p>
                As we look toward the future, successful blogs will continue to evolve with technology while maintaining focus on what truly matters: valuable content delivered through exceptional user experiences. By building on a foundation of technical excellence, SEO best practices, and thoughtful monetization, bloggers can create platforms that not only attract audiences but sustain long-term growth.
              </p>
              
              <p>
                The ultimate blog platform isn't just about features—it's about creating a digital environment where content thrives and audiences feel valued and engaged.
              </p>
            </motion.div>
            
            <Separator className="my-8" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Blogging</Badge>
                <Badge variant="outline">SEO</Badge>
                <Badge variant="outline">Web Development</Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">Share:</span>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get the latest blogs and updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input placeholder="Enter your email" type="email" className="flex-grow" />
                <Button>Subscribe</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="10 SEO Techniques for 2023" 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-bold mb-2">10 SEO Techniques for 2023</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                      Discover the latest SEO strategies that are driving organic traffic growth in 2023.
                    </p>
                    <Button variant="link" className="p-0">Read More</Button>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="Monetizing Your Blog in 2023" 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-bold mb-2">Monetizing Your Blog in 2023</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                      Learn about the most effective ways to generate revenue from your blog content.
                    </p>
                    <Button variant="link" className="p-0">Read More</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
