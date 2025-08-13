import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { 
  Heart, 
  Globe, 
  Target, 
  Users, 
  Lightbulb,
  Award,
  Calendar,
  MapPin,
  Linkedin,
  Twitter,
  Mail,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Network,
  Rocket,
  CheckCircle,
  Earth
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { aboutValues, teamMembers, timelineData, statsData } from './data/aboutData';
import { safeAnimate, safeTransition } from './utils/animationUtils';

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

const iconMap = {
  Heart: Heart,
  Lightbulb: Lightbulb,
  Users: Users
};

export function AboutPage({ onPageChange }: AboutPageProps) {
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

  // Updated diaspora connection points to reflect global scope
  const connectionPoints = [
    { x: 15, y: 30, label: "London", color: "primary" },
    { x: 25, y: 25, label: "Toronto", color: "secondary" },
    { x: 35, y: 20, label: "New York", color: "accent" },
    { x: 75, y: 30, label: "Silicon Valley", color: "primary" },
    { x: 85, y: 35, label: "Sydney", color: "secondary" },
    { x: 45, y: 35, label: "Mumbai", color: "accent" },
    { x: 55, y: 40, label: "São Paulo", color: "primary" },
    { x: 35, y: 45, label: "Berlin", color: "secondary" },
    { x: 65, y: 50, label: "Singapore", color: "accent" },
    { x: 50, y: 25, label: "Dubai", color: "primary" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(30,58,138,0.1),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent)] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.div 
                className="inline-flex items-center rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-primary mb-6"
                animate={floatingAnimation}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Our Global Story
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Building Bridges,
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Creating Global Futures</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                iSpora was born from a simple belief: that diaspora professionals worldwide, combined with the ambition of talent everywhere, can transform entire communities and create lasting global impact.
              </p>
            </motion.div>
            
            {/* Enhanced Global Diaspora Connection Map */}
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <div className="relative h-96 w-full bg-gradient-to-br from-muted/50 to-muted/80 rounded-3xl overflow-hidden border border-border/50">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" className="animate-pulse">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Global Connection Points */}
                {connectionPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className="absolute"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    initial={safeAnimate({ scale: 0, opacity: 0 })}
                    animate={safeAnimate({ scale: 1, opacity: 1 })}
                    transition={safeTransition({ delay: index * 0.15, type: "spring", stiffness: 200 })}
                  >
                    {/* Connection Lines to Center Hub */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 origin-left h-0.5 bg-gradient-to-r from-primary/30 to-transparent"
                      style={{
                        width: `${Math.sqrt(
                          Math.pow((50 - point.x) * 4, 2) +
                          Math.pow((35 - point.y) * 4, 2)
                        )}px`,
                        transform: `translate(-50%, -50%) rotate(${Math.atan2(
                          (35 - point.y),
                          (50 - point.x)
                        ) * (180 / Math.PI)}deg)`
                      }}
                      initial={safeAnimate({ scaleX: 0 })}
                      animate={safeAnimate({ scaleX: 1 })}
                      transition={safeTransition({ delay: index * 0.2 + 0.5, duration: 0.8 })}
                    />
                    
                    {/* Connection Point */}
                    <motion.div
                      className={`h-3 w-3 rounded-full bg-gradient-to-r ${
                        point.color === 'primary' ? 'from-primary to-primary/80' :
                        point.color === 'secondary' ? 'from-secondary to-secondary/80' :
                        'from-accent to-accent/80'
                      } transform -translate-x-1/2 -translate-y-1/2 relative`}
                      animate={safeAnimate({
                        scale: [1, 1.3, 1],
                        boxShadow: ["0 0 0 0 rgba(59,130,246,0.4)", "0 0 0 8px rgba(59,130,246,0)", "0 0 0 0 rgba(59,130,246,0)"]
                      })}
                      transition={safeTransition({
                        duration: 2.5,
                        repeat: 999999,
                        delay: index * 0.2
                      })}
                    >
                      {/* City Label */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-medium text-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded whitespace-nowrap">
                        {point.label}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Center Global Hub */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={safeAnimate({ scale: 0 })}
                  animate={safeAnimate({ scale: 1 })}
                  transition={safeTransition({ delay: 1, type: "spring", stiffness: 200 })}
                >
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center text-white relative">
                    <motion.div
                      animate={safeAnimate({ rotate: [0, 360] })}
                      transition={safeTransition({ duration: 20, repeat: 999999, ease: "linear" })}
                    >
                      <Earth className="h-8 w-8" />
                    </motion.div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-primary whitespace-nowrap">
                      Global Hub
                    </div>
                  </div>
                </motion.div>

                {/* Floating Achievement Bubbles */}
                <motion.div
                  className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                  animate={floatingAnimation}
                >
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Global Network</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                  animate={safeAnimate({
                    y: [0, -8, 0],
                    transition: safeTransition({
                      duration: 3,
                      repeat: 999999,
                      ease: "easeInOut",
                      delay: 1
                    })
                  })}
                >
                  <div className="flex items-center space-x-2">
                    <Earth className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-medium">Worldwide Impact</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {statsData.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div 
                  className="text-3xl font-bold text-primary mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    delay: index * 0.1 
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <motion.div
                  className="mx-auto mt-2 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision with Enhanced Visual */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.div 
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 h-full"
                whileHover={safeAnimate({ y: -5, scale: 1.02 })}
                transition={safeTransition({ type: "spring", stiffness: 300 })}
              >
                <div className="flex flex-col space-y-1.5 p-0">
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.div 
                      className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center"
                      whileHover={safeAnimate({ rotate: 10, scale: 1.1 })}
                    >
                      <Target className="h-6 w-6 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Our Global Mission</h3>
                  </div>
                </div>
                <div className="p-0 pt-0">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To bridge the gap between diaspora expertise worldwide and local talent by creating a global platform where knowledge, mentorship, and opportunity flow freely across borders, empowering people everywhere to build the future they envision.
                  </p>
                  <motion.div 
                    className="mt-6 flex items-center space-x-2 text-primary"
                    whileHover={safeAnimate({ x: 5 })}
                  >
                    <span className="font-medium">Learn more about our global approach</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.div 
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 h-full"
                whileHover={safeAnimate({ y: -5, scale: 1.02 })}
                transition={safeTransition({ type: "spring", stiffness: 300 })}
              >
                <div className="flex flex-col space-y-1.5 p-0">
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.div 
                      className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center"
                      whileHover={safeAnimate({ rotate: -10, scale: 1.1 })}
                    >
                      <Earth className="h-6 w-6 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Our Global Vision</h3>
                  </div>
                </div>
                <div className="p-0 pt-0">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A world where geographic distance is no barrier to opportunity, where every ambitious person anywhere has access to world-class mentorship from global diaspora professionals, and where success stories become launching pads for the next generation worldwide.
                  </p>
                  <motion.div 
                    className="mt-6 flex items-center space-x-2 text-secondary"
                    whileHover={safeAnimate({ x: 5 })}
                  >
                    <span className="font-medium">Explore our global impact</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values with Enhanced Animation */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Badge variant="outline" className="mb-6 text-primary border-primary/20">
                Global Core Values
              </Badge>
            </motion.div>
            <motion.h2 
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              variants={itemVariants}
            >
              The Principles That Guide Our Global Mission
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-muted-foreground"
              variants={itemVariants}
            >
              Everything we build is rooted in these fundamental beliefs about global collaboration
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {aboutValues.map((value, index) => {
              const IconComponent = iconMap[value.icon as keyof typeof iconMap];
              return (
                <motion.div key={index} variants={itemVariants}>
                  <motion.div 
                    className="rounded-lg border bg-card text-card-foreground shadow-sm text-center p-8 h-full"
                    whileHover={safeAnimate({ y: -10, scale: 1.05 })}
                    transition={safeTransition({ type: "spring", stiffness: 300 })}
                  >
                    <div className="flex flex-col space-y-1.5 p-0">
                      <motion.div 
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white mb-4"
                        whileHover={safeAnimate({ 
                          scale: 1.2, 
                          rotate: [0, 10, -10, 0],
                          backgroundColor: ["#1e3a8a", "#0ea5e9", "#1e3a8a"]
                        })}
                        transition={safeTransition({ duration: 0.6 })}
                      >
                        <IconComponent className="h-8 w-8" />
                      </motion.div>
                      <h3 className="font-semibold leading-none tracking-tight">{value.title}</h3>
                    </div>
                    <div className="p-0 pt-0">
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Team Section */}
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
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              variants={itemVariants}
            >
              Meet Our Global Team
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-muted-foreground"
              variants={itemVariants}
            >
              Passionate individuals dedicated to creating impact across borders and continents
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div 
                  className="rounded-lg border bg-card text-card-foreground shadow-sm text-center overflow-hidden"
                  whileHover={safeAnimate({ y: -5, scale: 1.02 })}
                  transition={safeTransition({ type: "spring", stiffness: 300 })}
                >
                  <div className="flex flex-col space-y-1.5 p-6">
                    <motion.div
                      whileHover={safeAnimate({ scale: 1.1, rotate: 5 })}
                      transition={safeTransition({ type: "spring", stiffness: 300 })}
                    >
                      <Avatar className="h-20 w-20 mx-auto mb-4">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <h3 className="text-lg font-semibold leading-none tracking-tight">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="p-6 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                    <div className="flex justify-center space-x-2">
                      <motion.div whileHover={safeAnimate({ scale: 1.2 })} whileTap={safeAnimate({ scale: 0.9 })}>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={safeAnimate({ scale: 1.2 })} whileTap={safeAnimate({ scale: 0.9 })}>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Timeline */}
      <section className="py-24 sm:py-32 bg-muted/50">
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
              Our Global Journey
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-muted-foreground"
              variants={itemVariants}
            >
              From vision to worldwide impact, see how we're building the global future
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {timelineData.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-center space-x-8"
                variants={itemVariants}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg relative"
                    whileHover={safeAnimate({ scale: 1.1 })}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {item.year}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={safeAnimate({ scale: 1.5, opacity: 0 })}
                      transition={safeTransition({ 
                        duration: 2, 
                        repeat: 999999,
                        delay: index * 0.5
                      })}
                    />
                  </motion.div>
                </div>
                <motion.div 
                  className="rounded-lg border bg-card text-card-foreground shadow-sm flex-1"
                                  whileHover={safeAnimate({ x: 10, scale: 1.02 })}
                transition={safeTransition({ type: "spring", stiffness: 300 })}
                >
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold leading-none tracking-tight">{item.title}</h3>
                      <Badge variant="secondary">{item.milestone}</Badge>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={safeAnimate({
              backgroundPosition: ["0% 0%", "100% 100%"],
            })}
            transition={safeTransition({
              duration: 20,
              repeat: 999999,
              repeatType: "reverse",
              ease: "linear"
            })}
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "50px 50px"
            }}
          />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.blockquote 
              className="text-2xl font-medium text-white italic max-w-4xl mx-auto mb-8"
              variants={itemVariants}
            >
              "We are the bridge, the spark, the rhythm of change — Global minds and local hearts, building the future in shared language across all continents."
            </motion.blockquote>
            
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <motion.button
                className="inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
                whileHover={safeAnimate({ scale: 1.05 })}
                whileTap={safeAnimate({ scale: 0.95 })}
                onClick={() => onPageChange('home')}
              >
                <Earth className="mr-2 h-5 w-5" />
                Join Our Global Mission
              </motion.button>
              
              <motion.button
                className="inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium border border-white/20 text-white hover:bg-white/10 transition-colors"
                whileHover={safeAnimate({ scale: 1.05 })}
                whileTap={safeAnimate({ scale: 0.95 })}
                onClick={() => onPageChange('contact')}
              >
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
