"use client";

import { useState, useEffect, FormEvent } from "react";
import { Code, Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Image from "next/image";

// Define Tech type to fix TypeScript errors
interface Tech {
  name: string;
  icon: string;
  color: string;
  missing?: boolean;
}

export default function Home() {
  // Fix localStorage issue with server-side rendering
  const [targetDate] = useState(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      // Try to get saved date from localStorage
      const saved = localStorage.getItem('countdownTargetDate');
      if (saved) {
        return new Date(saved);
      } else {
        // Create a new target date if none exists
        const newTarget = new Date();
        newTarget.setDate(newTarget.getDate() + 21);
        localStorage.setItem('countdownTargetDate', newTarget.toString());
        return newTarget;
      }
    }
    
    // Default fallback for server-side rendering
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 21);
    return defaultDate;
  });
  
  const [timeLeft, setTimeLeft] = useState({
    days: 21, // Initialize with 21 days
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // All technologies grouped by category
  const technologies: Record<string, Tech[]> = {
    "Programming Languages": [
      { name: "C#", icon: "/icons/csharp.svg", color: "#68217A", missing: true },
      { name: "Dart", icon: "/icons/dart.svg", color: "#0175C2" },
      { name: "Visual Basic", icon: "/icons/visualbasic.svg", color: "#2C5898", missing: true },
      { name: "PHP", icon: "/icons/php.svg", color: "#777BB3" },
      { name: "Python", icon: "/icons/python.svg", color: "#3776AB" },
      { name: "JavaScript", icon: "/icons/javascript.svg", color: "#F7DF1E" },
      { name: "TypeScript", icon: "/icons/typescript.svg", color: "#3178C6" }
    ],
    "Web Technologies": [
      { name: "HTML", icon: "/icons/html5.svg", color: "#E34F26" },
      { name: "CSS", icon: "/icons/css3.svg", color: "#1572B6" },
      { name: "React", icon: "/icons/react.svg", color: "#61DAFB" },
      { name: "Next.js", icon: "/icons/nextjs.svg", color: "#ffffff" },
      { name: "WordPress", icon: "/icons/wordpress.svg", color: "#21759B" },
      { name: "Wix", icon: "/icons/wix.svg", color: "#FAAD4D" },
      { name: "SharePoint", icon: "/icons/sharepoint.svg", color: "#0078D4", missing: true },
      { name: "Webflow", icon: "/icons/webflow.svg", color: "#4353FF" },
      { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg", color: "#06B6D4" }
    ],
    "Database": [
      { name: "Oracle", icon: "/icons/oracle.svg", color: "#F80000", missing: true },
      { name: "MySQL", icon: "/icons/mysql.svg", color: "#4479A1" },
      { name: "Firebase", icon: "/icons/firebase.svg", color: "#FFCA28" },
      { name: "Supabase", icon: "/icons/supabase.svg", color: "#3ECF8E" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg", color: "#4169E1" }
    ],
    "Version Control": [
      { name: "Git", icon: "/icons/git.svg", color: "#F05032" }
    ],
    "Prototype": [
      { name: "Axure RP", icon: "/icons/axure.svg", color: "#FF6E00", missing: true },
      { name: "Figma", icon: "/icons/figma.svg", color: "#F24E1E" }
    ]
  };

  // Flatten the technologies for animation
  const allTechnologies = Object.values(technologies).flat();

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
    { value: timeLeft.hours, label: "Hrs" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" }
  ];

  // Loading screen
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-900">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
          <p className="text-indigo-400 text-xs font-medium animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Simple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/90 to-zinc-900/80 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col h-screen">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between pt-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center">
              <Code className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-medium text-sm">SkandaDev</span>
          </div>
          
          <div className="flex items-center gap-3">
            {[
              { icon: <Mail className="h-4 w-4" />, href: "mailto:skandakaunda@gmail.com" },
              { icon: <Github className="h-4 w-4" />, href: "https://github.com/Skandaking" },
              { icon: <Linkedin className="h-4 w-4" />, href: "https://www.linkedin.com/in/gomezgani-kaunda-32b556244" }
            ].map((item, index) => (
              <Button 
                key={index}
                variant="ghost" 
                size="sm"
                asChild
                className="w-8 h-8 p-0 rounded-full bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-indigo-600/20 border border-zinc-700"
              >
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.icon}
                </a>
              </Button>
            ))}
          </div>
        </motion.div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-sm font-medium text-indigo-400 mb-1">Full Stack Developer</h2>
            <h1 className="text-3xl font-bold text-white mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                Portfolio Coming Soon
              </span>
            </h1>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              Crafting digital experiences with modern web technologies
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-zinc-800/30 backdrop-blur-sm rounded-xl p-6 mb-6 border border-zinc-700/50 w-full max-w-xl"
          >
            <h3 className="text-lg font-medium text-white mb-4 text-center">Launch Countdown</h3>
            
            <div className="grid grid-cols-4 gap-3 w-full mb-6">
              {timeBlocks.map((block, index) => (
                <motion.div 
                  key={block.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-zinc-900/80 rounded-lg p-3 w-full shadow-lg border border-zinc-800">
                    <div className="text-2xl font-bold text-white text-center">
                      {String(block.value).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-xs mt-2 text-zinc-500 font-medium">
                    {block.label}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {!submitted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-indigo-500 text-sm h-9"
                  />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 text-sm h-9 whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : "Notify Me"}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-2 px-4 bg-green-500/10 border border-green-500/30 rounded-lg"
              >
                <p className="text-sm text-green-400">Thank you! I&apos;ll notify you when the portfolio launches.</p>
              </motion.div>
            )}
          </motion.div>
          
          {/* Technologies sliding marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full mt-2 mb-6 overflow-hidden"
          >
            <p className="text-xs text-indigo-400 font-medium mb-2 text-center">Technologies & Skills</p>
            
            <div className="relative flex overflow-x-hidden w-screen -ml-4">
              {/* Sliding marquee - First copy */}
              <motion.div
                className="flex space-x-6 py-3 animate-marquee whitespace-nowrap"
                animate={{
                  x: [0, -2500],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
              >
                {allTechnologies.map((tech, index) => (
                  <div key={`${tech.name}-1-${index}`} className="flex flex-col items-center justify-center">
                    <div 
                      className="w-10 h-10 rounded-md p-1 border border-zinc-700/50 flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${tech.color}30`,
                        boxShadow: `0 0 8px ${tech.color}20`
                      }}
                    >
                      {tech.missing ? (
                        <div 
                          className="text-sm font-medium"
                          style={{ color: tech.color || 'white' }}
                        >
                          {tech.name.charAt(0)}
                        </div>
                      ) : (
                        <Image 
                          src={tech.icon} 
                          alt={tech.name} 
                          width={32}
                          height={32}
                          className="w-full h-full object-contain"
                          style={{ filter: `drop-shadow(0 0 2px ${tech.color})` }}
                          onError={(e) => {
                            // If image fails to load, replace with fallback
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.insertAdjacentHTML('beforeend', 
                              `<div class="text-sm font-medium" style="color: ${tech.color || 'white'}">${tech.name.charAt(0)}</div>`
                            );
                          }}
                        />
                      )}
                    </div>
                    <span className="text-xs text-zinc-500 mt-1">{tech.name}</span>
                  </div>
                ))}
              </motion.div>

              {/* Sliding marquee - Second copy (ensures continuous loop) */}
              <motion.div
                className="flex space-x-6 py-3 animate-marquee whitespace-nowrap absolute top-0"
                animate={{
                  x: [2500, 0],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
              >
                {allTechnologies.map((tech, index) => (
                  <div key={`${tech.name}-2-${index}`} className="flex flex-col items-center justify-center">
                    <div 
                      className="w-10 h-10 rounded-md p-1 border border-zinc-700/50 flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${tech.color}30`,
                        boxShadow: `0 0 8px ${tech.color}20`
                      }}
                    >
                      {tech.missing ? (
                        <div 
                          className="text-sm font-medium"
                          style={{ color: tech.color || 'white' }}
                        >
                          {tech.name.charAt(0)}
                        </div>
                      ) : (
                        <Image 
                          src={tech.icon} 
                          alt={tech.name}
                          width={32}
                          height={32} 
                          className="w-full h-full object-contain"
                          style={{ filter: `drop-shadow(0 0 2px ${tech.color})` }}
                          onError={(e) => {
                            // If image fails to load, replace with fallback
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.insertAdjacentHTML('beforeend', 
                              `<div class="text-sm font-medium" style="color: ${tech.color || 'white'}">${tech.name.charAt(0)}</div>`
                            );
                          }}
                        />
                      )}
                    </div>
                    <span className="text-xs text-zinc-500 mt-1">{tech.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center py-4 text-zinc-600 text-xs"
        >
          © 2025 | SkandaDev
        </motion.div>
      </div>
    </div>
  );
}