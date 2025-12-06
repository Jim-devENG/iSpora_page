import React from 'react';
import { motion } from 'motion/react';
import { safeAnimate, safeTransition } from '../utils/animationUtils';
import { cn } from '../ui/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function PageHeader({ 
  title, 
  subtitle, 
  description, 
  className,
  align = 'center'
}: PageHeaderProps) {
  const alignClasses = align === 'center' ? 'text-center' : 'text-left';
  
  return (
    <motion.div
      className={cn('mb-12 sm:mb-16', alignClasses, className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: safeTransition({ duration: 0.6 })
        }
      }}
    >
      {subtitle && (
        <motion.div
          className="mb-4"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: safeTransition({ delay: 0.1 })
            }
          }}
        >
          <span className="inline-flex items-center rounded-full border border-primary/20 px-3 py-1 text-sm font-medium text-primary">
            {subtitle}
          </span>
        </motion.div>
      )}
      
      <motion.h1
        className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: safeTransition({ delay: 0.2 })
          }
        }}
      >
        {title}
      </motion.h1>
      
      {description && (
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: safeTransition({ delay: 0.3 })
            }
          }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

