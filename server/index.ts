import express, { type Request, Response, NextFunction } from "express";
import compression from 'compression';
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
  )
});

// Fallback to default .env if specific env file doesn't exist
if (!process.env.PORT) {
  dotenv.config();
}

const app = express();
// Enable gzip compression for better SEO and performance
app.use(compression());

// 301 redirect for www to non-www (or vice versa based on preference)
app.use((req, res, next) => {
  const host = req.hostname;
  
  // If the request is coming from 'www' subdomain, redirect to non-www
  if (host.startsWith('www.')) {
    const newHost = host.slice(4); // Remove 'www.'
    return res.redirect(301, `${req.protocol}://${newHost}${req.originalUrl}`);
  }
  
  // For production, you could also do the opposite (non-www to www)
  // Uncomment the following code to redirect non-www to www
  /*
  if (!host.startsWith('www.') && host !== 'localhost' && !host.includes('.replit.dev')) {
    return res.redirect(301, `${req.protocol}://www.${host}${req.originalUrl}`);
  }
  */
  
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Use PORT from environment variables or fallback to 5000
  const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`Server running in ${process.env.NODE_ENV || 'development'} mode`);
    log(`Serving on port ${port}`);
  });
})();