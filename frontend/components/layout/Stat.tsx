import React from 'react';
import { motion } from 'motion/react';
import { safeAnimate, safeTransition } from '../utils/animationUtils';
import { cn } from '../ui/utils';

interface StatProps {
  value: string | number;
  label: string;
  className?: string;
  delay?: number;
}

export function Stat({ value, label, className, delay = 0 }: StatProps) {
  return (
    <motion.div
      className={cn('text-center', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: safeTransition({ delay, duration: 0.5 })
        }
      }}
    >
      <motion.div
        className="text-3xl sm:text-4xl font-bold text-primary mb-1"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={safeTransition({ delay: delay + 0.1, type: 'spring', stiffness: 200 })}
      >
        {value}
      </motion.div>
      <div className="text-sm sm:text-base text-muted-foreground font-medium">
        {label}
      </div>
    </motion.div>
  );
}

