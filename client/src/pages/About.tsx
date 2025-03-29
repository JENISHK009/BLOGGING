import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";
import AnimatedSection from "@/components/shared/AnimatedSection";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  index: number;
}

function TeamMember({ name, role, bio, image, index }: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{role}</p>
      <p className="text-gray-600 dark:text-gray-300">{bio}</p>
      <div className="flex space-x-3 mt-4">
        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
          <i className="fab fa-github"></i>
        </a>
      </div>
    </motion.div>
  );
}

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former Google engineer with a passion for blogging and content creation.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
    },
    {
      name: "David Chen",
      role: "CTO",
      bio: "Full-stack developer with expertise in performance optimization and UI/UX.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
    },
    {
      name: "Michelle Patel",
      role: "Head of Content",
      bio: "Content strategist with 10+ years experience in digital marketing and SEO.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
    },
    {
      name: "James Wilson",
      role: "Product Manager",
      bio: "User experience specialist focused on creating intuitive, powerful products.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Bloggers Ground</title>
        <meta name="description" content="Learn about the team behind Bloggers Ground and our mission to revolutionize blogging with modern technology, top-tier SEO, and comprehensive content tools." />
        <meta name="keywords" content="about bloggers ground, blogging platform team, content creation experts, blog technology, seo optimized blogging" />
        <meta property="og:title" content="About Us | Bloggers Ground" />
        <meta property="og:description" content="Learn about the team behind Bloggers Ground and our mission to revolutionize blogging with modern technology, top-tier SEO, and comprehensive content tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bloggersground.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Bloggers Ground" />
        <meta name="twitter:description" content="Learn about the team behind Bloggers Ground and our mission to revolutionize blogging with modern technology, top-tier SEO, and comprehensive content tools." />
        <link rel="canonical" href="https://bloggersground.com/about" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Bloggers Ground",
            "url": "https://bloggersground.com",
            "logo": "https://bloggersground.com/logo.png",
            "description": "A next-generation blogging platform with top-tier SEO, advanced animations, and modern UI/UX design",
            "founder": {
              "@type": "Person",
              "name": "Sarah Johnson"
            },
            "foundingDate": "2022",
            "employees": [
              {
                "@type": "Person",
                "name": "Sarah Johnson",
                "jobTitle": "Founder & CEO"
              },
              {
                "@type": "Person",
                "name": "David Chen",
                "jobTitle": "CTO"
              },
              {
                "@type": "Person",
                "name": "Michelle Patel",
                "jobTitle": "Head of Content"
              },
              {
                "@type": "Person",
                "name": "James Wilson",
                "jobTitle": "Product Manager"
              }
            ]
          })}
        </script>
      </Helmet>

      <AnimatedSection className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h1 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Bloggers Ground</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Revolutionizing the blogging experience with modern technology and top-tier SEO
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At Bloggers Ground, we believe that content creators deserve powerful, beautiful tools that help their ideas reach the world. We're on a mission to democratize publishing by combining enterprise-grade features with intuitive design.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our platform is built on three core principles: exceptional SEO performance, stunning user experience, and valuable monetization opportunities. We're committed to helping bloggers grow their audience and build sustainable businesses around their content.
              </p>
              <div className="flex space-x-4">
                <Button asChild>
                  <Link href="/contact">
                    <a>Contact Us</a>
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/blogs">
                    <a>Our Blog</a>
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-3xl transform translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="The Bloggers Ground team" 
                className="rounded-xl relative z-10 w-full h-auto shadow-lg"
              />
            </motion.div>
          </div>
          
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Meet the passionate individuals behind Bloggers Ground who are dedicated to building the future of blogging technology.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  image={member.image}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The principles that guide everything we do at Bloggers Ground.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We constantly push boundaries to create new and better ways for content creators to express themselves.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                  <i className="fas fa-users text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Community</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We believe in the power of community to inspire, support, and elevate content creation.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                  <i className="fas fa-shield-alt text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Reliability</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We build technology that content creators can depend on, with performance and security as top priorities.
                </p>
              </motion.div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0 md:mr-12 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to join our community?</h3>
                  <p className="text-white/90 text-lg mb-6">
                    Start your blogging journey with Bloggers Ground today.
                  </p>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/#waitlist">
                      <a>Join Our Waitlist</a>
                    </Link>
                  </Button>
                </div>
                <div className="w-full md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="Person blogging on laptop" 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
