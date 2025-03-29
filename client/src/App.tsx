import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";
import WebStories from "@/pages/WebStories";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import SearchResults from "@/pages/SearchResults";

import WebStoryView from "./components/web-stories/WebStoryView";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blogs" component={BlogList} />
      <Route path="/blogs/:slug" component={BlogPost} />
      <Route path="/category/:category" component={BlogList} />
      <Route path="/web-stories" component={WebStories} />
      <Route path="/web-stories/:slug" component={WebStoryView} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/auth/login" component={SignIn} />
      <Route path="/auth/signup" component={SignUp} />
      <Route path="/search" component={SearchResults} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
