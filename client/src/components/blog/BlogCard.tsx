import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Post } from "@/lib/blog-data";

interface BlogCardProps {
  post: Post;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={post.cover_image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {post.is_featured && (
            <Badge className="absolute top-3 right-3 bg-primary">Featured</Badge>
          )}
        </div>
        <CardContent className="flex-grow pt-6">
          <Link href={`/category/${post.category.slug}`}>
            <a className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              {post.category.name}
            </a>
          </Link>
          <Link href={`/blogs/${post.slug}`}>
            <a className="block mt-2 mb-3">
              <h3 className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
                {post.title}
              </h3>
            </a>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag.id} variant="outline" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium line-clamp-1">{post.author.name}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.published_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
