// This file contains sample data structures for the blog
// In a real implementation, this would be fetched from the API

export interface Author {
  id: number;
  name: string;
  avatar: string;
  bio: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: Author;
  category: Category;
  tags: Tag[];
  published_at: string;
  is_featured: boolean;
  views: number;
}

export const categories: Category[] = [
  { 
    id: 1, 
    name: "Technology", 
    slug: "technology", 
    description: "Latest tech news and reviews" 
  },
  { 
    id: 2, 
    name: "Design", 
    slug: "design", 
    description: "UI/UX and graphic design trends" 
  },
  { 
    id: 3, 
    name: "Business", 
    slug: "business", 
    description: "Entrepreneurship and business strategies" 
  },
  { 
    id: 4, 
    name: "Lifestyle", 
    slug: "lifestyle", 
    description: "Health, wellness, and daily living tips" 
  },
  { 
    id: 5, 
    name: "Travel", 
    slug: "travel", 
    description: "Travel guides and experiences" 
  }
];

export const authors: Author[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    bio: "Tech enthusiast and software engineer with 5+ years of experience in web development."
  },
  {
    id: 2,
    name: "David Chen",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    bio: "UX designer and product strategist helping companies build better digital experiences."
  },
  {
    id: 3,
    name: "Michelle Patel",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    bio: "Digital marketing specialist with expertise in SEO and content strategy."
  }
];

export const tags: Tag[] = [
  { id: 1, name: "JavaScript", slug: "javascript" },
  { id: 2, name: "React", slug: "react" },
  { id: 3, name: "SEO", slug: "seo" },
  { id: 4, name: "Design", slug: "design" },
  { id: 5, name: "Productivity", slug: "productivity" },
  { id: 6, name: "Business", slug: "business" }
];

// These will be replaced with API data in production
export const fetchFeaturedPosts = async (): Promise<Post[]> => {
  // In reality, this would be an API call
  return []; 
};

export const fetchPosts = async (category?: string): Promise<Post[]> => {
  // In reality, this would be an API call with filtering
  return [];
};

export const fetchPostBySlug = async (slug: string): Promise<Post | null> => {
  // In reality, this would be an API call to get a specific post
  return null;
};

export const fetchCategories = async (): Promise<Category[]> => {
  // In reality, this would be an API call
  return categories;
};
