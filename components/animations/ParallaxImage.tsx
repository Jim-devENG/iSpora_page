import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { safeAnimate, safeTransition } from '../utils/animationUtils';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export function ParallaxImage({ 
  src, 
  alt, 
  className = '',
  speed = 0.5,
  direction = 'up'
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [50 * speed, -50 * speed] : [-50 * speed, 50 * speed]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ y, opacity, scale }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        whileHover={safeAnimate({ scale: 1.05 })}
        transition={safeTransition({ duration: 0.3 })}
      />
    </motion.div>
  );
}

interface FloatingImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

export function FloatingImage({ 
  src, 
  alt, 
  className = '',
  delay = 0 
}: FloatingImageProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: safeTransition({ duration: 0.8, delay })
        }
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
        animate={safeAnimate({
          y: [0, -15, 0],
        })}
        transition={safeTransition({
          duration: 4,
          repeat: 999999,
          ease: "easeInOut",
          delay: delay + 0.5,
        })}
        whileHover={safeAnimate({ 
          scale: 1.05,
          rotate: [0, 2, -2, 0]
        })}
      />
    </motion.div>
  );
}

