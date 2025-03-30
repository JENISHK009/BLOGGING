import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full w-10 h-10 bg-gray-100 dark:bg-gray-800"
      aria-label="Toggle dark mode"
    >
      <motion.div
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="flex items-center justify-center"
      >
        {theme === "light" ? (
          <SunIcon className="h-5 w-5 text-gray-800 dark:text-white" />
        ) : (
          <MoonIcon className="h-5 w-5 text-gray-800 dark:text-white" />
        )}
      </motion.div>
    </Button>
  );
}