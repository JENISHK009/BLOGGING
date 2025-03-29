import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";

interface TestimonialProps {
  rating: number;
  quote: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  index: number;
}

function Testimonial({ rating, quote, author, index }: TestimonialProps) {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-xl transition-colors shadow-lg dark:shadow-gray-900/10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center mb-4">
        <div className="text-yellow-400 flex">
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={i < rating ? "fas fa-star" : i === Math.floor(rating) && rating % 1 !== 0 ? "fas fa-star-half-alt" : "far fa-star"}
            ></i>
          ))}
        </div>
        <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">{rating.toFixed(1)}</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
        "{quote}"
      </p>
      <div className="flex items-center">
        <img 
          src={author.image} 
          alt={author.name} 
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="font-medium">{author.name}</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{author.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const testimonials = [
    {
      rating: 5,
      quote: "BlogWave completely transformed how I create content. The SEO tools have helped me double my organic traffic in just two months!",
      author: {
        name: "Sarah Johnson",
        role: "Food Blogger",
        image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
      }
    },
    {
      rating: 5,
      quote: "The Web Stories feature is a game-changer. I'm getting more engagement from Google Discover and my audience loves the interactive content.",
      author: {
        name: "David Chen",
        role: "Tech Reviewer",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
      }
    },
    {
      rating: 4.5,
      quote: "I've tried many blogging platforms, but none have the monetization features of BlogWave. My AdSense revenue has increased by 35% since switching.",
      author: {
        name: "Michelle Patel",
        role: "Lifestyle Blogger",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
      }
    }
  ];

  return (
    <AnimatedSection id="testimonials" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="font-inter text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Our Users Are Saying
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Feedback from our community of bloggers and content creators
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              rating={testimonial.rating}
              quote={testimonial.quote}
              author={testimonial.author}
              index={index}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
