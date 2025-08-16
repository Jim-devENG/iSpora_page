import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { 
  Globe, 
  Mail, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Facebook, 
  MapPin,
  Phone,
  Heart,
  ArrowRight,
  Sparkles,
  Bell,
  Users,
  BookOpen,
  Building,
  Lightbulb
} from 'lucide-react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

export function Footer({ onPageChange }: FooterProps) {
  const footerSections = [
    {
      title: 'About iSpora',
      items: [
        { label: 'Our Story', onClick: () => onPageChange('about') },
        { label: 'Platform Preview', onClick: () => onPageChange('features') },
        { label: 'Success Stories', onClick: () => onPageChange('projects') },
        { label: 'Blog & News', onClick: () => onPageChange('blog') }
      ]
    },
    {
      title: 'Community',
      items: [
        { label: 'For Diasporans', onClick: () => onPageChange('diasporans') },
        { label: 'For Youth', onClick: () => onPageChange('youth') },
        { label: 'Mentorship Hub', onClick: () => onPageChange('mentorship') },
        { label: 'Partners', onClick: () => onPageChange('partners') }
      ]
    },
    {
      title: 'Resources',
      items: [
        { label: 'Help Center', onClick: () => {} },
        { label: 'Community Guidelines', onClick: () => {} },
        { label: 'Privacy Policy', onClick: () => {} },
        { label: 'Terms of Service', onClick: () => {} }
      ]
    },
    {
      title: 'Connect',
      items: [
        { label: 'Contact Us', onClick: () => onPageChange('contact') },
        { label: 'Press Kit', onClick: () => {} },
        { label: 'Careers', onClick: () => {} },
        { label: 'Partnerships', onClick: () => {} }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: 'https://x.com/ispora_', label: 'Twitter' },
    { icon: <Linkedin className="h-5 w-5" />, href: 'https://www.linkedin.com/company/ispora/', label: 'LinkedIn' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://www.instagram.com/ispora_official/', label: 'Instagram' },
    { icon: <Facebook className="h-5 w-5" />, href: 'https://www.facebook.com/profile.php?id=61578588581183', label: 'Facebook' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: safeTransition({
        staggerChildren: 0.1,
        delayChildren: 0.2
      })
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: safeTransition({
        type: "spring",
        stiffness: 100,
        damping: 10
      })
    }
  };

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      {/* Newsletter Section */}
      <div className="border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Badge variant="outline" className="mb-4 text-primary border-primary/20">
                <Sparkles className="h-4 w-4 mr-2" />
                Stay Updated
              </Badge>
            </motion.div>
            
            <motion.h3 
              className="text-2xl font-bold mb-4"
              variants={itemVariants}
            >
              Be the First to Know
            </motion.h3>
            
            <motion.p 
              className="text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Join our community of changemakers and get exclusive updates on our platform launch, success stories, and opportunities to get involved.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
              variants={itemVariants}
            >
              <div className="flex-1 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <motion.button
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 w-full sm:w-auto"
                whileHover={safeAnimate({ scale: 1.05 })}
                whileTap={safeAnimate({ scale: 0.95 })}
              >
                <Bell className="h-4 w-4 mr-2" />
                Join Waitlist
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <motion.div 
              className="flex items-center mb-4"
              whileHover={safeAnimate({ scale: 1.05 })}
            >
              <motion.div 
                className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-3"
                animate={safeAnimate({ rotate: [0, 5, 0] })}
                transition={safeTransition({ duration: 2, repeat: 999999, ease: "easeInOut" })}
              >
                <Globe className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  iSpora
                </span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  Coming Soon
                </Badge>
              </div>
            </motion.div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Connecting African diaspora professionals with youth back home to build impact-driven projects that transform communities and create lasting change.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="h-10 w-10 rounded-lg bg-muted hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                                        whileHover={safeAnimate({ scale: 1.1, rotate: 5 })}
                                      whileTap={safeAnimate({ scale: 0.9 })}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
            >
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <motion.li key={itemIndex}>
                    <motion.button
                      className="text-muted-foreground hover:text-primary transition-colors text-left"
                      onClick={item.onClick}
                      whileHover={safeAnimate({ x: 5 })}
                    >
                      {item.label}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          className="mt-12 pt-8 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <span className="text-muted-foreground">info@ispora.com</span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <span className="text-muted-foreground">Global • Remote First</span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <span className="text-muted-foreground">Building Community</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="flex items-center space-x-2 mb-4 md:mb-0"
            variants={itemVariants}
          >
                            <span className="text-muted-foreground">© 2025 iSpora. Built with</span>
            <motion.div
              animate={safeAnimate({ scale: [1, 1.2, 1] })}
              transition={safeTransition({ duration: 2, repeat: 999999, ease: "easeInOut" })}
            >
              <Heart className="h-4 w-4 text-red-500" />
            </motion.div>
            <span className="text-muted-foreground">for Africa's future.</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-6 text-sm text-muted-foreground"
            variants={itemVariants}
          >
            <motion.button 
              className="hover:text-primary transition-colors"
              whileHover={safeAnimate({ scale: 1.05 })}
            >
              Privacy Policy
            </motion.button>
            <motion.button 
              className="hover:text-primary transition-colors"
              whileHover={safeAnimate({ scale: 1.05 })}
            >
              Terms of Service
            </motion.button>
            <motion.button 
              className="hover:text-primary transition-colors"
              whileHover={safeAnimate({ scale: 1.05 })}
            >
              Cookies
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
