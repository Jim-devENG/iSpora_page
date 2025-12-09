import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { safeAnimate, safeTransition } from '../utils/animationUtils';
import { cn } from '../ui/utils';

interface SpiralCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  index: number;
  className?: string;
  variant?: 'default' | 'blue' | 'accent';
}

export function SpiralCard({ title, description, icon, index, className, variant = 'default' }: SpiralCardProps) {
  const isBlue = variant === 'blue';
  const isAccent = variant === 'accent';
  
  return (
    <motion.div
      className={cn('h-full', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: safeTransition({ delay: index * 0.1, duration: 0.5 })
        }
      }}
    >
      <motion.div
        whileHover={safeAnimate({ y: -8, scale: 1.02 })}
        transition={safeTransition({ type: 'spring', stiffness: 300 })}
      >
        <Card 
          className={cn(
            "h-full transition-all duration-300 relative overflow-hidden",
            isBlue 
              ? "bg-primary text-primary-foreground border-primary shadow-lg hover:shadow-xl" 
              : isAccent
              ? "bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/30 shadow-md hover:shadow-lg"
              : "bg-card border-border shadow-sm hover:shadow-lg"
          )}
        >
          {/* Blue card gradient overlay */}
          {isBlue && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90 opacity-100" />
          )}
          
          <div className={cn("relative z-10", isBlue && "text-white")}>
            <CardHeader className="pb-4">
              {icon && (
                <motion.div
                  className={cn(
                    "mb-6 flex h-16 w-16 items-center justify-center rounded-xl",
                    isBlue 
                      ? "bg-white/20 text-white backdrop-blur-sm" 
                      : isAccent
                      ? "bg-primary/15 text-primary"
                      : "bg-primary/10 text-primary"
                  )}
                  animate={safeAnimate({
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0],
                  })}
                  transition={safeTransition({
                    duration: 3,
                    repeat: 999999,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  })}
                  whileHover={safeAnimate({ scale: 1.15, rotate: 360 })}
                >
                  {icon}
                </motion.div>
              )}
              <CardTitle className={cn(
                "text-2xl font-bold mb-2",
                isBlue && "text-white"
              )}>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className={cn(
                "text-base leading-relaxed",
                isBlue && "text-white/90"
              )}>
                {description}
              </CardDescription>
            </CardContent>
          </div>
          
          {/* Decorative corner element for blue card */}
          {isBlue && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-16 -mt-16" />
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
}

