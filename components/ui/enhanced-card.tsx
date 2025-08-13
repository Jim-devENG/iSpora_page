import * as React from "react";
import { motion } from "motion/react";
import { cn } from "./utils";

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: "primary" | "secondary" | "accent";
  hoverEffect?: "tilt" | "lift" | "scale" | "glow";
  shimmer?: boolean;
  magnetic?: boolean;
}

export function EnhancedCard({
  children,
  className,
  glowColor = "primary",
  hoverEffect = "lift",
  shimmer = true,
  magnetic = false,
  ...props
}: EnhancedCardProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magnetic || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setMousePosition({
      x: (e.clientX - centerX) / 20,
      y: (e.clientY - centerY) / 20,
    });
  };

  const glowColors = {
    primary: "from-primary via-secondary to-accent",
    secondary: "from-secondary via-accent to-primary", 
    accent: "from-accent via-primary to-secondary"
  };

  const hoverVariants = {
    tilt: {
      rotateY: 8,
      rotateX: 8,
      y: -5,
      scale: 1.02,
    },
    lift: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
    },
    scale: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    },
    glow: {
      y: -3,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden group cursor-pointer",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      whileHover={hoverVariants[hoverEffect]}
      animate={magnetic ? safeAnimate({ 
        x: mousePosition.x, 
        y: mousePosition.y 
      }) : undefined}
      transition={safeTransition({ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        mass: 0.5
      })}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {/* Shimmer effect */}
      {shimmer && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
          initial={safeAnimate({ x: "-100%" })}
          whileHover={safeAnimate({ x: "100%" })}
          transition={safeTransition({ duration: 0.8, ease: "easeInOut" })}
        />
      )}
      
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${glowColors[glowColor]} opacity-0 group-hover:opacity-10 blur-xl`}
        whileHover={safeAnimate({ scale: 1.1 })}
        transition={safeTransition({ duration: 0.3 })}
      />
      
      {/* Border gradient on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.1), transparent)`,
          padding: "1px",
        }}
        whileHover={safeAnimate({ 
          background: `linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.3), transparent)` 
        })}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Floating particles on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={safeAnimate({
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            })}
            transition={safeTransition({
              duration: 2,
              repeat: 999999,
              delay: i * 0.2,
              ease: "easeInOut",
            })}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Specialized card variants
export function FeatureCard({ children, ...props }: Omit<EnhancedCardProps, 'hoverEffect'>) {
  return (
    <EnhancedCard hoverEffect="tilt" shimmer magnetic {...props}>
      {children}
    </EnhancedCard>
  );
}

export function ServiceCard({ children, ...props }: Omit<EnhancedCardProps, 'hoverEffect'>) {
  return (
    <EnhancedCard hoverEffect="lift" glowColor="secondary" {...props}>
      {children}
    </EnhancedCard>
  );
}

export function TestimonialCard({ children, ...props }: Omit<EnhancedCardProps, 'hoverEffect'>) {
  return (
    <EnhancedCard hoverEffect="glow" glowColor="accent" shimmer={false} {...props}>
      {children}
    </EnhancedCard>
  );
}
