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
        <title>Bloggers Ground - Modern Blogging Platform</title>
        <meta name="description" content="A next-generation blogging platform with top-tier SEO, advanced animations, and modern UI/UX design." />
        <meta property="og:title" content="Bloggers Ground - Modern Blogging Platform" />
        <meta property="og:description" content="A next-generation blogging platform with top-tier SEO, advanced animations, and modern UI/UX design." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bloggersground.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bloggers Ground - Modern Blogging Platform" />
        <meta name="twitter:description" content="A next-generation blogging platform with top-tier SEO, advanced animations, and modern UI/UX design." />
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
