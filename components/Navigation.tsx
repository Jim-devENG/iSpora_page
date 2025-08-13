import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { Logo } from './Logo';
import { 
  Menu, 
  X, 
  Globe, 
  Users, 
  Heart, 
  Building, 
  BookOpen,
  Phone,
  Mail,
  Sun,
  Moon,
  Sparkles,
  Target
} from 'lucide-react';
import { safeAnimate, safeTransition } from './utils/animationUtils';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navigationItems = [
    { id: 'home', label: 'Home', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'about', label: 'About Us', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'services', label: 'What We Do', icon: <Heart className="h-4 w-4" /> },
    { id: 'impact', label: 'Impact Areas', icon: <Target className="h-4 w-4" /> },
    { id: 'contact', label: 'Contact', icon: <Phone className="h-4 w-4" /> }
  ];

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/20 shadow-lg shadow-primary/5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        backdropFilter: 'blur(20px)',
        borderImage: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent) 1',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo 
            size="md" 
            showText={false}
            onClick={() => onPageChange('home')}
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 overflow-hidden ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                }`}
                onClick={() => onPageChange(item.id)}
                whileHover={safeAnimate({ 
                  scale: 1.05,
                  y: -2
                })}
                whileTap={safeAnimate({ scale: 0.95 })}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0"
                  initial={{ x: '-100%' }}
                  whileHover={safeAnimate({ x: '100%' as any })}
                  transition={safeTransition({ duration: 0.6 })}
                />
                <motion.div
                  className="relative z-10 flex items-center space-x-2"
                  whileHover={safeAnimate({ scale: 1.05 })}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.div>
                {currentPage === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                    layoutId="activeIndicator"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={safeTransition({ type: "spring", stiffness: 400, damping: 30 })}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Theme Toggle & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              onClick={toggleTheme}
              whileHover={safeAnimate({ scale: 1.05 })}
              whileTap={safeAnimate({ scale: 0.95 })}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={safeAnimate({ rotate: theme === 'dark' ? 180 : 0 })}
                transition={safeTransition({ duration: 0.3 })}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.div>
            </motion.button>
            
            <motion.button
              className="inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
              whileHover={safeAnimate({ scale: 1.05 })}
              whileTap={safeAnimate({ scale: 0.95 })}
              onClick={() => onPageChange('contact')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Get in Touch
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              onClick={toggleTheme}
              whileHover={safeAnimate({ scale: 1.05 })}
              whileTap={safeAnimate({ scale: 0.95 })}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={safeAnimate({ rotate: theme === 'dark' ? 180 : 0 })}
                transition={safeTransition({ duration: 0.3 })}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.div>
            </motion.button>
            
            <motion.button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={safeAnimate({ scale: 1.05 })}
              whileTap={safeAnimate({ scale: 0.95 })}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={safeAnimate({ opacity: 1, height: 'auto' })}
            exit={safeAnimate({ opacity: 0, height: 0 })}
            transition={safeTransition({ duration: 0.2 })}
          >
            <div className="px-2 pt-2 pb-6 space-y-1 bg-card border-t border-border/50">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-colors flex items-center space-x-3 ${
                    currentPage === item.id
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  whileHover={safeAnimate({ scale: 1.02 })}
                  whileTap={safeAnimate({ scale: 0.98 })}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              ))}
              
              <div className="pt-4 border-t border-border/50">
                <motion.button
                  className="inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 w-full"
                  whileHover={safeAnimate({ scale: 1.02 })}
                  whileTap={safeAnimate({ scale: 0.98 })}
                  onClick={() => {
                    onPageChange('contact');
                    setIsMenuOpen(false);
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Get in Touch
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
