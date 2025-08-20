import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { 
  GraduationCap, 
  Briefcase, 
  Microscope, 
  Heart, 
  Palette, 
  Users, 
  Church, 
  Globe,
  ArrowRight,
  MessageCircle,
  ExternalLink,
  Star,
  Target,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

interface ImpactAreasPageProps {
  onPageChange: (page: string) => void;
}

export function ImpactAreasPage({ onPageChange }: ImpactAreasPageProps) {
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

  const impactAreas = [
    {
      id: 'education',
      title: 'Education & Career Development',
      description: 'Mentorship, skills development, and learning opportunities for global professionals.',
      icon: <GraduationCap className="h-8 w-8" />,
      color: 'from-primary to-secondary',
      features: ['Professional Mentorship', 'Skills Training', 'Learning Resources', 'Career Guidance'],
      examples: ['Online courses', 'Mentorship programs', 'Skill workshops', 'Career counseling']
    },
    {
      id: 'business',
      title: 'Business & Entrepreneurship',
      description: 'Startup support, market access, and funding opportunities for entrepreneurs.',
      icon: <Briefcase className="h-8 w-8" />,
      color: 'from-green-500 to-emerald-500',
      features: ['Startup Support', 'Market Access', 'Funding Opportunities', 'Business Mentorship'],
      examples: ['Business incubators', 'Market research', 'Investment networks', 'Business planning']
    },
    {
      id: 'technology',
      title: 'Science, Technology & Innovation',
      description: 'Research collaborations, tech transfer, and innovation partnerships.',
      icon: <Microscope className="h-8 w-8" />,
      color: 'from-purple-500 to-violet-500',
      features: ['Research Collaboration', 'Tech Transfer', 'Innovation Labs', 'Scientific Partnerships'],
      examples: ['Joint research projects', 'Technology sharing', 'Innovation hubs', 'Scientific conferences']
    },
    {
      id: 'health',
      title: 'Health & Wellness',
      description: 'Health education, telehealth collaborations, and community health projects.',
      icon: <Heart className="h-8 w-8" />,
      color: 'from-red-500 to-pink-500',
      features: ['Health Education', 'Telehealth Services', 'Community Health', 'Wellness Programs'],
      examples: ['Health workshops', 'Remote consultations', 'Community clinics', 'Wellness initiatives']
    },
    {
      id: 'arts',
      title: 'Arts, Culture & Creative Industries',
      description: 'Cultural preservation, creative collaborations, and artistic development.',
      icon: <Palette className="h-8 w-8" />,
      color: 'from-orange-500 to-amber-500',
      features: ['Cultural Preservation', 'Creative Collaborations', 'Artistic Development', 'Cultural Exchange'],
      examples: ['Art exhibitions', 'Cultural festivals', 'Creative workshops', 'Cultural preservation']
    },
    {
      id: 'social',
      title: 'Social Impact & Volunteering',
      description: 'NGOs, youth empowerment, and humanitarian projects for positive change.',
      icon: <Users className="h-8 w-8" />,
      color: 'from-teal-500 to-cyan-500',
      features: ['Youth Empowerment', 'Humanitarian Projects', 'Community Development', 'Volunteer Programs'],
      examples: ['Youth programs', 'Community projects', 'Volunteer networks', 'Social initiatives']
    },
    {
      id: 'faith',
      title: 'Faith & Values-Based Impact',
      description: 'Faith-inspired community development and values-based initiatives.',
      icon: <Church className="h-8 w-8" />,
      color: 'from-primary to-secondary',
      features: ['Faith-Based Programs', 'Values Education', 'Community Building', 'Spiritual Development'],
      examples: ['Faith communities', 'Values workshops', 'Community building', 'Spiritual guidance']
    },
    {
      id: 'diaspora',
      title: 'Diaspora & Migration',
      description: 'Remittances for projects, knowledge return, and cultural connections.',
      icon: <Globe className="h-8 w-8" />,
      color: 'from-yellow-500 to-orange-500',
      features: ['Knowledge Transfer', 'Cultural Connections', 'Remittance Projects', 'Diaspora Networks'],
      examples: ['Knowledge sharing', 'Cultural exchange', 'Investment projects', 'Diaspora networks']
    }
  ];

  const communityLinks = [
    {
      name: 'Telegram Community',
      description: 'Join our global Telegram community for real-time discussions and updates',
      icon: <MessageCircle className="h-6 w-6" />,
      link: '#',
      color: 'from-primary to-secondary'
    },
    {
      name: 'WhatsApp Groups',
      description: 'Connect with diaspora professionals in our WhatsApp communities',
      icon: <MessageCircle className="h-6 w-6" />,
      link: '#',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,51,204,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(144,164,231,0.1),transparent)]" />
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl"
          animate={safeAnimate({
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          })}
          transition={safeTransition({
            duration: 6,
            repeat: 999999,
            ease: "easeInOut"
          })}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-xl"
          animate={safeAnimate({
            y: [0, 15, 0],
            x: [0, -8, 0],
            scale: [1, 0.9, 1],
          })}
          transition={safeTransition({
            duration: 8,
            repeat: 999999,
            ease: "easeInOut",
            delay: 2
          })}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl"
          animate={safeAnimate({
            y: [0, -10, 0],
            scale: [1, 1.2, 1],
          })}
          transition={safeTransition({
            duration: 7,
            repeat: 999999,
            ease: "easeInOut",
            delay: 1
          })}
        />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.div 
                className="inline-flex items-center rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-primary mb-6"
                animate={safeAnimate({
                  y: [0, -5, 0],
                  scale: [1, 1.02, 1],
                })}
                transition={safeTransition({
                  duration: 3,
                  repeat: 999999,
                  ease: "easeInOut"
                })}
              >
                <Target className="h-4 w-4 mr-2" />
                Global Impact Areas
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 relative"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent relative z-10">
                Areas of Global Impact
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl -z-10"
                animate={safeAnimate({
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1],
                })}
                transition={safeTransition({
                  duration: 4,
                  repeat: 999999,
                  ease: "easeInOut"
                })}
              />
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
              variants={itemVariants}
            >
              Discover the eight key areas where iSpora creates meaningful impact and drives positive change worldwide.
            </motion.p>
            
            {/* Impact Areas Preview */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              {impactAreas.slice(0, 4).map((area, index) => (
                <motion.div
                  key={area.id}
                  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50"
                  whileHover={safeAnimate({ scale: 1.05, y: -2 })}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${area.color}`} />
                  <span className="text-sm font-medium text-foreground">{area.title.split(' ')[0]}</span>
                </motion.div>
              ))}
              <motion.div
                className="flex items-center space-x-2 px-3 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50"
                whileHover={safeAnimate({ scale: 1.05, y: -2 })}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                <span className="text-sm font-medium text-foreground">+4 More</span>
              </motion.div>
            </motion.div>
            
            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={safeAnimate({ y: [0, 10, 0] })}
              transition={safeTransition({
                duration: 2,
                repeat: 999999,
                ease: "easeInOut"
              })}
            >
              <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
                <motion.div 
                  className="w-1 h-3 bg-primary rounded-full mt-2"
                  animate={safeAnimate({ y: [0, 12, 0] })}
                  transition={safeTransition({
                    duration: 2,
                    repeat: 999999,
                    ease: "easeInOut"
                  })}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact Areas Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {impactAreas.map((area, index) => (
              <motion.div key={area.id} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div 
                        className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${area.color} text-white`}
                        whileHover={safeAnimate({ scale: 1.1, rotate: 5 })}
                        transition={safeTransition({ type: "spring", stiffness: 300 })}
                      >
                        {area.icon}
                      </motion.div>
                      <Badge variant="secondary" className="text-xs">
                        Impact Area
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold mb-2">{area.title}</CardTitle>
                    <CardDescription className="text-base">{area.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {area.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <Star className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Examples:</h4>
                      <div className="flex flex-wrap gap-1">
                        {area.examples.map((example, exampleIndex) => (
                          <Badge key={exampleIndex} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <motion.button
                      className="w-full mt-4 inline-flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      whileHover={safeAnimate({ scale: 1.02 })}
                      whileTap={safeAnimate({ scale: 0.98 })}
                      onClick={() => onPageChange('contact')}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Our Communities */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              variants={itemVariants}
            >
              Join Our Global Communities
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Connect with diaspora professionals worldwide and be part of meaningful change across all impact areas.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {communityLinks.map((community, index) => (
              <motion.div key={community.name} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${community.color} text-white`}
                        whileHover={safeAnimate({ scale: 1.1, rotate: 5 })}
                      >
                        {community.icon}
                      </motion.div>
                      <div>
                        <CardTitle className="text-xl">{community.name}</CardTitle>
                        <CardDescription>{community.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <motion.button
                      className="w-full inline-flex items-center justify-center h-11 px-6 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      whileHover={safeAnimate({ scale: 1.02 })}
                      whileTap={safeAnimate({ scale: 0.98 })}
                      onClick={() => window.open(community.link, '_blank')}
                    >
                      Join Community
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </motion.button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Badge className="mb-6 bg-gradient-to-r from-primary to-secondary text-white">
                <Lightbulb className="h-4 w-4 mr-2" />
                Ready to Make Impact?
              </Badge>
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              variants={itemVariants}
            >
              Start Your Global Impact Journey
            </motion.h2>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              variants={itemVariants}
            >
              Whether you want to contribute your expertise or seek opportunities, we're here to connect you with meaningful projects worldwide.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <motion.button
                className="inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                whileHover={safeAnimate({ scale: 1.05 })}
                whileTap={safeAnimate({ scale: 0.95 })}
                onClick={() => onPageChange('contact')}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Get Started Today
              </motion.button>
              
              <motion.button
                className="inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                whileHover={safeAnimate({ scale: 1.05 })}
                whileTap={safeAnimate({ scale: 0.95 })}
                onClick={() => onPageChange('services')}
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
