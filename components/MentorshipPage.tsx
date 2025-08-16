import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { 
  Heart, 
  Users, 
  Calendar, 
  Clock,
  Target,
  Award,
  BookOpen,
  MessageCircle,
  Video,
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
  Sparkles,
  Globe,
  Network,
  Play
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MentorshipPageProps {
  onPageChange: (page: string) => void;
}

const MotionCard = motion(Card);

export function MentorshipPage({ onPageChange }: MentorshipPageProps) {
  const mentorshipTypes = [
    {
      title: 'One-on-One Mentorship',
      description: 'Personal guidance sessions with individual youth',
      time: '2-4 hours/month',
      participants: '1 mentee',
      icon: <Heart className="h-6 w-6" />,
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop'
    },
    {
      title: 'Group Mentorship',
      description: 'Lead group sessions and skill-building workshops',
      time: '4-6 hours/month',
      participants: '5-10 mentees',
      icon: <Users className="h-6 w-6" />,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop'
    },
    {
      title: 'Project Advisory',
      description: 'Strategic guidance for ongoing youth projects',
      time: '2-3 hours/week',
      participants: '3-5 project teams',
      icon: <Target className="h-6 w-6" />,
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop'
    },
    {
      title: 'Career Coaching',
      description: 'Professional development and career path guidance',
      time: '2-3 hours/month',
      participants: '1-3 mentees',
      icon: <Award className="h-6 w-6" />,
      image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=400&h=250&fit=crop'
    }
  ];

  const mentorProfiles = [
    {
      name: 'Sarah Chen',
      role: 'Senior Software Engineer at Google',
      specialization: 'Technology & Engineering',
      experience: '8+ years',
      mentees: 15,
      rating: 4.9,
      location: 'San Francisco → Lagos',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b192?w=150&h=150&fit=crop&crop=face',
      quote: 'Seeing young developers build their first applications brings me more joy than any promotion.',
      skills: ['JavaScript', 'React', 'System Design', 'Career Growth']
    },
    {
      name: 'Dr. James Osei',
      role: 'Agricultural Scientist',
      specialization: 'Agriculture & Sustainability',
      experience: '12+ years',
      mentees: 25,
      rating: 4.8,
      location: 'Toronto → Accra',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: 'Every young farmer I mentor becomes a catalyst for feeding their community.',
      skills: ['Sustainable Farming', 'AgTech', 'Research', 'Leadership']
    },
    {
      name: 'Lisa Wanjiku',
      role: 'Marketing Director at Shopify',
      specialization: 'Business & Marketing',
      experience: '10+ years',
      mentees: 30,
      rating: 4.9,
      location: 'Toronto → Nairobi',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      quote: 'Marketing is about telling stories that matter. I help youth find their voice.',
      skills: ['Digital Marketing', 'Brand Strategy', 'E-commerce', 'Leadership']
    }
  ];

  const mentorshipProcess = [
    {
      step: '01',
      title: 'Profile Setup',
      description: 'Complete your mentor profile with expertise and availability',
      icon: <Users className="h-8 w-8" />
    },
    {
      step: '02',
      title: 'Smart Matching',
      description: 'Our AI matches you with youth based on skills and interests',
      icon: <Zap className="h-8 w-8" />
    },
    {
      step: '03',
      title: 'Schedule Sessions',
      description: 'Book convenient times for video calls and workshops',
      icon: <Calendar className="h-8 w-8" />
    },
    {
      step: '04',
      title: 'Track Progress',
      description: 'Monitor mentee growth and celebrate achievements together',
      icon: <Award className="h-8 w-8" />
    }
  ];

  const tools = [
    {
      name: 'Video Conferencing',
      description: 'Built-in video calls with recording capabilities',
      icon: <Video className="h-6 w-6" />
    },
    {
      name: 'Progress Tracking',
      description: 'Monitor mentee goals and skill development',
      icon: <Target className="h-6 w-6" />
    },
    {
      name: 'Resource Library',
      description: 'Share documents, links, and learning materials',
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      name: 'Messaging System',
      description: 'Stay connected between sessions',
      icon: <MessageCircle className="h-6 w-6" />
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
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
                className="inline-flex items-center rounded-full border border-accent/20 px-4 py-2 text-sm font-medium text-accent mb-6"
                animate={floatingAnimation}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Mentorship Hub
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Shape the Future
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Through Mentorship</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Connect with ambitious youth across Africa and share your knowledge, experience, and guidance. Every session you conduct creates ripples of positive change.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <motion.button 
                  className="inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  whileHover={safeAnimate({ scale: 1.05 })}
                  whileTap={safeAnimate({ scale: 0.95 })}
                  onClick={() => onPageChange('diasporans')}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Become a Mentor
                </motion.button>
                <motion.button 
                  className="inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                  whileHover={safeAnimate({ scale: 1.05 })}
                  whileTap={safeAnimate({ scale: 0.95 })}
                  onClick={() => onPageChange('projects')}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Browse Projects
                </motion.button>
              </div>
            </motion.div>

            {/* Animated Mentorship Connection Visual */}
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <div className="relative h-96 w-full bg-gradient-to-br from-muted/50 to-muted/80 rounded-3xl overflow-hidden border border-border/50">
                {/* Mentor Avatars */}
                <motion.div
                  className="absolute top-16 left-16"
                  initial={safeAnimate({ scale: 0, opacity: 0 })}
                  animate={safeAnimate({ scale: 1, opacity: 1 })}
                  transition={safeTransition({ delay: 0.5, type: "spring", stiffness: 200 })}
                >
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-4 border-primary shadow-lg">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b192?w=150&h=150&fit=crop&crop=face" />
                      <AvatarFallback className="bg-primary text-white">SC</AvatarFallback>
                    </Avatar>
                    <motion.div
                      className="absolute -bottom-2 -right-2 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"
                      animate={safeAnimate({ scale: [1, 1.2, 1] })}
                      transition={safeTransition({ duration: 2, repeat: 999999 })}
                    >
                      <Video className="h-3 w-3 text-white" />
                    </motion.div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary whitespace-nowrap">
                      Mentor
                    </div>
                  </div>
                </motion.div>

                {/* Mentee Avatars */}
                {[
                  { top: 16, right: 16, delay: 0.7, name: "YM1" },
                  { bottom: 16, left: 16, delay: 0.9, name: "YM2" },
                  { bottom: 16, right: 16, delay: 1.1, name: "YM3" }
                ].map((mentee, index) => (
                  <motion.div
                    key={index}
                    className="absolute"
                    style={mentee}
                    initial={safeAnimate({ scale: 0, opacity: 0 })}
                    animate={safeAnimate({ scale: 1, opacity: 1 })}
                    transition={safeTransition({ delay: mentee.delay, type: "spring", stiffness: 200 })}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-4 border-secondary shadow-lg">
                        <AvatarFallback className="bg-secondary text-white">{mentee.name}</AvatarFallback>
                      </Avatar>
                      <motion.div
                        className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full border border-white"
                        animate={safeAnimate({ opacity: [0, 1, 0] })}
                        transition={safeTransition({ duration: 1.5, repeat: 999999, delay: index * 0.5 })}
                      />
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-secondary whitespace-nowrap">
                        Mentee
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                             <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.6 }} />
                      <stop offset="100%" style={{ stopColor: 'rgb(14, 165, 233)', stopOpacity: 0.6 }} />
                    </linearGradient>
                  </defs>
                  
                  <motion.path
                    d="M 80 80 Q 200 150 320 80"
                    stroke="url(#connectionGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    initial={safeAnimate({ pathLength: 0 })}
                    animate={safeAnimate({ pathLength: 1 })}
                    transition={safeTransition({ delay: 1.5, duration: 2, ease: "easeInOut" })}
                  />
                  <motion.path
                    d="M 80 80 Q 150 250 80 320"
                    stroke="url(#connectionGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    initial={safeAnimate({ pathLength: 0 })}
                    animate={safeAnimate({ pathLength: 1 })}
                    transition={safeTransition({ delay: 1.7, duration: 2, ease: "easeInOut" })}
                  />
                  <motion.path
                    d="M 80 80 Q 250 250 320 320"
                    stroke="url(#connectionGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    initial={safeAnimate({ pathLength: 0 })}
                    animate={safeAnimate({ pathLength: 1 })}
                    transition={safeTransition({ delay: 1.9, duration: 2, ease: "easeInOut" })}
                  />
                </svg>

                {/* Central Hub */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center text-white relative">
                    <motion.div
                      animate={safeAnimate({ rotate: [0, 360] })}
                      transition={safeTransition({ duration: 15, repeat: 999999, ease: "linear" })}
                    >
                      <Network className="h-6 w-6" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                  animate={floatingAnimation}
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">95% Success Rate</span>
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
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Live Session</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mentorship Types */}
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
              Choose Your Mentorship Style
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-muted-foreground"
              variants={itemVariants}
            >
              Find the mentorship approach that fits your schedule and expertise
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {mentorshipTypes.map((type, index) => (
              <motion.div key={index} variants={itemVariants}>
                <MotionCard 
                  className="overflow-hidden h-full"
                  whileHover={safeAnimate({ y: -5, scale: 1.02 })}
                  transition={safeTransition({ type: "spring", stiffness: 300 })}
                >
                  <div className="aspect-video relative group">
                    <ImageWithFallback
                      src={type.image}
                      alt={type.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <motion.div 
                        className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
                        whileHover={safeAnimate({ scale: 1.1, rotate: 5 })}
                      >
                        {type.icon}
                      </motion.div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Time Commitment:</span>
                        <Badge variant="secondary">{type.time}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Participants:</span>
                        <Badge variant="outline">{type.participants}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Mentor Profiles */}
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
              Meet Our Mentors
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-muted-foreground"
              variants={itemVariants}
            >
              Experienced professionals making a difference through mentorship
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {mentorProfiles.map((mentor, index) => (
              <motion.div key={index} variants={itemVariants}>
                <MotionCard 
                  className="overflow-hidden h-full"
                  whileHover={safeAnimate({ y: -5, scale: 1.02 })}
                  transition={safeTransition({ type: "spring", stiffness: 300 })}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <motion.div
                        whileHover={safeAnimate({ scale: 1.1, rotate: 5 })}
                        transition={safeTransition({ type: "spring", stiffness: 300 })}
                      >
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={mentor.image} alt={mentor.name} />
                          <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div>
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription>{mentor.role}</CardDescription>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + i * 0.05 }}
                              >
                                <Star className="h-4 w-4 fill-accent text-accent" />
                              </motion.div>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{mentor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-primary">Specialization</p>
                          <p className="text-muted-foreground">{mentor.specialization}</p>
                        </div>
                        <div>
                          <p className="font-medium text-secondary">Experience</p>
                          <p className="text-muted-foreground">{mentor.experience}</p>
                        </div>
                        <div>
                          <p className="font-medium text-green-600">Mentees</p>
                          <p className="text-muted-foreground">{mentor.mentees} guided</p>
                        </div>
                        <div>
                          <p className="font-medium text-purple-600">Location</p>
                          <p className="text-muted-foreground">{mentor.location}</p>
                        </div>
                      </div>
                      <blockquote className="text-sm italic border-l-4 border-primary pl-4 text-muted-foreground">
                        "{mentor.quote}"
                      </blockquote>
                      <div>
                        <p className="font-medium text-sm mb-2">Key Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {mentor.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skillIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: skillIndex * 0.1 }}
                            >
                              <Badge variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
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
              How Mentorship Works
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-muted-foreground"
              variants={itemVariants}
            >
              A simple process designed to maximize impact for both mentors and mentees
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {mentorshipProcess.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative"
                variants={itemVariants}
              >
                <MotionCard 
                  className="text-center h-full"
                  whileHover={safeAnimate({ y: -5, scale: 1.02 })}
                  transition={safeTransition({ type: "spring", stiffness: 300 })}
                >
                  <CardHeader>
                    <motion.div 
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white mb-4"
                      whileHover={safeAnimate({ scale: 1.1, rotate: 10 })}
                    >
                      {step.icon}
                    </motion.div>
                    <motion.div 
                      className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {step.step}
                    </motion.div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </MotionCard>
                {index < mentorshipProcess.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2"
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

      {/* Tools & Features */}
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
              Mentorship Tools
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-muted-foreground"
              variants={itemVariants}
            >
              Everything you need to provide effective mentorship
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {tools.map((tool, index) => (
              <motion.div key={index} variants={itemVariants}>
                <MotionCard 
                  className="text-center h-full"
                  whileHover={safeAnimate({ y: -5, scale: 1.02 })}
                  transition={safeTransition({ type: "spring", stiffness: 300 })}
                >
                  <CardHeader>
                    <motion.div 
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white"
                      whileHover={safeAnimate({ scale: 1.1, rotate: 5 })}
                    >
                      {tool.icon}
                    </motion.div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </MotionCard>
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
              Ready to Make a Difference?
            </motion.h2>
            <motion.p 
              className="mt-6 text-lg text-white/90 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Join hundreds of mentors who are already transforming lives through the power of shared knowledge and guidance.
            </motion.p>
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <motion.button 
                className="inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
                whileHover={safeAnimate({ scale: 1.05 })}
                whileTap={safeAnimate({ scale: 0.95 })}
                onClick={() => onPageChange('diasporans')}
              >
                <Heart className="mr-2 h-5 w-5" />
                Start Mentoring Today
              </motion.button>
              <motion.button 
                className="inline-flex items-center justify-center h-12 px-8 py-4 rounded-full text-lg font-medium border border-white/20 text-white hover:bg-white/10 transition-colors"
                whileHover={safeAnimate({ scale: 1.05 })}
                whileTap={safeAnimate({ scale: 0.95 })}
                onClick={() => onPageChange('projects')}
              >
                <Users className="mr-2 h-5 w-5" />
                View Projects
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
