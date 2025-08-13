import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { 
  Heart, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Lightbulb,
  Award,
  Target,
  Globe,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Network,
  Building,
  Rocket,
  GraduationCap,
  Briefcase,
  Earth
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { safeAnimate, safeTransition } from './utils/animationUtils';

interface ServicesPageProps {
  onPageChange: (page: string) => void;
}

export function ServicesPage({ onPageChange }: ServicesPageProps) {
  const services = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Mentorship & Coaching',
      description: 'Connecting experienced diaspora professionals worldwide with ambitious talent globally for personalized guidance and career development.',
      image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=600&h=400&fit=crop',
      features: [
        'One-on-one global mentorship sessions',
        'Cross-border career guidance and planning',
        'International skill development workshops',
        'Worldwide professional network building'
      ],
      impact: 'Empowering the next generation of global leaders'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Academic & Research Projects',
      description: 'Supporting educational initiatives and research collaborations that advance knowledge and create practical solutions across multiple continents.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      features: [
        'International research project collaboration',
        'Global academic exchange programs',
        'Cross-cultural educational resource development',
        'Worldwide knowledge transfer initiatives'
      ],
      impact: 'Advancing education and research globally'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Career & Entrepreneurship',
      description: 'Fostering entrepreneurial spirit and providing resources for career advancement and business development across global markets.',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
      features: [
        'Global startup incubation support',
        'International business plan development',
        'Cross-border investment readiness training',
        'Worldwide market access facilitation'
      ],
      impact: 'Building sustainable businesses across continents'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community Impact Projects',
      description: 'Implementing projects that create lasting positive change in communities worldwide through collaborative efforts spanning multiple countries.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      features: [
        'Global community needs assessment',
        'International sustainable development projects',
        'Cross-border capacity building',
        'Worldwide impact measurement and reporting'
      ],
      impact: 'Creating sustainable change in communities globally'
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Collaboration & Innovation',
      description: 'Facilitating innovative partnerships and cross-border collaborations to solve complex global challenges through diverse perspectives.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      features: [
        'Global innovation workshops',
        'International cross-border partnerships',
        'Worldwide technology transfer programs',
        'Multi-cultural creative problem-solving sessions'
      ],
      impact: 'Driving innovation through global collaboration'
    }
  ];

  const approach = [
    {
      step: '01',
      title: 'Global Connect',
      description: 'We bring together diaspora professionals worldwide and local talent based on shared interests and complementary skills across all continents.',
      icon: <Network className="h-6 w-6" />
    },
    {
      step: '02',
      title: 'Cross-Border Collaborate',
      description: 'Our structured approach ensures meaningful collaboration that maximizes impact and creates lasting relationships spanning multiple countries.',
      icon: <Users className="h-6 w-6" />
    },
    {
      step: '03',
      title: 'Create Global Impact',
      description: 'Together, we implement projects that create measurable change and sustainable development in communities worldwide.',
      icon: <Rocket className="h-6 w-6" />
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(30,58,138,0.1),transparent)] pointer-events-none" />
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
                className="inline-flex items-center rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-primary mb-6"
                animate={floatingAnimation}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Global Services
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-6xl"
              variants={itemVariants}
            >
              Transforming the World Through
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Global Collaborative Impact</span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-xl leading-8 text-muted-foreground max-w-4xl mx-auto"
              variants={itemVariants}
            >
              We connect diaspora professionals worldwide with local talent globally to create meaningful projects that drive sustainable development and positive change across all continents.
            </motion.p>
            
            <motion.div 
              className="mt-10"
              variants={itemVariants}
            >
              <motion.button 
                className="inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                whileHover={safeAnimate({ scale: 1.05 })}
                whileTap={safeAnimate({ scale: 0.95 })}
                onClick={() => onPageChange('contact')}
              >
                <Earth className="mr-2 h-5 w-5" />
                Partner With Us Globally
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
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
              Our Global Core Services
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Five key areas where we create lasting impact through worldwide diaspora collaboration
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="space-y-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                variants={itemVariants}
              >
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary text-white"
                      whileHover={safeAnimate({ scale: 1.1, rotate: 5 })}
                    >
                      {service.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                      <Badge variant="outline" className="mt-2 text-primary border-primary/20">
                        {service.impact}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center space-x-3"
                          whileHover={safeAnimate({ x: 5 })}
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <motion.button 
                    className="inline-flex items-center justify-center h-11 px-6 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium transition-colors"
                    whileHover={safeAnimate({ scale: 1.05 })}
                    whileTap={safeAnimate({ scale: 0.95 })}
                    onClick={() => onPageChange('contact')}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <motion.div 
                    className="relative group"
                    whileHover={safeAnimate({ scale: 1.02 })}
                    transition={safeTransition({ type: "spring", stiffness: 300, damping: 20 })}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl transform scale-105" />
                    <div className="relative overflow-hidden rounded-3xl border border-border/50 shadow-xl">
                      <div className="aspect-video relative">
                        <ImageWithFallback
                          src={service.image}
                          alt={`${service.title} service illustration`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
                        
                        {/* Service badge */}
                        <div className="absolute top-4 left-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                            <div className="flex items-center space-x-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary text-white">
                                {service.icon}
                              </div>
                              <span className="text-sm font-medium text-gray-900">{service.title}</span>
                            </div>
                          </div>
                        </div>

                        {/* Global impact indicator */}
                        <div className="absolute bottom-4 right-4">
                          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                            <div className="flex items-center space-x-2">
                              <Earth className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium text-gray-900">Global Impact</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Approach */}
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
              Our Global Approach
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              A simple yet effective methodology that ensures meaningful collaboration and sustainable impact across all borders
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {approach.map((step, index) => (
              <motion.div 
                key={index}
                className="relative"
                variants={itemVariants}
              >
                <motion.div 
                  className="rounded-lg border bg-card text-card-foreground shadow-sm text-center h-full p-8"
                  whileHover={safeAnimate({ y: -5, scale: 1.02 })}
                  transition={safeTransition({ type: "spring", stiffness: 300 })}
                >
                  <div className="relative">
                    <motion.div 
                      className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {step.step}
                    </motion.div>
                    
                    <motion.div 
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white mb-6"
                      whileHover={safeAnimate({ scale: 1.1, rotate: 10 })}
                    >
                      {step.icon}
                    </motion.div>
                    
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
                
                {index < approach.length - 1 && (
                  <motion.div 
                    className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
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
            <motion.h2 
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              variants={itemVariants}
            >
              Ready to Create Global Impact Together?
            </motion.h2>
            
            <motion.p 
              className="mt-6 text-xl text-white/90 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Whether you're a diaspora professional anywhere in the world looking to give back or a local organization seeking global partnerships, we're here to help you create meaningful change across all continents.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
                              <motion.button 
                  className="inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
                  whileHover={safeAnimate({ scale: 1.05 })}
                  whileTap={safeAnimate({ scale: 0.95 })}
                  onClick={() => onPageChange('contact')}
                >
                <Users className="mr-2 h-5 w-5" />
                Get Started Today
              </motion.button>
              
              <motion.button 
                className="inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium border border-white/20 text-white hover:bg-white/10 transition-colors"
                whileHover={safeAnimate({ scale: 1.05 })}
                whileTap={safeAnimate({ scale: 0.95 })}
                onClick={() => onPageChange('about')}
              >
                Learn Our Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
