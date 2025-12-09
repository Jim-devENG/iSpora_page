import React from 'react';
import { motion } from 'motion/react';
import { safeAnimate, safeTransition } from '../utils/animationUtils';

interface FloatingElementProps {
  className?: string;
  delay?: number;
  duration?: number;
  children?: React.ReactNode;
}

export function FloatingElement({ 
  className = '', 
  delay = 0, 
  duration = 3,
  children 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={safeAnimate({
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 5, 0],
      })}
      transition={safeTransition({
        duration: duration,
        repeat: 999999,
        ease: "easeInOut",
        delay: delay,
      })}
    >
      {children}
    </motion.div>
  );
}

export function FloatingIcon({ 
  icon, 
  className = '',
  delay = 0,
  size = 'w-12 h-12'
}: { 
  icon: React.ReactNode;
  className?: string;
  delay?: number;
  size?: string;
}) {
  return (
    <FloatingElement delay={delay} duration={4 + Math.random() * 2}>
      <motion.div
        className={`${size} ${className} flex items-center justify-center rounded-full bg-primary/10 text-primary`}
        whileHover={safeAnimate({ scale: 1.2, rotate: 360 })}
        transition={safeTransition({ duration: 0.5 })}
      >
        {icon}
      </motion.div>
    </FloatingElement>
  );
}

export function AnimatedBlob({ 
  className = '',
  delay = 0,
  size = 'w-64 h-64'
}: {
  className?: string;
  delay?: number;
  size?: string;
}) {
  return (
    <motion.div
      className={`absolute ${size} ${className} rounded-full blur-3xl opacity-30`}
      animate={safeAnimate({
        x: [0, 100, 0],
        y: [0, 50, 0],
        scale: [1, 1.2, 1],
      })}
      transition={safeTransition({
        duration: 8 + delay,
        repeat: 999999,
        ease: "easeInOut",
        delay: delay,
      })}
    />
  );
}

export function FloatingShapes() {
  const shapes = [
    { type: 'circle', size: 'w-20 h-20', color: 'bg-primary/20', delay: 0, x: '10%', y: '20%' },
    { type: 'square', size: 'w-16 h-16', color: 'bg-secondary/20', delay: 1, x: '80%', y: '30%' },
    { type: 'circle', size: 'w-12 h-12', color: 'bg-accent/20', delay: 2, x: '70%', y: '70%' },
    { type: 'square', size: 'w-24 h-24', color: 'bg-primary/10', delay: 3, x: '20%', y: '80%' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.size} ${shape.color} ${
            shape.type === 'circle' ? 'rounded-full' : 'rounded-lg'
          }`}
          style={{
            left: shape.x,
            top: shape.y,
          }}
          animate={safeAnimate({
            y: [0, -40, 0],
            x: [0, (index % 2 === 0 ? 1 : -1) * 20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          })}
          transition={safeTransition({
            duration: 6 + index * 1.5,
            repeat: 999999,
            ease: "easeInOut",
            delay: shape.delay,
          })}
        />
      ))}
    </div>
  );
}

