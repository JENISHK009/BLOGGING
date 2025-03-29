import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";

interface FeatureCardProps {
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  features: string[];
  index: number;
}

function FeatureCard({ icon, iconColor, iconBg, title, description, features, index }: FeatureCardProps) {
  return (
    <motion.div 
      className="rounded-xl p-6 bg-white dark:bg-gray-800 transition-colors shadow-lg dark:shadow-gray-900/10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className={`w-14 h-14 rounded-lg ${iconBg} flex items-center justify-center ${iconColor} mb-5`}>
        <i className={`${icon} text-2xl`}></i>
      </div>
      <h3 className="font-inter text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <i className="fas fa-check text-green-500 mr-2"></i>
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function FeatureSection() {
  const features = [
    {
      icon: "fas fa-search",
      iconColor: "text-primary-600 dark:text-primary-400",
      iconBg: "bg-primary-100 dark:bg-primary-900/30",
      title: "SEO Optimization",
      description: "Built-in tools for Schema Markup, Meta Tags, and Core Web Vitals optimization to rank higher in search results.",
      features: ["Server-side rendering (SSR)", "Static site generation (SSG)", "Automatic sitemap generation"]
    },
    {
      icon: "fas fa-paint-brush",
      iconColor: "text-secondary-600 dark:text-secondary-400",
      iconBg: "bg-secondary-100 dark:bg-secondary-900/30",
      title: "Modern UI/UX Design",
      description: "Beautiful, responsive designs with dark/light mode and trending styles like Glassmorphism and Neumorphism.",
      features: ["Responsive layouts for all devices", "Dark and light mode toggle", "Custom theme options"]
    },
    {
      icon: "fas fa-dollar-sign",
      iconColor: "text-green-600 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      title: "Monetization Ready",
      description: "Built-in tools for AdSense integration, affiliate marketing, and subscription models to earn from your content.",
      features: ["Google AdSense integration", "Affiliate link management", "Premium content gating"]
    },
    {
      icon: "fas fa-cubes",
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      title: "3D Animations",
      description: "Stunning interactive animations powered by Framer Motion and Three.js to captivate your audience.",
      features: ["Interactive 3D elements", "Scroll-triggered animations", "Micro-interactions for engagement"]
    },
    {
      icon: "fas fa-book-open",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
      title: "Web Stories",
      description: "AMP-powered Web Stories for engaging, mobile-first content that appears in Google Search and Discover.",
      features: ["Visual story editor", "AMP compatibility", "Analytics integration"]
    },
    {
      icon: "fas fa-shield-alt",
      iconColor: "text-red-600 dark:text-red-400",
      iconBg: "bg-red-100 dark:bg-red-900/30",
      title: "Secure Authentication",
      description: "Social login options with Google, GitHub, and Email for easy access to your dashboard and community features.",
      features: ["Social login options", "Secure password management", "Two-factor authentication"]
    }
  ];

  return (
    <AnimatedSection 
      id="features" 
      className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="font-inter text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Powerful Features for Modern Bloggers
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Everything you need to create, grow, and monetize your blog with best-in-class tools
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              iconColor={feature.iconColor}
              iconBg={feature.iconBg}
              title={feature.title}
              description={feature.description}
              features={feature.features}
              index={index}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
