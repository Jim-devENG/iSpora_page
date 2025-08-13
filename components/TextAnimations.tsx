import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { safeTransition, safeAnimate } from './utils/animationUtils';

interface TypewriterProps {
  texts: string[];
  speed?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  loop?: boolean;
}

export function TypewriterEffect({ 
  texts, 
  speed = 100, 
  delay = 2000, 
  className = "",
  prefix = "",
  loop = true 
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = texts[currentTextIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          if (loop) {
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, texts, speed, delay, loop]);

  return (
    <span className={className}>
      {prefix}
      <motion.span
        key={currentText}
        initial={safeAnimate({ opacity: 0 })}
        animate={safeAnimate({ opacity: 1 })}
        className="text-foreground"
      >
        {currentText}
      </motion.span>
      <motion.span
        animate={safeAnimate({ opacity: [0, 1, 0] })}
        transition={safeTransition({ duration: 1, repeat: 999999 })}
        className="text-foreground"
      >
        |
      </motion.span>
    </span>
  );
}

interface MorphingTextProps {
  texts: string[];
  className?: string;
  duration?: number;
}

export function MorphingText({ texts, className = "", duration = 3000 }: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, duration);

    return () => clearInterval(interval);
  }, [texts.length, duration]);

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={safeAnimate({ 
            opacity: 0, 
            y: 20,
            filter: "blur(10px)",
            scale: 0.8
          })}
          animate={safeAnimate({ 
            opacity: 1, 
            y: 0,
            filter: "blur(0px)",
            scale: 1
          })}
          exit={safeAnimate({ 
            opacity: 0, 
            y: -20,
            filter: "blur(10px)",
            scale: 0.8
          })}
          transition={safeTransition({ 
            duration: 0.8,
            ease: "easeOut"
          })}
          className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function CountUpAnimation({ 
  end, 
  start = 0, 
  duration = 2, 
  className = "",
  suffix = "",
  prefix = ""
}: CountUpProps) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [end, start, duration]);

  return (
    <motion.span
      className={className}
      initial={safeAnimate({ scale: 0.5, opacity: 0 })}
      animate={safeAnimate({ scale: 1, opacity: 1 })}
      transition={safeTransition({ duration: 0.5, ease: "easeOut" })}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
}

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function GlitchText({ text, className = "", intensity = "medium" }: GlitchTextProps) {
  const glitchSettings = {
    low: { amplitude: 2, frequency: 0.1, duration: 0.1 },
    medium: { amplitude: 4, frequency: 0.2, duration: 0.2 },
    high: { amplitude: 8, frequency: 0.3, duration: 0.3 }
  };

  const settings = glitchSettings[intensity];

  return (
    <motion.div className={`relative ${className}`}>
      <motion.span
        className="relative z-10"
        animate={safeAnimate({
          x: [0, settings.amplitude, -settings.amplitude, 0],
          textShadow: [
            "0 0 0 transparent",
            `${settings.amplitude}px 0 0 #ff0000, -${settings.amplitude}px 0 0 #00ffff`,
            "0 0 0 transparent"
          ]
        })}
        transition={safeTransition({
          duration: settings.duration,
          repeat: 999999,
          repeatType: "loop",
          ease: "easeInOut"
        })}
      >
        {text}
      </motion.span>
      
      {/* Glitch layers */}
      <motion.span
        className="absolute inset-0 text-red-500 opacity-70"
        animate={safeAnimate({
          x: [0, -settings.amplitude, settings.amplitude, 0],
          opacity: [0, 0.7, 0, 0]
        })}
        transition={safeTransition({
          duration: settings.duration,
          repeat: 999999,
          repeatType: "loop",
          delay: 0.05
        })}
      >
        {text}
      </motion.span>
      
      <motion.span
        className="absolute inset-0 text-blue-500 opacity-70"
        animate={safeAnimate({
          x: [0, settings.amplitude, -settings.amplitude, 0],
          opacity: [0, 0.7, 0, 0]
        })}
        transition={safeTransition({
          duration: settings.duration,
          repeat: 999999,
          repeatType: "loop",
          delay: 0.1
        })}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

interface ShimmerTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function ShimmerText({ text, className = "", speed = 2 }: ShimmerTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      style={{
        background: `linear-gradient(90deg, 
          transparent 25%, 
          rgba(255,255,255,0.5) 50%, 
          transparent 75%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent"
      }}
      animate={safeAnimate({
        backgroundPosition: ["200% 0%", "-200% 0%"]
      })}
      transition={safeTransition({
        duration: speed,
        repeat: 999999,
        ease: "linear"
      })}
    >
      <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        {text}
      </span>
    </motion.span>
  );
}
