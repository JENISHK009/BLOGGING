import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "@/components/shared/AnimatedSection";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  blogType: z.string().min(1, { message: "Please select a blog type" }),
  agreeToUpdates: z.boolean().refine(val => val === true, {
    message: "You must agree to receive updates"
  })
});

type FormValues = z.infer<typeof formSchema>;

export default function WaitlistSection() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      blogType: "",
      agreeToUpdates: false
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // In a real app, we would send this data to the server
      console.log("Form data:", data);

      // Show success state
      setIsSuccess(true);

      // Reset form
      form.reset();

      // Show toast notification
      toast({
        title: "You're on the waitlist!",
        description: "Thanks for joining, we'll be in touch soon.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <AnimatedSection id="waitlist" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-colors shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-gradient-to-br from-primary to-secondary p-10 text-white">
              <h2 className="font-inter text-3xl font-bold mb-4">Join Our Waitlist</h2>
              <p className="mb-6">Be among the first to experience Bloggers Ground when we launch. Early waitlist members will receive:</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check-circle mr-2"></i>
                  Priority access to the platform
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle mr-2"></i>
                  30% discount on any plan for 12 months
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle mr-2"></i>
                  Exclusive early-adopter features
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle mr-2"></i>
                  Direct access to our founding team
                </li>
              </ul>
              <div className="mt-auto pt-8 hidden md:block">
                <p className="text-white/80 text-sm">
                  <i className="fas fa-shield-alt mr-1"></i>
                  Your information is secure and will never be shared.
                </p>
              </div>
            </div>

            <div className="md:w-1/2 p-10">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your name"
                                  {...field}
                                  className="w-full px-4 py-3 rounded-lg"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="you@example.com"
                                  type="email"
                                  {...field}
                                  className="w-full px-4 py-3 rounded-lg"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="blogType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Blog Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="dark:[&>svg]:text-white">
                                    <SelectValue placeholder="Select your blog type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="personal">Personal</SelectItem>
                                  <SelectItem value="business">Business</SelectItem>
                                  <SelectItem value="tech">Technology</SelectItem>
                                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                  <SelectItem value="food">Food</SelectItem>
                                  <SelectItem value="travel">Travel</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="agreeToUpdates"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  I agree to receive updates about Bloggers Ground
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full py-3 px-4 text-lg flex justify-center items-center"
                        >
                          <span>Join Waitlist</span>
                          <i className="fas fa-arrow-right ml-2"></i>
                        </Button>
                      </form>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-check text-2xl text-green-600 dark:text-green-400"></i>
                    </div>
                    <h3 className="font-inter text-xl font-bold mb-2">You're on the Waitlist!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Thank you for joining our waitlist. We'll notify you when Bloggers Ground is ready for you.
                    </p>
                    <div className="mb-6">
                      <p className="font-medium mb-2">Share with friends to move up the list:</p>
                      <div className="flex justify-center space-x-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                          <i className="fab fa-whatsapp"></i>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </div>
                    </div>
                    <Button onClick={() => setIsSuccess(false)}>
                      Back to Form
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 text-center md:hidden">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  <i className="fas fa-shield-alt mr-1"></i>
                  Your information is secure and will never be shared.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
