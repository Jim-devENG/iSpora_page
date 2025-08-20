import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useElementVisibility } from './hooks/useVisibility';
import { safeOpacity, safeOpacityArray, safeDuration, safeTransition, safeAnimate } from './utils/animationUtils';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface ParticleSystemProps {
  particleCount?: number;
  className?: string;
  colors?: string[];
}

export function ParticleSystem({ 
  particleCount = 50, 
  className = "",
      colors = ['rgb(0, 51, 204)', 'rgb(144, 164, 231)', 'rgb(251, 191, 36)']
}: ParticleSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = React.useState<Particle[]>([]);
  const isVisible = useElementVisibility(containerRef);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Ensure we have valid dimensions before creating particles
    if (rect.width === 0 || rect.height === 0) return;

    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: safeOpacity(Math.random() * 0.6 + 0.2),
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setParticles(newParticles);

    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const newX = particle.x + particle.speedX;
          const newY = particle.y + particle.speedY;
          return {
            ...particle,
            x: newX < 0 ? rect.width : newX > rect.width ? 0 : newX,
            y: newY < 0 ? rect.height : newY > rect.height ? 0 : newY,
          };
        })
      );
    };

    // Only animate when visible for better performance
    let interval: number;
    if (isVisible) {
      interval = setInterval(animateParticles, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [particleCount, colors, isVisible]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.length > 0 && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={safeAnimate({
            scale: [1, 1.2, 1],
            opacity: [
              particle.opacity, 
              particle.opacity * 0.5, 
              particle.opacity
            ],
          })}
          transition={safeTransition({
            duration: 3 + (particle.id % 3) * 0.5,
            repeat: 999999,
            ease: "easeInOut",
          })}
        />
      ))}
      
      {/* Connection lines between nearby particles */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.length > 0 && particles.map((particle, i) => 
          particles.slice(i + 1).map((otherParticle, j) => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 100) {
              return (
                <motion.line
                  key={`line-${i}-${j}`}
                  x1={particle.x}
                  y1={particle.y}
                  x2={otherParticle.x}
                  y2={otherParticle.y}
                  stroke="rgb(0, 51, 204)"
                  strokeWidth="1"
                  opacity={safeOpacity(0.1 * (1 - distance / 100))}
                  initial={safeAnimate({ pathLength: 0 })}
                  animate={safeAnimate({ pathLength: 1 })}
                  transition={safeTransition({ duration: 2 })}
                />
              );
            }
            return null;
          })
        )}
      </svg>
    </div>
  );
}

// Floating geometric shapes component
export function FloatingShapes({ className = "" }: { className?: string }) {
  const shapes = [
    { type: 'circle', size: 'w-8 h-8', color: 'bg-primary/10', delay: 0 },
    { type: 'square', size: 'w-6 h-6', color: 'bg-secondary/10', delay: 1 },
    { type: 'triangle', size: 'w-10 h-10', color: 'bg-accent/10', delay: 2 },
    { type: 'circle', size: 'w-4 h-4', color: 'bg-primary/20', delay: 3 },
    { type: 'square', size: 'w-12 h-12', color: 'bg-secondary/5', delay: 4 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.size} ${shape.color} ${
            shape.type === 'circle' ? 'rounded-full' : 
            shape.type === 'square' ? 'rounded-lg' : 
            'rounded-sm transform rotate-45'
          }`}
          style={{
            left: `${(index * 17) % 80 + 10}%`,
            top: `${(index * 23) % 80 + 10}%`,
          }}
          animate={safeAnimate({
            y: [0, -30, 0],
            x: [0, (index % 3 - 1) * 10, 0],
            rotate: shape.type === 'triangle' ? [45, 135, 45] : [0, 360, 0],
            scale: [1, 1.1, 1],
          })}
          transition={safeTransition({
            duration: 8 + (index % 3) * 2,
            repeat: 999999,
            ease: "easeInOut",
            delay: shape.delay,
          })}
        />
      ))}
    </div>
  );
}

// Animated background gradient
export function AnimatedBackground({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={safeAnimate({
        background: [
          'radial-gradient(circle at 20% 20%, rgba(0, 51, 204, 0.1) 0%, transparent 50%)',
          'radial-gradient(circle at 80% 80%, rgba(144, 164, 231, 0.1) 0%, transparent 50%)',
          'radial-gradient(circle at 40% 60%, rgba(251, 191, 36, 0.05) 0%, transparent 50%)',
          'radial-gradient(circle at 20% 20%, rgba(0, 51, 204, 0.1) 0%, transparent 50%)',
        ],
      })}
      transition={safeTransition({
        duration: 10,
        repeat: 999999,
        ease: "easeInOut",
      })}
    />
  );
}
