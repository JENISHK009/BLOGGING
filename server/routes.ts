import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertCategorySchema, 
  insertTagSchema, 
  insertPostSchema, 
  insertCommentSchema, 
  insertWaitlistSchema,
} from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod-validation-error";

// Helper function to handle validation errors
const validateRequest = (schema: z.ZodSchema<any>, data: any) => {
  try {
    return { success: true, data: schema.parse(data) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: new ZodError(error).message 
      };
    }
    return { 
      success: false, 
      error: "Invalid request data" 
    };
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // === User Routes ===
  
  // Get user by ID
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send password in response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create user (register)
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const validation = validateRequest(insertUserSchema, req.body);
      if (!validation.success) {
        return res.status(400).json({ message: validation.error });
      }
      
      // Check if username is already taken
      const existingUsername = await storage.getUserByUsername(validation.data.username);
      if (existingUsername) {
        return res.status(409).json({ message: "Username is already taken" });
      }
      
      // Check if email is already taken
      const existingEmail = await storage.getUserByEmail(validation.data.email);
      if (existingEmail) {
        return res.status(409).json({ message: "Email is already registered" });
      }
      
      // In a real app, we would hash the password here
      const newUser = await storage.createUser(validation.data);
      
      // Don't send password in response
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // === Category Routes ===
  
  // Get all categories
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get category by slug
  app.get("/api/categories/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create category
  app.post("/api/categories", async (req: Request, res: Response) => {
    try {
      const validation = validateRequest(insertCategorySchema, req.body);
      if (!validation.success) {
        return res.status(400).json({ message: validation.error });
      }
      
      const newCategory = await storage.createCategory(validation.data);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // === Tag Routes ===
  
  // Get all tags
  app.get("/api/tags", async (req: Request, res: Response) => {
    try {
      const tags = await storage.getTags();
      res.json(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get tag by slug
  app.get("/api/tags/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;
      const tag = await storage.getTagBySlug(slug);
      
      if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
      }
      
      res.json(tag);
    } catch (error) {
      console.error("Error fetching tag:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create tag
  app.post("/api/tags", async (req: Request, res: Response) => {
    try {
      const validation = validateRequest(insertTagSchema, req.body);
      if (!validation.success) {
        return res.status(400).json({ message: validation.error });
      }
      
      const newTag = await storage.createTag(validation.data);
      res.status(201).json(newTag);
    } catch (error) {
      console.error("Error creating tag:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // === Post Routes ===
  
  // Get all posts with pagination
  app.get("/api/posts", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const posts = await storage.getPosts(limit, offset);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get featured posts
  app.get("/api/posts/featured", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const posts = await storage.getFeaturedPosts(limit);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching featured posts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get posts by category
  app.get("/api/categories/:categoryId/posts", async (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const posts = await storage.getPostsByCategory(categoryId, limit, offset);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get posts by tag
  app.get("/api/tags/:tagId/posts", async (req: Request, res: Response) => {
    try {
      const tagId = parseInt(req.params.tagId);
      if (isNaN(tagId)) {
        return res.status(400).json({ message: "Invalid tag ID" });
      }
      
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const posts = await storage.getPostsByTag(tagId, limit, offset);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts by tag:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get post by slug
  app.get("/api/posts/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;
      const post = await storage.getPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create post
  app.post("/api/posts", async (req: Request, res: Response) => {
    try {
      const validation = validateRequest(insertPostSchema, req.body);
      if (!validation.success) {
        return res.status(400).json({ message: validation.error });
      }
      
      const newPost = await storage.createPost(validation.data);
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Update post views
  app.patch("/api/posts/:id/views", async (req: Request, res: Response) => {
    try {
      const postId = parseInt(req.params.id);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      
      const updatedPost = await storage.updatePostViews(postId);
      res.json(updatedPost);
    } catch (error) {
      console.error("Error updating post views:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // === Comment Routes ===
  
  // Get comments for a post
  app.get("/api/posts/:postId/comments", async (req: Request, res: Response) => {
    try {
      const postId = parseInt(req.params.postId);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      
      const comments = await storage.getCommentsByPost(postId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create comment
  app.post("/api/comments", async (req: Request, res: Response) => {
    try {
      const validation = validateRequest(insertCommentSchema, req.body);
      if (!validation.success) {
        return res.status(400).json({ message: validation.error });
      }
      
      const newComment = await storage.createComment(validation.data);
      res.status(201).json(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // === Waitlist Routes ===
  
  // Add to waitlist
  app.post("/api/waitlist", async (req: Request, res: Response) => {
    try {
      const validation = validateRequest(insertWaitlistSchema, req.body);
      if (!validation.success) {
        return res.status(400).json({ message: validation.error });
      }
      
      try {
        const newEntry = await storage.addToWaitlist(validation.data);
        res.status(201).json(newEntry);
      } catch (error) {
        // Handle duplicate email error
        if (error instanceof Error && error.message.includes("already on the waitlist")) {
          return res.status(409).json({ message: error.message });
        }
        throw error;
      }
    } catch (error) {
      console.error("Error adding to waitlist:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
