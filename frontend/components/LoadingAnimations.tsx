import React from 'react';
import { motion } from 'motion/react';
import { Loader2, Sparkles, Globe } from 'lucide-react';
import { safeAnimate, safeTransition } from './utils/animationUtils';

// Pulsing orb loader
export function PulsingOrbLoader({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-primary via-secondary to-accent relative`}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: 999999,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-accent via-secondary to-primary"
          animate={{
            scale: [1, 0.8, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: 999999,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute inset-2 rounded-full bg-background"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: 999999,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
    </div>
  );
}

// Floating dots loader
export function FloatingDotsLoader() {
  const dots = [0, 1, 2];

  return (
    <div className="flex items-center justify-center space-x-2">
      {dots.map((dot) => (
        <motion.div
          key={dot}
          className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: 999999,
            ease: "easeInOut",
            delay: dot * 0.2,
          }}
        />
      ))}
    </div>
  );
}

// Morphing shape loader
export function MorphingShapeLoader() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-16 h-16 bg-gradient-to-r from-primary via-secondary to-accent"
        animate={{
          borderRadius: ["0%", "50%", "25%", "0%"],
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 3,
          repeat: 999999,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Spinning globe loader
export function SpinningGlobeLoader() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
        animate={safeAnimate({ rotate: [0, 360] })}
        transition={safeTransition({
          duration: 2,
          repeat: 999999,
          ease: "linear",
        })}
      >
        <Globe className="w-8 h-8 text-white" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent"
          animate={safeAnimate({ rotate: [0, -360] })}
          transition={safeTransition({
            duration: 1.5,
            repeat: 999999,
            ease: "linear",
          })}
        />
      </motion.div>
    </div>
  );
}

// Card skeleton loader
export function CardSkeleton() {
  return (
    <motion.div
      className="rounded-lg border bg-card p-6 space-y-4"
      initial={safeAnimate({ opacity: 0 })}
      animate={safeAnimate({ opacity: 1 })}
      transition={safeTransition({ duration: 0.5 })}
    >
      <motion.div
        className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse"
        animate={safeAnimate({
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        })}
        transition={safeTransition({
          duration: 2,
          repeat: 999999,
          ease: "linear",
        })}
        style={{
          backgroundSize: "200% 100%",
        }}
      />
      <motion.div
        className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded w-3/4 animate-pulse"
        animate={safeAnimate({
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        })}
        transition={safeTransition({
          duration: 2,
          repeat: 999999,
          ease: "linear",
          delay: 0.2,
        })}
        style={{
          backgroundSize: "200% 100%",
        }}
      />
      <motion.div
        className="h-32 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse"
        animate={safeAnimate({
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        })}
        transition={safeTransition({
          duration: 2,
          repeat: 999999,
          ease: "linear",
          delay: 0.4,
        })}
        style={{
          backgroundSize: "200% 100%",
        }}
      />
    </motion.div>
  );
}

// Page transition loader
export function PageTransitionLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-lg"
      initial={safeAnimate({ opacity: 0 })}
      animate={safeAnimate({ opacity: 1 })}
      exit={safeAnimate({ opacity: 0 })}
      transition={safeTransition({ duration: 0.3 })}
    >
      <div className="text-center space-y-6">
        <SpinningGlobeLoader />
        <motion.div
          className="flex items-center space-x-2 text-primary"
          animate={safeAnimate({ opacity: [1, 0.5, 1] })}
          transition={safeTransition({ duration: 1.5, repeat: 999999 })}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-lg font-medium">Loading amazing content...</span>
          <Sparkles className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Button loading state
export function ButtonLoadingSpinner({ size = "sm" }: { size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  
  return (
    <motion.div
      className={`${sizeClass} rounded-full border-2 border-current border-t-transparent`}
      animate={safeAnimate({ rotate: 360 })}
      transition={safeTransition({
        duration: 1,
        repeat: 999999,
        ease: "linear",
      })}
    />
  );
}
