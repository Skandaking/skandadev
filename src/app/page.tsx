"use client";

import { useState, useEffect, FormEvent } from "react";
import { Mail, Github, Linkedin, Code, ArrowRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

const CountdownTimer = () => {
  // Update to a future date (one month from now)
  const targetDate = new Date("2025-04-20T23:59:59");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(intervalId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const timeBlocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" }
  ];
  
  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 w-full max-w-md mx-auto">
      {timeBlocks.map((block, index) => (
        <motion.div 
          key={block.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg p-2 md:p-4 w-full shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-lg"></div>
            <div className="relative z-10 text-2xl md:text-4xl font-bold text-white">
              {String(block.value).padStart(2, '0')}
            </div>
          </div>
          <div className="text-xs md:text-sm uppercase tracking-wider mt-2 text-indigo-200">
            {block.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API call to save email
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setEmail("");
      // Add your actual email subscription logic here
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert className="bg-indigo-900/50 border-indigo-500 text-indigo-100">
            <Bell className="h-4 w-4 text-indigo-300" />
            <AlertDescription>
              Thanks! You&apos;ll be notified when the portfolio launches.
            </AlertDescription>
          </Alert>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-indigo-950/40 border-indigo-800 text-white placeholder:text-indigo-400"
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white"
          >
            {isSubmitting ? "Sending..." : "Notify Me"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      )}
    </div>
  );
};

const SkillCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="bg-indigo-950/40 backdrop-blur-md rounded-xl p-6 border border-indigo-800/50 hover:border-indigo-600/50 shadow-xl transition-all duration-300 hover:shadow-indigo-900/20 hover:shadow-2xl group"
  >
    <div className="flex items-center mb-4">
      <div className="rounded-full bg-indigo-800/30 p-2 mr-3 group-hover:bg-indigo-700/50 transition-colors duration-300">
        <Icon className="h-5 w-5 text-indigo-300" />
      </div>
      <h3 className="font-semibold text-lg text-white">{title}</h3>
    </div>
    <p className="text-indigo-200">{description}</p>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-indigo-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-10"></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-start min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
              SkandaDev
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-indigo-200 max-w-2xl mx-auto">
            Creating exceptional digital experiences through clean code and intuitive design.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-lg mx-auto mb-16"
        >
          <Card className="bg-indigo-900/40 backdrop-blur-md border-indigo-800/50 shadow-2xl shadow-indigo-900/20 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-2xl text-white font-medium">
                Portfolio Launch Countdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              <CountdownTimer />
              
              <div>
                <h3 className="text-center text-indigo-200 mb-4">
                  Get notified when my portfolio launches
                </h3>
                <EmailSignup />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mb-16">
          <SkillCard 
            icon={Code}
            title="Full-Stack Development"
            description="Expertise in modern web development including Next.js, TypeScript, and TailwindCSS to build responsive and accessible applications."
          />
          
          <SkillCard 
            icon={Bell}
            title="Coming Soon"
            description="My complete portfolio will showcase projects, skills, and professional experience. Subscribe to be notified when it launches."
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center mt-8"
        >
          <Button variant="outline" className="rounded-full border-indigo-700 bg-indigo-950/40 text-indigo-200 hover:bg-indigo-900/50 hover:text-white">
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </Button>
          <Button variant="outline" className="rounded-full border-indigo-700 bg-indigo-950/40 text-indigo-200 hover:bg-indigo-900/50 hover:text-white">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" className="rounded-full border-indigo-700 bg-indigo-950/40 text-indigo-200 hover:bg-indigo-900/50 hover:text-white">
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </Button>
        </motion.div>
      </main>
      
      <footer className="relative z-10 container mx-auto px-4 py-8 text-center text-indigo-400 text-sm">
        &copy; {new Date().getFullYear()} SkandaDev. All rights reserved.
      </footer>
    </div>
  );
}