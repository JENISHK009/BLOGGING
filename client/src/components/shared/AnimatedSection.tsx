import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  // Ensure pages load at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  );
}
