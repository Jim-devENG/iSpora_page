import React from 'react';
import { motion } from 'motion/react';
import { safeAnimate, safeTransition } from '../utils/animationUtils';

export function AnimatedGradientBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(220 100% 94%) 0%, hsl(220 100% 92%) 50%, hsl(220 100% 95%) 100%)',
        }}
        animate={safeAnimate({
          background: [
            'linear-gradient(135deg, hsl(220 100% 94%) 0%, hsl(220 100% 92%) 50%, hsl(220 100% 95%) 100%)',
            'linear-gradient(225deg, hsl(220 100% 95%) 0%, hsl(220 100% 93%) 50%, hsl(220 100% 96%) 100%)',
            'linear-gradient(315deg, hsl(220 100% 96%) 0%, hsl(220 100% 94%) 50%, hsl(220 100% 97%) 100%)',
            'linear-gradient(135deg, hsl(220 100% 94%) 0%, hsl(220 100% 92%) 50%, hsl(220 100% 95%) 100%)',
          ],
        })}
        transition={safeTransition({
          duration: 10,
          repeat: 999999,
          ease: "easeInOut",
        })}
      />
    </div>
  );
}

export function AnimatedGrid({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(hsl(220 100% 40% / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(220 100% 40% / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={safeAnimate({
          backgroundPosition: ['0 0', '50px 50px'],
        })}
        transition={safeTransition({
          duration: 20,
          repeat: 999999,
          ease: "linear",
        })}
      />
    </div>
  );
}

export function AnimatedDots({ className = '' }: { className?: string }) {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    size: Math.random() * 4 + 2,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
          }}
          animate={safeAnimate({
            y: [0, -30, 0],
            x: [0, (dot.id % 2 === 0 ? 1 : -1) * 15, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          })}
          transition={safeTransition({
            duration: 3 + dot.delay,
            repeat: 999999,
            ease: "easeInOut",
            delay: dot.delay,
          })}
        />
      ))}
    </div>
  );
}

export function AnimatedWave({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 overflow-hidden ${className}`}>
      <motion.svg
        className="w-full h-32"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
          fill="url(#gradient)"
          animate={safeAnimate({
            d: [
              "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z",
              "M0,60 Q300,100 600,60 T1200,60 L1200,120 L0,120 Z",
              "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z",
            ],
          })}
          transition={safeTransition({
            duration: 8,
            repeat: 999999,
            ease: "easeInOut",
          })}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(220 100% 40% / 0.1)" />
            <stop offset="50%" stopColor="hsl(220 100% 40% / 0.05)" />
            <stop offset="100%" stopColor="hsl(220 100% 40% / 0.1)" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}

