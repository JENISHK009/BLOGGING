import {
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  tags, type Tag, type InsertTag,
  posts, type Post, type InsertPost,
  postTags, type PostTag, type InsertPostTag,
  comments, type Comment, type InsertComment,
  waitlist, type Waitlist, type InsertWaitlist
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

// Interface for all storage operations
export interface IStorage {
  // Session store for authentication
  sessionStore: session.Store;
  
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Tag operations
  getTags(): Promise<Tag[]>;
  getTagBySlug(slug: string): Promise<Tag | undefined>;
  createTag(tag: InsertTag): Promise<Tag>;
  
  // Post operations
  getPosts(limit?: number, offset?: number): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getPostsByCategory(categoryId: number, limit?: number, offset?: number): Promise<Post[]>;
  getPostsByTag(tagId: number, limit?: number, offset?: number): Promise<Post[]>;
  getFeaturedPosts(limit?: number): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePostViews(id: number): Promise<Post>;
  
  // PostTag operations
  getPostTags(postId: number): Promise<PostTag[]>;
  addTagToPost(postTag: InsertPostTag): Promise<PostTag>;
  
  // Comment operations
  getCommentsByPost(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Waitlist operations
  addToWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
}

// In-memory implementation of the storage interface
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private tags: Map<number, Tag>;
  private posts: Map<number, Post>;
  private postTags: Map<number, PostTag>;
  private comments: Map<number, Comment>;
  private waitlistEntries: Map<number, Waitlist>;
  
  private userIdCounter: number;
  private categoryIdCounter: number;
  private tagIdCounter: number;
  private postIdCounter: number;
  private postTagIdCounter: number;
  private commentIdCounter: number;
  private waitlistIdCounter: number;
  
  // Session store for authentication
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.tags = new Map();
    this.posts = new Map();
    this.postTags = new Map();
    this.comments = new Map();
    this.waitlistEntries = new Map();
    
    this.userIdCounter = 1;
    this.categoryIdCounter = 1;
    this.tagIdCounter = 1;
    this.postIdCounter = 1;
    this.postTagIdCounter = 1;
    this.commentIdCounter = 1;
    this.waitlistIdCounter = 1;
    
    // Initialize the session store
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours, garbage-collect expired sessions
    });
    
    // Initialize with default data
    this.initializeDefaults();
  }

  private initializeDefaults() {
    // Add default categories
    const categoryData: InsertCategory[] = [
      { name: "Technology", slug: "technology", description: "Latest tech news and reviews" },
      { name: "Design", slug: "design", description: "UI/UX and graphic design trends" },
      { name: "Business", slug: "business", description: "Entrepreneurship and business strategies" },
      { name: "Lifestyle", slug: "lifestyle", description: "Health, wellness, and daily living tips" },
      { name: "Travel", slug: "travel", description: "Travel guides and experiences" }
    ];
    
    categoryData.forEach(category => this.createCategory(category));
    
    // Add default tags
    const tagData: InsertTag[] = [
      { name: "JavaScript", slug: "javascript" },
      { name: "React", slug: "react" },
      { name: "SEO", slug: "seo" },
      { name: "Design", slug: "design" },
      { name: "Productivity", slug: "productivity" },
      { name: "Business", slug: "business" }
    ];
    
    tagData.forEach(tag => this.createTag(tag));
    
    // Add default users/authors
    const userData: InsertUser[] = [
      {
        username: "sarahjohnson",
        password: "password123", // In a real app, this would be hashed
        email: "sarah@example.com",
        fullName: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
        bio: "Tech enthusiast and software engineer with 5+ years of experience in web development."
      },
      {
        username: "davidchen",
        password: "password123",
        email: "david@example.com",
        fullName: "David Chen",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
        bio: "UX designer and product strategist helping companies build better digital experiences."
      },
      {
        username: "michellepatel",
        password: "password123",
        email: "michelle@example.com",
        fullName: "Michelle Patel",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
        bio: "Digital marketing specialist with expertise in SEO and content strategy."
      }
    ];
    
    userData.forEach(user => this.createUser(user));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const newUser: User = { 
      ...user, 
      id, 
      isAdmin: false,
      fullName: user.fullName || null,
      avatar: user.avatar || null,
      bio: user.bio || null
    };
    this.users.set(id, newUser);
    return newUser;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const newCategory: Category = { 
      ...category, 
      id,
      description: category.description || null
    };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  // Tag operations
  async getTags(): Promise<Tag[]> {
    return Array.from(this.tags.values());
  }

  async getTagBySlug(slug: string): Promise<Tag | undefined> {
    return Array.from(this.tags.values()).find(
      (tag) => tag.slug === slug
    );
  }

  async createTag(tag: InsertTag): Promise<Tag> {
    const id = this.tagIdCounter++;
    const newTag: Tag = { ...tag, id };
    this.tags.set(id, newTag);
    return newTag;
  }

  // Post operations
  async getPosts(limit?: number, offset = 0): Promise<Post[]> {
    let posts = Array.from(this.posts.values())
      .sort((a, b) => {
        // Sort by published date (newest first)
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
      
    if (offset) {
      posts = posts.slice(offset);
    }
    
    if (limit) {
      posts = posts.slice(0, limit);
    }
    
    return posts;
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    return Array.from(this.posts.values()).find(
      (post) => post.slug === slug
    );
  }

  async getPostsByCategory(categoryId: number, limit?: number, offset = 0): Promise<Post[]> {
    let posts = Array.from(this.posts.values())
      .filter(post => post.categoryId === categoryId)
      .sort((a, b) => {
        // Sort by published date (newest first)
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
      
    if (offset) {
      posts = posts.slice(offset);
    }
    
    if (limit) {
      posts = posts.slice(0, limit);
    }
    
    return posts;
  }

  async getPostsByTag(tagId: number, limit?: number, offset = 0): Promise<Post[]> {
    // Get all postTags for this tag
    const postTagEntries = Array.from(this.postTags.values())
      .filter(pt => pt.tagId === tagId);
    
    // Get all posts that have this tag
    let posts = Array.from(this.posts.values())
      .filter(post => postTagEntries.some(pt => pt.postId === post.id))
      .sort((a, b) => {
        // Sort by published date (newest first)
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
    
    if (offset) {
      posts = posts.slice(offset);
    }
    
    if (limit) {
      posts = posts.slice(0, limit);
    }
    
    return posts;
  }

  async getFeaturedPosts(limit?: number): Promise<Post[]> {
    let posts = Array.from(this.posts.values())
      .filter(post => post.isFeatured)
      .sort((a, b) => {
        // Sort by published date (newest first)
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
    
    if (limit) {
      posts = posts.slice(0, limit);
    }
    
    return posts;
  }

  async createPost(post: InsertPost): Promise<Post> {
    const id = this.postIdCounter++;
    const newPost: Post = { 
      ...post, 
      id,
      views: 0,
      publishedAt: post.publishedAt || new Date(),
      metaTags: post.metaTags || {},
      coverImage: post.coverImage || null,
      isFeatured: post.isFeatured || false,
      seoTitle: post.seoTitle || null,
      seoDescription: post.seoDescription || null
    };
    this.posts.set(id, newPost);
    return newPost;
  }

  async updatePostViews(id: number): Promise<Post> {
    const post = this.posts.get(id);
    if (!post) {
      throw new Error(`Post with ID ${id} not found`);
    }
    
    const updatedPost: Post = {
      ...post,
      views: (post.views || 0) + 1
    };
    
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  // PostTag operations
  async getPostTags(postId: number): Promise<PostTag[]> {
    return Array.from(this.postTags.values())
      .filter(postTag => postTag.postId === postId);
  }

  async addTagToPost(postTag: InsertPostTag): Promise<PostTag> {
    const id = this.postTagIdCounter++;
    const newPostTag: PostTag = { ...postTag, id };
    this.postTags.set(id, newPostTag);
    return newPostTag;
  }

  // Comment operations
  async getCommentsByPost(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => {
        // Sort by created date (newest first)
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const id = this.commentIdCounter++;
    const newComment: Comment = { 
      ...comment, 
      id,
      createdAt: new Date()
    };
    this.comments.set(id, newComment);
    return newComment;
  }

  // Waitlist operations
  async addToWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    // Check if email already exists in waitlist
    const existingEntry = Array.from(this.waitlistEntries.values())
      .find(e => e.email === entry.email);
      
    if (existingEntry) {
      throw new Error("Email is already on the waitlist");
    }
    
    const id = this.waitlistIdCounter++;
    const newEntry: Waitlist = { 
      ...entry, 
      id,
      createdAt: new Date(),
      blogType: entry.blogType || null
    };
    this.waitlistEntries.set(id, newEntry);
    return newEntry;
  }
}

export const storage = new MemStorage();
