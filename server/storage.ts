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
import { db } from "./db";
import { eq, desc, asc, and, sql } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

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

// Database implementation of storage interface
export class DatabaseStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true,
      tableName: 'session'
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  // Tag operations
  async getTags(): Promise<Tag[]> {
    return await db.select().from(tags);
  }

  async getTagBySlug(slug: string): Promise<Tag | undefined> {
    const [tag] = await db.select().from(tags).where(eq(tags.slug, slug));
    return tag;
  }

  async createTag(tag: InsertTag): Promise<Tag> {
    const [newTag] = await db.insert(tags).values(tag).returning();
    return newTag;
  }

  // Post operations
  async getPosts(limit?: number, offset = 0): Promise<Post[]> {
    let postsQuery = db.select().from(posts).orderBy(desc(posts.publishedAt));
    
    if (offset > 0) {
      postsQuery = db.select().from(posts).orderBy(desc(posts.publishedAt)).offset(offset);
    }
    
    if (limit) {
      postsQuery = db.select().from(posts).orderBy(desc(posts.publishedAt)).limit(limit);
    }
    
    if (limit && offset > 0) {
      postsQuery = db.select().from(posts).orderBy(desc(posts.publishedAt)).limit(limit).offset(offset);
    }
    
    return await postsQuery;
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async getPostsByCategory(categoryId: number, limit?: number, offset = 0): Promise<Post[]> {
    let postsQuery = db.select()
      .from(posts)
      .where(eq(posts.categoryId, categoryId))
      .orderBy(desc(posts.publishedAt));
    
    if (offset > 0) {
      postsQuery = db.select()
        .from(posts)
        .where(eq(posts.categoryId, categoryId))
        .orderBy(desc(posts.publishedAt))
        .offset(offset);
    }
    
    if (limit) {
      postsQuery = db.select()
        .from(posts)
        .where(eq(posts.categoryId, categoryId))
        .orderBy(desc(posts.publishedAt))
        .limit(limit);
    }
    
    if (limit && offset > 0) {
      postsQuery = db.select()
        .from(posts)
        .where(eq(posts.categoryId, categoryId))
        .orderBy(desc(posts.publishedAt))
        .limit(limit)
        .offset(offset);
    }
    
    return await postsQuery;
  }

  async getPostsByTag(tagId: number, limit?: number, offset = 0): Promise<Post[]> {
    const postIdsWithTag = await db
      .select({ postId: postTags.postId })
      .from(postTags)
      .where(eq(postTags.tagId, tagId));
    
    const postIds = postIdsWithTag.map(row => row.postId);
    
    if (postIds.length === 0) {
      return [];
    }
    
    let postsQuery = db.select()
      .from(posts)
      .where(sql`${posts.id} IN (${postIds.join(',')})`)
      .orderBy(desc(posts.publishedAt));
    
    if (offset > 0) {
      postsQuery = db.select()
        .from(posts)
        .where(sql`${posts.id} IN (${postIds.join(',')})`)
        .orderBy(desc(posts.publishedAt))
        .offset(offset);
    }
    
    if (limit) {
      postsQuery = db.select()
        .from(posts)
        .where(sql`${posts.id} IN (${postIds.join(',')})`)
        .orderBy(desc(posts.publishedAt))
        .limit(limit);
    }
    
    if (limit && offset > 0) {
      postsQuery = db.select()
        .from(posts)
        .where(sql`${posts.id} IN (${postIds.join(',')})`)
        .orderBy(desc(posts.publishedAt))
        .limit(limit)
        .offset(offset);
    }
    
    return await postsQuery;
  }

  async getFeaturedPosts(limit?: number): Promise<Post[]> {
    let postsQuery = db.select()
      .from(posts)
      .where(eq(posts.isFeatured, true))
      .orderBy(desc(posts.publishedAt));
    
    if (limit) {
      postsQuery = db.select()
        .from(posts)
        .where(eq(posts.isFeatured, true))
        .orderBy(desc(posts.publishedAt))
        .limit(limit);
    }
    
    return await postsQuery;
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async updatePostViews(id: number): Promise<Post> {
    const [updatedPost] = await db
      .update(posts)
      .set({ views: sql`${posts.views} + 1` })
      .where(eq(posts.id, id))
      .returning();
    
    return updatedPost;
  }

  // PostTag operations
  async getPostTags(postId: number): Promise<PostTag[]> {
    return await db
      .select()
      .from(postTags)
      .where(eq(postTags.postId, postId));
  }

  async addTagToPost(postTag: InsertPostTag): Promise<PostTag> {
    const [newPostTag] = await db
      .insert(postTags)
      .values(postTag)
      .returning();
    
    return newPostTag;
  }

  // Comment operations
  async getCommentsByPost(postId: number): Promise<Comment[]> {
    return await db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.createdAt));
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const [newComment] = await db
      .insert(comments)
      .values(comment)
      .returning();
    
    return newComment;
  }

  // Waitlist operations
  async addToWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    const [newEntry] = await db
      .insert(waitlist)
      .values(entry)
      .returning();
    
    return newEntry;
  }
}

// Switch to database storage instead of in-memory storage
export const storage = new DatabaseStorage();
