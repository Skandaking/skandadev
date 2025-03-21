"use client";

import { useState, useEffect, FormEvent } from "react";
import { Code, Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function Home() {
  const targetDate = new Date("2025-04-20T23:59:59");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a short loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API call to save email
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setEmail("");
    }, 1000);
  };

  const timeBlocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" }
  ];

  // Loading screen
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
          <p className="text-indigo-400 text-sm font-medium animate-pulse">Loading experience...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Adding a more subtle gradient overlay that complements code editor colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/80 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10 w-full max-w-xl px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.7,
                type: "spring",
                stiffness: 100
              }}
            >
              <Code className="h-12 w-12 text-indigo-400 p-2 rounded-xl bg-slate-800/80 shadow-lg border border-slate-700" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Developer Portfolio</h1>
          <p className="text-indigo-300 text-lg font-medium">Crafting digital experiences soon</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 mb-10 shadow-2xl border border-slate-700/70"
        >
          <div className="grid grid-cols-4 gap-4 w-full mb-8">
            {timeBlocks.map((block, index) => (
              <motion.div 
                key={block.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 100 
                }}
                className="flex flex-col items-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-xl p-3 w-full shadow-lg border border-indigo-500/70 hover:shadow-indigo-500/20 transition-all duration-300">
                  <motion.div 
                    className="text-2xl font-bold text-white text-center"
                    key={block.value} // This forces re-animation when value changes
                    initial={{ opacity: 0.5, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(block.value).padStart(2, '0')}
                  </motion.div>
                </div>
                <div className="text-xs uppercase mt-3 text-indigo-300 font-semibold tracking-wider">
                  {block.label}
                </div>
              </motion.div>
            ))}
          </div>
          
          {!submitted ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <p className="text-slate-300 text-sm mb-3 text-center">
                Be the first to know when my portfolio launches
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700/80 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 rounded-lg"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
                >
                  {isSubmitting ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : "Notify Me"}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-3 px-4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="mb-2 flex justify-center"
              >
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              Thanks! You&apos;ll be notified when the portfolio launches.
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-4"
        >
          <motion.div whileHover={{ y: -5, scale: 1.1 }} transition={{ duration: 0.2 }}>
            <Button variant="ghost" size="sm" className="rounded-full w-11 h-11 p-0 text-slate-300 hover:text-white hover:bg-indigo-600/80 transition-all duration-300 border border-slate-700/50">
              <Mail className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ y: -5, scale: 1.1 }} transition={{ duration: 0.2 }}>
            <Button variant="ghost" size="sm" className="rounded-full w-11 h-11 p-0 text-slate-300 hover:text-white hover:bg-indigo-600/80 transition-all duration-300 border border-slate-700/50">
              <Github className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ y: -5, scale: 1.1 }} transition={{ duration: 0.2 }}>
            <Button variant="ghost" size="sm" className="rounded-full w-11 h-11 p-0 text-slate-300 hover:text-white hover:bg-indigo-600/80 transition-all duration-300 border border-slate-700/50">
              <Linkedin className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}