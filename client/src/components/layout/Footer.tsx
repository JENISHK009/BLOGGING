import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 transition-colors pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link href="/">
              <a className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                  B
                </div>
                <span className="font-serif font-bold text-xl">Bloggers Ground</span>
              </a>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The next-generation blogging platform with top-tier SEO optimization, beautiful animations, classic design, and modern UI/UX features to help you reach a wider audience.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-inter font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blogs">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    All Blogs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/category/technology">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Technology
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/category/design">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Design
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/category/business">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Business
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-inter font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Contact
                  </a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-inter font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Bloggers Ground. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy">
                <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </a>
              </Link>
              <Link href="/terms-of-service">
                <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">
                  Terms of Service
                </a>
              </Link>
              <Link href="/cookie-policy">
                <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">
                  Cookies
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
