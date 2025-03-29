import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import SignInForm from "@/components/auth/SignInForm";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";

export default function SignIn() {
  const { user, isLoading } = useAuth();
  
  // If user is already logged in, redirect to home page
  // Note: We do this check after hook calls to avoid violating rules of hooks
  if (!isLoading && user) {
    return <Redirect to="/" />;
  }
  
  return (
    <>
      <Helmet>
        <title>Sign In | BlogWave</title>
        <meta name="description" content="Sign in to your BlogWave account" />
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
            <SignInForm />
          </motion.div>
          
          {/* Right column - Hero content */}
          <motion.div 
            className="flex flex-col justify-center text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-6">
              Welcome to <span className="text-primary">Bloggers Ground</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your platform for discovering and sharing insightful content across a variety of topics. Sign in to access personalized feeds, bookmark your favorite articles, and join the conversation.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center md:items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 12h.01"></path>
                    <path d="M12 5v7"></path>
                    <path d="M17.4 20.1a9 9 0 1 0-10.8 0"></path>
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Personalized Content</h3>
                <p className="text-sm text-muted-foreground">Discover content tailored to your interests and preferences.</p>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Exclusive Features</h3>
                <p className="text-sm text-muted-foreground">Access to Web Stories, comments, and community features.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}