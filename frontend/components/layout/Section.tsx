import React from 'react';
import { cn } from '../ui/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export function Section({ 
  children, 
  className, 
  containerClassName,
  id,
  style,
  ...props
}: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn('py-16 sm:py-20 lg:py-24', className)}
      style={style}
      {...props}
    >
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  );
}

