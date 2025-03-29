import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WaitlistSection from "@/components/home/WaitlistSection";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import WebStoriesPreview from "@/components/home/WebStoriesPreview";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Bloggers Ground - Modern Blogging Platform with SEO Optimization</title>
        <meta name="description" content="Discover Bloggers Ground - A next-generation blogging platform with top-tier SEO, advanced animations, modern UI/UX design, and comprehensive content management." />
        <meta name="keywords" content="blog platform, SEO optimized blog, content creation, bloggers community, writing platform, web stories, classic blog design" />
        <meta property="og:title" content="Bloggers Ground - Modern Blogging Platform with SEO Optimization" />
        <meta property="og:description" content="Discover Bloggers Ground - A next-generation blogging platform with top-tier SEO, advanced animations, modern UI/UX design, and comprehensive content management." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bloggersground.com" />
        <meta property="og:image" content="https://bloggersground.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bloggers Ground - Modern Blogging Platform with SEO Optimization" />
        <meta name="twitter:description" content="Discover Bloggers Ground - A next-generation blogging platform with top-tier SEO, advanced animations, modern UI/UX design, and comprehensive content management." />
        <meta name="twitter:image" content="https://bloggersground.com/twitter-image.jpg" />
        
        {/* Structured data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Bloggers Ground",
            "url": "https://bloggersground.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://bloggersground.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "description": "A next-generation blogging platform with top-tier SEO, advanced animations, and modern UI/UX design.",
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
      
      <HeroSection />
      <FeaturedPosts />
      <WebStoriesPreview />
      <FeatureSection />
      <TestimonialsSection />
      <WaitlistSection />
    </>
  );
}
