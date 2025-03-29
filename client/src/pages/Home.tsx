import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WaitlistSection from "@/components/home/WaitlistSection";
import FeaturedPosts from "@/components/blog/FeaturedPosts";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>BlogWave - Modern Blogging Platform</title>
        <meta name="description" content="A next-generation blogging platform with top-tier SEO, advanced animations, and modern UI/UX design." />
        <meta property="og:title" content="BlogWave - Modern Blogging Platform" />
        <meta property="og:description" content="A next-generation blogging platform with top-tier SEO, advanced animations, and modern UI/UX design." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blogwave.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BlogWave - Modern Blogging Platform" />
        <meta name="twitter:description" content="A next-generation blogging platform with top-tier SEO, advanced animations, and modern UI/UX design." />
      </Helmet>
      
      <HeroSection />
      <FeaturedPosts />
      <FeatureSection />
      <TestimonialsSection />
      <WaitlistSection />
    </>
  );
}
