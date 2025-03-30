import axios from "axios";
import TurndownService from "turndown";

// Constants
const API_BASE_URL = "https://bloggersground-backend.onrender.com/blog";
const COMMON_HEADERS = {
  accept: "*/*",
  "accept-language": "en-US,en;q=0.9",
  origin: "https://www.bloggersground.in",
  priority: "u=1, i",
  referer: "https://www.bloggersground.in/",
  "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Linux"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "cross-site",
  "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
};

// Interfaces
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
  id: string;
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

// Common API function
async function fetchAPI<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      params,
      headers: COMMON_HEADERS,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

// Helper functions
function generateSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

const turndownService = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
  strongDelimiter: "**",
  linkStyle: "inlined",
});

turndownService.addRule("pre", {
  filter: "pre",
  replacement: (content: any) => `\`\`\`\n${content}\n\`\`\`\n\n`,
});

export const htmlToMarkdown = (html: string): string => {
  return turndownService.turndown(html);
};

// Default values
const DEFAULT_AUTHOR: Author = {
  id: 1,
  name: "Bloggers Ground",
  avatar: "https://www.bloggersground.in/favicon.ico",
  bio: "Tech enthusiast and software engineer with 5+ years of experience in web development.",
};

const DEFAULT_TAGS: Tag[] = [
  { id: 1, name: "blog", slug: "blog" },
  { id: 2, name: "article", slug: "article" },
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Coding: "Programming tutorials and development resources",
  "Digital Marketing": "Digital marketing strategies and trends",
  Fashion: "Latest fashion trends and style guides",
  Finance: "Personal finance tips and investment advice",
  Food: "Recipes, cooking techniques, and food culture",
  Health: "Health tips, wellness advice, and medical insights",
  "Life Hacks": "Productivity tips and life optimization",
  Sport: "Sports news, analysis, and fitness guides",
  Technology: "Tech news, gadget reviews, and innovations",
  Travel: "Travel guides, destination tips, and adventure stories",
};

// API functions
export const fetchFeaturedPosts = async (): Promise<Post[]> => {
  const data = await fetchAPI<{ data: any[] }>("getAllBlogs", {
    categoryFilter: "",
    page: 1,
    limit: 12,
  });
  return mapApiPosts(data.data);
};

export const fetchPosts = async (
  category?: string,
  pagination?: { page: number; limit: number }
): Promise<{
  posts: Post[];
  pagination: { totalPages: number; totalItems: number; currentPage: number };
}> => {
  const { page = 1, limit = 12 } = pagination || {};
  const data = await fetchAPI<{ data: any[]; totalPages: number }>("getAllBlogs", {
    categoryFilter: category || "",
    page,
    limit,
  });

  return {
    posts: mapApiPosts(data.data),
    pagination: {
      totalPages: data.totalPages,
      totalItems: limit,
      currentPage: page,
    },
  };
};

export const fetchPostBySlug = async (id: string): Promise<Post | null> => {
  try {
    const data = await fetchAPI<any>(`getblogbyid/?id=${id}`);
    return mapApiPost(data);
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const data = await fetchAPI<{ categories: string[] }>("getBlogCategories");
    return data.categories.map((name, index) => ({
      id: index + 1,
      name,
      slug: generateSlug(name),
      description: CATEGORY_DESCRIPTIONS[name] || `Latest ${name.toLowerCase()} content and news`,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Mapping functions
function mapApiPosts(apiPosts: any[]): Post[] {
  return apiPosts.map((item, index) => ({
    id: item._id,
    title: item.title || "Untitled",
    slug: generateSlug(item.title || "untitled"),
    excerpt: item.description ? `${item.description.slice(0, 100)}...` : "No excerpt available",
    content: item.description || "No content available",
    cover_image: item.coverImage || "https://via.placeholder.com/800x400?text=Bloggers+Ground",
    author: DEFAULT_AUTHOR,
    category: {
      id: index + 1,
      name: item.category?.[0] || "Uncategorized",
      slug: generateSlug(item.category?.[0] || "uncategorized"),
      description: "",
    },
    tags: DEFAULT_TAGS,
    published_at: item.createdAt ? new Date(item.createdAt).toISOString() : new Date().toISOString(),
    is_featured: false,
    views: 0,
  }));
}

function mapApiPost(apiPost: any): Post {
  return {
    id: apiPost._id,
    title: apiPost.title,
    slug: generateSlug(apiPost.title),
    cover_image: apiPost.coverImage,
    content: Array.isArray(apiPost.content)
      ? htmlToMarkdown(apiPost.content.join(""))
      : htmlToMarkdown(apiPost.content),
    excerpt: apiPost.description || apiPost.metaDescription || "",
    published_at: new Date(apiPost.createdAt).toISOString(),
    views: 0,
    category: {
      id: 1,
      name: apiPost.category?.[0] || "Uncategorized",
      slug: generateSlug(apiPost.category?.[0] || "uncategorized"),
      description: "",
    },
    tags: [],
    author: DEFAULT_AUTHOR,
    is_featured: false,
  };
}