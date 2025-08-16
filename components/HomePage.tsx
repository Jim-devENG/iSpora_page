import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { motion } from 'motion/react';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { 
  Rocket, 
  Users, 
  Heart, 
  Building, 
  Lightbulb, 
  MessageCircle, 
  Trophy, 
  BarChart3,
  Star,
  ArrowRight,
  CheckCircle,
  Globe,
  Target,
  Zap,
  Calendar,
  Clock,
  FileText,
  Video,
  Settings,
  Award,
  TrendingUp,
  PlusCircle,
  Send,
  Mail,
  Bell,
  Sparkles,
  Map,
  Network,
  Infinity,
  BookOpen,
  GraduationCap,
  Briefcase,
  Earth
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ParticleSystem, FloatingShapes, AnimatedBackground } from './ParticleSystem';
import { TypewriterEffect, CountUpAnimation } from './TextAnimations';
import { AnimationErrorBoundary } from './AnimationErrorBoundary';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {
  const impactAreas = [
    { 
      number: 'Mentorship', 
      label: 'Global Professional Connections', 
      icon: <Heart className="h-6 w-6" />,
      description: 'Bridging global expertise with worldwide ambition'
    },
    { 
      number: 'Research', 
      label: 'Academic & Innovation Projects', 
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Advancing knowledge across continents'
    },
    { 
      number: 'Career', 
      label: 'Entrepreneurship & Growth', 
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Building sustainable global businesses'
    },
    { 
      number: 'Community', 
      label: 'Worldwide Impact Initiatives', 
      icon: <Users className="h-6 w-6" />,
      description: 'Creating change across all borders'
    }
  ];

  const missionValues = [
    {
      icon: <Earth className="h-8 w-8" />,
      title: 'Global Reach',
      description: 'Connecting diaspora professionals worldwide with opportunities and talent in every corner of the globe.'
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Innovation Focus',
      description: 'Fostering creative solutions and collaborative approaches to global challenges through diverse perspectives.'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Sustainable Impact',
      description: 'Creating long-term, measurable change that benefits communities worldwide and drives global development.'
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: 'Collaborative Spirit',
      description: 'Building strong partnerships between global diaspora communities and local talent across all continents.'
    }
  ];

  const testimonials = [
    {
      quote: "iSpora represents the global bridge we've been waiting for - connecting diaspora professionals worldwide with opportunities to create meaningful impact globally.",
      author: "Dr. Amara Okafor",
      role: "Software Engineer & Global Diaspora Professional",
      location: "Silicon Valley, USA",
      avatar: "AO"
    },
    {
      quote: "The global mentorship and collaboration opportunities through iSpora have opened doors I never imagined possible. It's transforming lives across continents.",
      author: "James Kimani",
      role: "Young Entrepreneur",
      location: "Nairobi, Kenya",
      avatar: "JK"
    },
    {
      quote: "This organization understands that real impact comes from authentic collaboration between global diaspora expertise and local knowledge worldwide.",
      author: "Dr. Sarah Chen",
      role: "Development Researcher",
      location: "London, UK",
      avatar: "SC"
    }
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

  const floatingAnimation = safeAnimate({
    y: [0, -10, 0],
    transition: safeTransition({
      duration: 4,
      repeat: 999999,
      ease: "easeInOut"
    })
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-32 sm:py-40">
        <AnimationErrorBoundary>
          <AnimatedBackground />
          <ParticleSystem particleCount={60} className="opacity-40" />
          <FloatingShapes />
        </AnimationErrorBoundary>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent)] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.div 
                className="inline-flex items-center rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-foreground mb-6"
                animate={floatingAnimation}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Building Global Impact Together
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl font-bold tracking-tight sm:text-7xl relative"
              variants={itemVariants}
            >
              <motion.span
                className="text-primary relative inline-block"
              >
                iSpora: The Global Impact Engine
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-2xl"
                  animate={safeAnimate({
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.05, 1],
                  })}
                  transition={safeTransition({
                    duration: 3,
                    repeat: 999999,
                    ease: "easeInOut",
                  })}
                />
              </motion.span>
            </motion.h1>
            
            <motion.div
              className="mt-4 text-2xl font-medium"
              variants={itemVariants}
            >
              <AnimationErrorBoundary fallback={
                <span className="text-foreground">Connecting Global Minds</span>
              }>
                <TypewriterEffect
                  texts={[
                    "Connecting Global Minds",
                    "Building Worldwide Impact", 
                    "Empowering Diaspora Communities",
                    "Creating Sustainable Change",
                    "Bridging Continents Through Innovation"
                  ]}
                  className="text-foreground"
                  speed={80}
                  delay={3000}
                />
              </AnimationErrorBoundary>
            </motion.div>
            
            <motion.p 
              className="mt-8 text-xl leading-8 text-foreground max-w-4xl mx-auto"
              variants={itemVariants}
            >
              We connect diaspora professionals worldwide with talent and opportunities globally, creating meaningful projects that drive sustainable development and positive change across all continents.
            </motion.p>
            
            <motion.div 
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
              variants={itemVariants}
            >
              <motion.button 
                className="relative inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden group"
                whileHover={safeAnimate({ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                })}
                whileTap={safeAnimate({ scale: 0.95 })}
                onClick={() => onPageChange('contact')}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100"
                  initial={safeAnimate({ x: "-100%" as any })}
                  whileHover={safeAnimate({ x: "0%" as any })}
                  transition={safeTransition({ duration: 0.3 })}
                />
                <motion.div
                  className="relative z-10 flex items-center"
                  whileHover={safeAnimate({ scale: 1.05 })}
                >
                  <motion.div
                    animate={safeAnimate({ rotate: [0, 360] })}
                    transition={safeTransition({ duration: 2, repeat: 999999, ease: "linear" })}
                  >
                    <Earth className="mr-2 h-5 w-5" />
                  </motion.div>
                  Join Our Global Mission
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={safeAnimate({
                    boxShadow: [
                      "inset 0 0 0 0 rgba(255,255,255,0.2)",
                      "inset 0 0 0 2px rgba(255,255,255,0.2)",
                      "inset 0 0 0 0 rgba(255,255,255,0.2)"
                    ]
                  })}
                  transition={safeTransition({ duration: 2, repeat: 999999 })}
                />
              </motion.button>
              
              <motion.button 
                className="relative inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium border-2 border-primary/20 bg-background/50 backdrop-blur-sm overflow-hidden group"
                whileHover={safeAnimate({ 
                  scale: 1.05,
                  borderColor: "rgba(59, 130, 246, 0.5)",
                  backgroundColor: "rgba(59, 130, 246, 0.05)"
                })}
                whileTap={safeAnimate({ scale: 0.95 })}
                onClick={() => onPageChange('about')}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100"
                  initial={safeAnimate({ scale: 0 })}
                  whileHover={safeAnimate({ scale: 1 })}
                  transition={safeTransition({ duration: 0.3 })}
                />
                <motion.div className="relative z-10 flex items-center">
                  Discover Our Story
                  <motion.div
                    whileHover={safeAnimate({ x: 5 as any })}
                    transition={safeTransition({ type: "spring", stiffness: 400 })}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <motion.div 
          className="absolute top-20 left-10 hidden lg:block"
          animate={safeAnimate({ rotate: [0, 360] })}
          transition={safeTransition({ duration: 20, repeat: 999999, ease: "linear" })}
        >
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
            <Earth className="h-8 w-8 text-primary" />
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute top-32 right-20 hidden lg:block"
          animate={floatingAnimation}
        >
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 flex items-center justify-center">
            <Heart className="h-6 w-6 text-secondary" />
          </div>
        </motion.div>
      </section>

      {/* Impact Areas */}
      <section className="py-20 bg-background/50 dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              variants={itemVariants}
            >
              Our Global Focus Areas
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Four key areas where we create lasting impact through worldwide diaspora collaboration
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {impactAreas.map((area, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div 
                  className="relative rounded-lg border bg-card text-card-foreground shadow-sm text-center h-full overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                  whileHover={safeAnimate({ 
                    y: -5, 
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                  })}
                  transition={safeTransition({ type: "spring", stiffness: 300, damping: 20 })}
                >
                  {/* Subtle shimmer effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={safeAnimate({ x: "100%" as any })}
                    transition={safeTransition({ duration: 0.6 })}
                  />
                  
                  {/* Subtle border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-0 group-hover:opacity-100 blur-xl"
                    whileHover={safeAnimate({ scale: 1.05 })}
                    transition={safeTransition({ duration: 0.3 })}
                  />
                  
                  <div className="relative flex flex-col space-y-1.5 p-6 z-10">
                    <motion.div 
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary relative overflow-hidden border border-primary/20"
                      whileHover={safeAnimate({ 
                        scale: 1.1, 
                        rotate: 5,
                        boxShadow: "0 8px 20px rgba(var(--primary), 0.2)"
                      })}
                      transition={safeTransition({ type: "spring", stiffness: 400 })}
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary/5 opacity-0"
                        whileHover={safeAnimate({ opacity: 1 })}
                        transition={safeTransition({ duration: 0.3 })}
                      />
                      <motion.div className="relative z-10">
                        {area.icon}
                      </motion.div>
                    </motion.div>
                    <h3 className="text-xl font-bold text-primary">{area.number}</h3>
                    <h4 className="text-lg font-semibold">{area.label}</h4>
                  </div>
                  <div className="p-6 pt-0">
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center rounded-full border border-primary/20 px-3 py-1 text-xs font-semibold text-primary mb-6">
                Our Global Mission
              </div>
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Empowering the World Through Connection
            </motion.h2>
            <motion.p 
              className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
              variants={itemVariants}
            >
              We believe that diaspora communities worldwide hold tremendous potential to drive positive change across the globe. Our organization facilitates meaningful connections and collaborative projects that create lasting impact everywhere.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {missionValues.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div 
                  className="rounded-lg border bg-card text-card-foreground shadow-sm text-center h-full hover:shadow-lg transition-shadow duration-300 p-6"
                  whileHover={safeAnimate({ y: -5, scale: 1.02 })}
                  transition={safeTransition({ type: "spring", stiffness: 300 })}
                >
                  <motion.div 
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white mb-4"
                    whileHover={safeAnimate({ scale: 1.1, rotate: 5 })}
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold leading-none tracking-tight mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Do Preview */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              variants={itemVariants}
            >
              Creating Global Impact Through Five Key Services
            </motion.h2>
            <motion.p 
              className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
              variants={itemVariants}
            >
              From mentorship and research to entrepreneurship and community development, we facilitate meaningful collaboration across continents and cultures worldwide.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary text-white"
                    whileHover={safeAnimate({ scale: 1.1, rotate: 5 })}
                  >
                    <Heart className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold">Comprehensive Global Services</h3>
                    <p className="text-muted-foreground">Five core areas of worldwide impact</p>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our services span mentorship and coaching, academic and research projects, career and entrepreneurship development, community impact initiatives, and collaboration and innovation projects. Each area is designed to create sustainable change and meaningful connections across all borders.
                </p>
                
                <div className="space-y-3">
                  {[
                    'Global Mentorship & Coaching Programs',
                    'International Academic & Research Collaboration',
                    'Worldwide Career & Entrepreneurship Development',
                    'Cross-Border Community Impact Projects',
                    'Global Innovation & Collaboration Initiatives'
                  ].map((service, serviceIndex) => (
                    <motion.div 
                      key={serviceIndex} 
                      className="flex items-center space-x-3"
                      whileHover={safeAnimate({ x: 5 })}
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{service}</span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button 
                  className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors"
                  whileHover={safeAnimate({ scale: 1.05 })}
                  whileTap={safeAnimate({ scale: 0.95 })}
                  onClick={() => onPageChange('services')}
                >
                  Explore Our Global Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <motion.div 
                className="relative group"
                whileHover={safeAnimate({ scale: 1.02 })}
                transition={safeTransition({ type: "spring", stiffness: 300, damping: 20 })}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl transform scale-105" />
                <div className="relative overflow-hidden rounded-3xl border border-border/50 shadow-xl">
                  <div className="aspect-video relative">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format"
                      alt="Global collaborative impact and partnership"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
                    
                    {/* Stats overlay */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-gray-900">Global Community</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <Earth className="h-4 w-4 text-secondary" />
                          <span className="text-sm font-medium text-gray-900">Worldwide Impact</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center rounded-full border border-primary/20 px-3 py-1 text-xs font-semibold text-primary mb-6">
                Global Community Voices
              </div>
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              variants={itemVariants}
            >
              What Our Global Community Says
            </motion.h2>
            <motion.p 
              className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Hear from diaspora professionals worldwide and local talent who believe in our mission to create positive change across the globe.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div 
                  className="rounded-lg border bg-card text-card-foreground shadow-sm h-full hover:shadow-lg transition-shadow duration-300"
                  whileHover={safeAnimate({ y: -5, scale: 1.02 })}
                  transition={safeTransition({ type: "spring", stiffness: 300 })}
                >
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 + index * 0.2 }}
                        >
                          <Star className="h-5 w-5 fill-accent text-accent" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 pt-0 space-y-4">
                    <blockquote className="text-lg leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Map className="h-3 w-3 mr-1" />
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join the Movement */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground mb-6">
                <Infinity className="h-4 w-4 mr-2" />
                Infinite Global Possibilities
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
              variants={itemVariants}
            >
              Be Part of Global Transformation
            </motion.h2>
            
            <motion.p 
              className="mt-6 text-xl text-white/90 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Whether you're a diaspora professional anywhere in the world looking to contribute or a local organization seeking global partnerships, join us in creating meaningful change across all continents.
            </motion.p>
            
            <motion.div 
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
              variants={itemVariants}
            >
              <motion.button 
                className="inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
                whileHover={safeAnimate({ scale: 1.05 })}
                whileTap={safeAnimate({ scale: 0.95 })}
                onClick={() => onPageChange('contact')}
              >
                <Mail className="mr-2 h-5 w-5" />
                Join Our Global Movement
              </motion.button>
              
              <motion.button 
                className="inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium border border-white/20 text-white hover:bg-white hover:text-primary transition-colors"
                whileHover={safeAnimate({ scale: 1.05 })}
                whileTap={safeAnimate({ scale: 0.95 })}
                onClick={() => onPageChange('about')}
              >
                Discover Our Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
