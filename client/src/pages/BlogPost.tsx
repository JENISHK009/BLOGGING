import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchPostBySlug, fetchPosts, type Post } from "@/lib/blog-data";
import { marked } from "marked";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { BookOpen, Share2, Calendar, Eye, ArrowLeft, Heart, MessageSquare, ChevronRight, BookmarkPlus } from "lucide-react";

// Configure marked to return synchronously
marked.setOptions({
  async: false
});

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tableOfContents, setTableOfContents] = useState<{id: string; text: string; level: number}[]>([]);
  const [activeHeading, setActiveHeading] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      try {
        const data = await fetchPostBySlug(slug);
        setPost(data);
        
        // Load related posts from the same category
        if (data) {
          const allPosts = await fetchPosts();
          const filtered = allPosts
            .filter(p => p.id !== data.id && p.category.id === data.category.id)
            .slice(0, 3);
          setRelatedPosts(filtered);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    
    // Parse headings from the markdown content
    const tempDiv = document.createElement('div');
    const renderedContent = marked.parse(post.content);
    if (typeof renderedContent === 'string') {
      tempDiv.innerHTML = renderedContent;
      
      const headings = Array.from(tempDiv.querySelectorAll('h2, h3, h4'));
      const toc = headings.map(heading => {
        // Create id from heading text
        const id = heading.textContent?.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-') || '';
        
        // Set this id to the heading element so we can link to it
        heading.id = id;
        
        return {
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.substring(1)) // extracts the number from 'h2', 'h3', etc.
        };
      });
      
      setTableOfContents(toc);
      
      // Update the post content HTML with the ids added to headings
      const updatedHtml = tempDiv.innerHTML;
      tempDiv.remove();
      
      // Set the updated HTML with heading IDs
      if (post) {
        post.content = updatedHtml;
      }
    }
    
    // Set up intersection observer to highlight active section in TOC
    if (contentRef.current && tableOfContents.length > 0) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveHeading(entry.target.id);
            }
          });
        },
        { rootMargin: '-100px 0px -70% 0px' }
      );
      
      // Get all heading elements by their IDs
      tableOfContents.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      });
      
      return () => {
        // Clean up observer
        tableOfContents.forEach(item => {
          const element = document.getElementById(item.id);
          if (element) observer.unobserve(element);
        });
      };
    }
  }, [post, tableOfContents]);

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 w-3/4 mb-4 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-1/4 mb-8 rounded"></div>
              <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="hidden lg:block col-span-1">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 w-3/4 mb-4 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 w-5/6 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 w-4/6 rounded"></div>
                  </div>
                </div>
                <div className="col-span-1 lg:col-span-3">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 w-3/4 rounded"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 w-2/4 mt-8 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
                  </div>
                </div>
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
                Browse All Blogs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Format the date
  const publishDate = new Date(post.published_at);
  const formattedDate = publishDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Get reading time (roughly 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <>
      <Helmet>
        <title>{post.title} | Bloggers Ground</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Bloggers Ground`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.published_at} />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:section" content={post.category.name} />
        {post.tags.map(tag => (
          <meta key={tag.id} property="article:tag" content={tag.name} />
        ))}
        <link rel="canonical" href={`https://bloggersground.com/blogs/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
              "@type": "Person",
              "name": post.author.name
            },
            "datePublished": post.published_at,
            "image": post.cover_image,
            "publisher": {
              "@type": "Organization",
              "name": "Bloggers Ground",
              "logo": {
                "@type": "ImageObject",
                "url": "https://bloggersground.com/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://bloggersground.com/blogs/${slug}`
            }
          })}
        </script>
      </Helmet>

      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-5">
              <Link href="/blogs">
                <div className="text-primary hover:text-primary/80 transition-colors flex items-center mb-4 cursor-pointer">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Blogs
                </div>
              </Link>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              {/* Hero section with elegant typography */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-primary/20 dark:from-primary/10 dark:to-primary/30 p-6 md:p-10 mb-8 border border-primary/10">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full filter blur-xl"></div>
                <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-20 h-20 bg-primary/10 rounded-full filter blur-lg"></div>
                
                <div className="max-w-3xl relative">
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
                    {post.title}
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 font-serif italic">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-5 mb-6">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar size={15} className="mr-1.5" />
                      {formattedDate}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Eye size={15} className="mr-1.5" />
                      {post.views.toLocaleString()} views
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <BookOpen size={15} className="mr-1.5" />
                      {readingTime} min read
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary" className="px-3 py-1 rounded-full">
                      {post.category.name}
                    </Badge>
                    {post.tags.slice(0, 3).map(tag => (
                      <Badge key={tag.id} variant="outline" className="px-3 py-0.5 rounded-full">
                        {tag.name}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="outline" className="px-3 py-0.5 rounded-full">
                        +{post.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-10">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-800 shadow-sm">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback className="bg-primary text-white">
                      {post.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900 dark:text-white">{post.author.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{post.author.bio.split('.')[0]}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Share2 size={15} className="mr-1" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <BookmarkPlus size={15} className="mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl overflow-hidden mb-10"
            >
              <img 
                src={post.cover_image} 
                alt={post.title} 
                className="w-full h-auto object-cover rounded-xl shadow-md"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            >
              {/* Side content with TOC */}
              <aside className="order-2 lg:order-1 col-span-1">
                <div className="lg:sticky lg:top-24">
                  {tableOfContents.length > 0 && (
                    <Card className="mb-6">
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold mb-3 flex items-center">
                          <BookOpen size={18} className="mr-2 text-primary" />
                          Table of Contents
                        </h3>
                        <ScrollArea className="h-auto max-h-[calc(100vh-250px)]">
                          <nav className="space-y-1">
                            {tableOfContents.map((item) => (
                              <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={`
                                  block py-1 pl-${(item.level - 2) * 3} border-l-2 
                                  ${activeHeading === item.id 
                                    ? 'border-primary text-primary font-medium' 
                                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                                  }
                                  transition-colors text-sm
                                `}
                                style={{ paddingLeft: `${(item.level - 2) * 16 + 8}px` }}
                              >
                                {item.text}
                              </a>
                            ))}
                          </nav>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  )}
                  
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold mb-3">Join the Discussion</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center">
                            <Heart size={15} className="mr-1.5 text-red-500" />
                            324 Likes
                          </span>
                          <span className="flex items-center">
                            <MessageSquare size={15} className="mr-1.5 text-primary" />
                            56 Comments
                          </span>
                        </div>
                        <Button variant="outline" className="w-full">Leave a Comment</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </aside>
              
              {/* Main content */}
              <div className="order-1 lg:order-2 col-span-1 lg:col-span-3" ref={contentRef}>
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none mb-10"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                <Separator className="my-10" />
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {post.tags.map(tag => (
                    <Badge key={tag.id} variant="outline" className="px-3 py-1 text-sm rounded-full">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                  <div className="w-full md:w-1/2 bg-primary/10 dark:bg-primary/20 rounded-xl p-6 border border-primary/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400 uppercase font-medium mb-1">Share this article</p>
                    <h3 className="text-xl font-bold mb-3">Spread the knowledge</h3>
                    <div className="flex space-x-3">
                      <Button size="sm" variant="secondary" className="rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                        </svg>
                        Twitter
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                        Facebook
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 uppercase font-medium mb-1">Stay updated</p>
                    <h3 className="text-xl font-bold mb-3">Subscribe to newsletter</h3>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        placeholder="Enter your email" 
                        type="email" 
                        className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                      />
                      <Button>Subscribe</Button>
                    </div>
                  </div>
                </div>
                
                {relatedPosts.length > 0 && (
                  <div className="mb-10">
                    <h3 className="text-2xl font-serif font-bold mb-6 flex items-center">
                      More Articles
                      <span className="ml-2 w-10 h-px bg-primary"></span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost, index) => (
                        <motion.div 
                          key={relatedPost.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                          className="group"
                        >
                          <Link href={`/blogs/${relatedPost.slug}`}>
                            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 h-full">
                              <div className="relative h-48 overflow-hidden">
                                <img 
                                  src={relatedPost.cover_image} 
                                  alt={relatedPost.title} 
                                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                  <Badge variant="secondary" className="rounded-full text-xs">
                                    {relatedPost.category.name}
                                  </Badge>
                                </div>
                              </div>
                              <div className="p-5">
                                <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                  {relatedPost.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                  {relatedPost.excerpt}
                                </p>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-500 dark:text-gray-400">
                                    {new Date(relatedPost.published_at).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                    })}
                                  </span>
                                  <span className="text-primary font-medium flex items-center">
                                    Read Article
                                    <ChevronRight size={16} className="ml-1" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
