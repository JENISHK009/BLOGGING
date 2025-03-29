import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import SignUpForm from "@/components/auth/SignUpForm";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";

export default function SignUp() {
  const { user, isLoading } = useAuth();
  
  // If user is already logged in, redirect to home page
  // Note: We do this check after hook calls to avoid violating rules of hooks
  if (!isLoading && user) {
    return <Redirect to="/" />;
  }
  
  return (
    <>
      <Helmet>
        <title>Sign Up | Bloggers Ground</title>
        <meta name="description" content="Create your Bloggers Ground account to access exclusive content, get personalized recommendations, and join our growing community of bloggers and content creators." />
        <meta name="keywords" content="register, sign up, create account, blogging platform, bloggers ground, join community" />
        <meta property="og:title" content="Sign Up | Bloggers Ground" />
        <meta property="og:description" content="Create your Bloggers Ground account to access exclusive content, get personalized recommendations, and join our growing community of bloggers and content creators." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bloggersground.com/auth/signup" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sign Up | Bloggers Ground" />
        <meta name="twitter:description" content="Create your Bloggers Ground account to access exclusive content, get personalized recommendations, and join our growing community of bloggers and content creators." />
        <link rel="canonical" href="https://bloggersground.com/auth/signup" />
      </Helmet>
      
      <div className="relative min-h-screen py-16 flex justify-center items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 to-background"></div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-4 sm:px-6">
          {/* Left column - Form */}
          <motion.div 
            className="bg-background/80 backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SignUpForm />
          </motion.div>
          
          {/* Right column - Hero content */}
          <motion.div 
            className="flex flex-col justify-center text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-6">
              Join <span className="text-primary">Bloggers Ground</span> Today
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Create an account to unlock the full potential of our platform. Get personalized recommendations, save your favorite content, and become part of our growing community.
            </p>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </span>
                <div>
                  <h3 className="font-medium">Personalized Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Content recommendations based on your interests and reading habits
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </span>
                <div>
                  <h3 className="font-medium">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">
                    Your data is always secure and your privacy is our priority
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </span>
                <div>
                  <h3 className="font-medium">Join the Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Engage with like-minded readers and creators
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}