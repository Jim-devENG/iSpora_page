import React from 'react';
import { Button } from '../ui/button';
import { motion } from 'motion/react';
import { safeAnimate, safeTransition } from '../utils/animationUtils';
import { cn } from '../ui/utils';
import { ArrowRight } from 'lucide-react';

interface CTA {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

interface CTAGroupProps {
  ctas: CTA[];
  className?: string;
  layout?: 'row' | 'column';
  align?: 'left' | 'center' | 'right';
}

export function CTAGroup({ ctas, className, layout = 'row', align = 'center' }: CTAGroupProps) {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  return (
    <motion.div
      className={cn(
        'flex gap-4',
        layout === 'row' ? 'flex-col sm:flex-row flex-wrap' : 'flex-col',
        alignClasses[align],
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: safeTransition({
            staggerChildren: 0.1,
            delayChildren: 0.2
          })
        }
      }}
    >
      {ctas.map((cta, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: safeTransition({ duration: 0.4 })
            }
          }}
        >
          <motion.div
            whileHover={safeAnimate({ scale: 1.05 })}
            whileTap={safeAnimate({ scale: 0.95 })}
          >
            <Button
              size="lg"
              variant={cta.variant || 'primary'}
              onClick={cta.onClick}
              className="h-12 px-6 text-base font-medium"
            >
              {cta.label}
              {cta.icon || (cta.variant !== 'outline' && <ArrowRight className="ml-2 h-4 w-4" />)}
            </Button>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

