import React from 'react';
import { motion } from 'motion/react';
import { FloatingShapes, AnimatedBlob } from './animations/FloatingElements';
import { AnimatedDots, AnimatedGrid } from './animations/AnimatedBackground';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { Section } from './layout/Section';
import { PageHeader } from './layout/PageHeader';
import { 
  Users, 
  Globe, 
  GraduationCap,
  Briefcase,
  Heart,
  Target,
  ArrowRight,
  CheckCircle,
  Network,
  Lightbulb,
  Building,
  BookOpen
} from 'lucide-react';

interface CommunityPageProps {
  onPageChange: (page: string) => void;
}

export function CommunityPage({ onPageChange }: CommunityPageProps) {
  const localBenefits = [
    'Access to mentorship from diaspora professionals',
    'Opportunities for training and skill development',
    'Support for community initiatives and projects',
    'Peer circles and networking opportunities',
    'Pathways to career and educational advancement',
    'Connection to global opportunities and resources'
  ];

  const diasporaBenefits = [
    'Mentor youth and contribute expertise',
    'Co-create development initiatives',
    'Support sustainable development in the Global South',
    'Plug into policy and program opportunities',
    'Build meaningful connections with local communities',
    'Leverage global networks for impact'
  ];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <Section 
        className="relative overflow-hidden pt-24 pb-12 sm:pt-32"
        style={{
          background: 'linear-gradient(135deg, hsl(220 100% 94%) 0%, hsl(220 100% 92%) 50%, hsl(220 100% 95%) 100%)'
        }}
      >
        <AnimatedBlob className="top-0 right-0 bg-primary/15" delay={0} size="w-96 h-96" />
        <AnimatedDots />
        <FloatingShapes />
        
        <div className="relative z-10">
          <PageHeader
            title="One Community, Two Doors"
            description="Prior to the iSpora digital app launch, we are building a formidable community of local youths and diasporans who share our vision and believe in the massive opportunities that iSpora would open up to both the diaspora and home-based youths of the global south."
          />
        </div>
      </Section>

      {/* Two Main Sections */}
      <Section 
        className="relative"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 100% 94%) 50%, hsl(220 67% 92%) 100%)'
        }}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Local Community Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: safeTransition({ duration: 0.6 })
              }
            }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/40 bg-gradient-to-br from-primary/5 to-background">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/15 text-primary"
                    whileHover={safeAnimate({ scale: 1.1, rotate: 5 })}
                    transition={safeTransition({ type: "spring", stiffness: 400 })}
                  >
                    <Users className="h-8 w-8" />
                  </motion.div>
                  <Badge variant="secondary" className="text-sm font-medium">
                    Global South
                  </Badge>
                </div>
                <CardTitle className="text-2xl sm:text-3xl mb-2 font-bold">
                  Local Community
                </CardTitle>
                <CardDescription className="text-base">
                  For youth, students, and young professionals in the Global South
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Join a vibrant community of young changemakers who are building the future of the Global South. Access mentorship, opportunities, training, and support for your initiatives while connecting with peers who share your vision.
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    What You Get
                  </h4>
                  <ul className="space-y-2">
                    {localBenefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start space-x-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: safeTransition({ delay: index * 0.05 })
                          }
                        }}
                      >
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm leading-relaxed">
                          {benefit}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  whileHover={safeAnimate({ scale: 1.02 })}
                  whileTap={safeAnimate({ scale: 0.98 })}
                >
                  <Button
                    size="lg"
                    className="w-full h-12 text-base font-medium"
                    onClick={() => onPageChange('join')}
                  >
                    Join the Local Community
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Diaspora Network Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: safeTransition({ duration: 0.6, delay: 0.1 })
              }
            }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-primary/30 bg-primary text-primary-foreground relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full -mr-20 -mt-20" />
              
              <div className="relative z-10">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm"
                      whileHover={safeAnimate({ scale: 1.15, rotate: 360 })}
                      transition={safeTransition({ type: "spring", stiffness: 400 })}
                    >
                      <Globe className="h-8 w-8" />
                    </motion.div>
                    <Badge variant="secondary" className="text-sm font-medium bg-white/20 text-white border-white/30">
                      Global Network
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl mb-2 font-bold text-white">
                    Diaspora Network
                  </CardTitle>
                  <CardDescription className="text-base text-white/90">
                    For diaspora students and professionals abroad with roots in the Global South
                  </CardDescription>
                </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-white/90 leading-relaxed">
                  Connect your global expertise with local impact. Mentor youth, co-create initiatives, support development, and plug into policy and program opportunities that create meaningful change in the Global South.
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-white/80">
                    What You Can Do
                  </h4>
                  <ul className="space-y-2">
                    {diasporaBenefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start space-x-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: safeTransition({ delay: index * 0.05 })
                          }
                        }}
                      >
                        <CheckCircle className="h-5 w-5 text-white/80 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm leading-relaxed">
                          {benefit}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  whileHover={safeAnimate({ scale: 1.02 })}
                  whileTap={safeAnimate({ scale: 0.98 })}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full h-12 text-base font-medium bg-white text-primary hover:bg-white/90"
                    onClick={() => onPageChange('join')}
                  >
                    Join the Diaspora Network
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </CardContent>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* WhatsApp & Telegram Links */}
      <Section 
        className="relative"
        style={{
          background: 'linear-gradient(90deg, hsl(220 100% 93%) 0%, hsl(220 67% 89%) 50%, hsl(220 100% 92%) 100%)'
        }}
      >
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: safeTransition({ duration: 0.6 })
            }
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Join Our Community Channels
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/30 hover:bg-primary/5">
              <CardHeader>
                <CardTitle className="text-xl">Local Community</CardTitle>
                <CardDescription>Connect with youth and professionals in the Global South</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('https://chat.whatsapp.com/I9utNeip977H5k8oGW5KCy', '_blank')}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {/* Add Telegram link */}}
                >
                  Telegram
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/30 hover:bg-primary/5">
              <CardHeader>
                <CardTitle className="text-xl">Diaspora Network</CardTitle>
                <CardDescription>Connect with diaspora professionals worldwide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('https://chat.whatsapp.com/CVWXWSeSfuKFj5UFmj6ESL', '_blank')}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {/* Add Telegram link */}}
                >
                  Telegram
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}

