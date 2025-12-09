import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Section } from './layout/Section';
import { PageHeader } from './layout/PageHeader';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { cn } from './ui/utils';
import { FloatingShapes, AnimatedBlob } from './animations/FloatingElements';
import { AnimatedDots, AnimatedGrid } from './animations/AnimatedBackground';
import { 
  GraduationCap,
  Building,
  Network,
  Users,
  Target,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ServicesPageProps {
  onPageChange: (page: string) => void;
}

export function ServicesPage({ onPageChange }: ServicesPageProps) {
  const services = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'Seminars, Training & Development',
      description: 'Capacity-building programmes for youths, organizations and communities',
      image: '/conference.jpg',
      outcomes: [
        'Enhanced skills and competencies for youth and professionals',
        'Strengthened organizational capacity and effectiveness',
        'Improved community development capabilities',
        'Sustainable knowledge transfer and learning ecosystems'
      ]
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: 'Government & Policy Stakeholders Advisory',
      description: 'Strategic Advisory for Institutions working on development-focused initiatives',
      image: '/academy.jpg',
      outcomes: [
        'Evidence-based policy recommendations',
        'Strategic planning and program design support',
        'Institutional capacity strengthening',
        'Effective implementation frameworks'
      ]
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: 'National Growth and Development Partnership',
      description: 'Collaboration with national and regional bodies to accelerate transformation',
      image: '/Collaboration.jpg',
      outcomes: [
        'Coordinated development initiatives across sectors',
        'Leveraged diaspora expertise for national priorities',
        'Scalable impact through strategic partnerships',
        'Sustainable transformation pathways'
      ]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Leadership & Collaboration for Diaspora-led Initiatives',
      description: 'Connecting diaspora-led movements with local organizations for shared impact',
      image: '/communinty.jpg',
      outcomes: [
        'Bridged diaspora-local collaboration gaps',
        'Amplified impact through coordinated efforts',
        'Strengthened community-led development',
        'Sustainable cross-border partnerships'
      ]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Impact Partnership Support',
      description: 'We help impact initiatives amplify reach, visibility and measurable impact',
      image: '/Career.jpg',
      outcomes: [
        'Increased visibility and recognition for initiatives',
        'Expanded reach to target communities',
        'Measurable impact tracking and reporting',
        'Enhanced sustainability and growth potential'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <Section 
        className="relative overflow-hidden pt-24 pb-12 sm:pt-32"
        style={{
          background: 'linear-gradient(135deg, hsl(220 100% 95%) 0%, hsl(220 100% 92%) 50%, hsl(220 67% 94%) 100%)'
        }}
      >
        <AnimatedBlob className="top-0 right-0 bg-primary/15" delay={0} size="w-96 h-96" />
        <AnimatedDots />
        
        <div className="relative z-10">
          <PageHeader
            title="Our Services"
            description="iSpora offers strategic services designed to accelerate development impact across the Global South through diaspora collaboration, capacity building, and institutional partnerships."
          />
        </div>
      </Section>

      {/* Services Grid */}
      <Section 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 100% 94%) 50%, hsl(220 100% 96%) 100%)'
        }}
      >
        <AnimatedGrid />
        <div className="relative z-10 space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: safeTransition({ delay: index * 0.1, duration: 0.6 })
                }
              }}
            >
              <motion.div
                whileHover={safeAnimate({ y: -5, scale: 1.01 })}
                transition={safeTransition({ type: 'spring', stiffness: 300 })}
              >
                <Card className={cn(
                  "overflow-hidden hover:shadow-xl transition-all duration-300 border-2 relative",
                  index % 2 === 1
                    ? "bg-primary text-primary-foreground border-primary shadow-lg"
                    : "border-primary/20 hover:border-primary/40 bg-card"
                )}>
                  {index % 2 === 1 && (
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full -mr-20 -mt-20 z-0" />
                  )}
                  <div className="grid md:grid-cols-2 gap-0 relative z-10">
                    {/* Image Side */}
                    <motion.div 
                      className="relative h-64 md:h-full min-h-[300px] overflow-hidden"
                      whileHover={safeAnimate({ scale: 1.05 })}
                      transition={safeTransition({ duration: 0.3 })}
                    >
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={cn(
                        "absolute inset-0",
                        index % 2 === 1
                          ? "bg-gradient-to-br from-primary/40 via-primary/20 to-primary/30"
                          : "bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"
                      )} />
                    </motion.div>

                  {/* Content Side */}
                  <div className={cn(
                    "p-8 flex flex-col justify-center",
                    index % 2 === 1 && "text-white"
                  )}>
                    <div className="flex items-center space-x-3 mb-4">
                      <motion.div 
                        className={cn(
                          "flex h-14 w-14 items-center justify-center rounded-xl",
                          index % 2 === 1
                            ? "bg-white/20 text-white backdrop-blur-sm"
                            : "bg-primary/10 text-primary"
                        )}
                        whileHover={safeAnimate({ scale: 1.1, rotate: 5 })}
                        transition={safeTransition({ type: "spring", stiffness: 400 })}
                      >
                        {service.icon}
                      </motion.div>
                      <CardTitle className={cn(
                        "text-2xl font-bold",
                        index % 2 === 1 && "text-white"
                      )}>
                        {service.title}
                      </CardTitle>
                    </div>
                    
                    <CardDescription className={cn(
                      "text-base mb-6 leading-relaxed",
                      index % 2 === 1 && "text-white/90"
                    )}>
                      {service.description}
                    </CardDescription>

                    <div className="space-y-3 mb-6">
                      <h4 className={cn(
                        "font-semibold text-sm uppercase tracking-wide",
                        index % 2 === 1 ? "text-white/80" : "text-muted-foreground"
                      )}>
                        Outcomes
                      </h4>
                      <ul className="space-y-2">
                        {service.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className={cn(
                              "h-5 w-5 flex-shrink-0 mt-0.5",
                              index % 2 === 1 ? "text-white/80" : "text-primary"
                            )} />
                            <span className={cn(
                              "text-sm leading-relaxed",
                              index % 2 === 1 ? "text-white/90" : "text-muted-foreground"
                            )}>
                              {outcome}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant={index % 2 === 1 ? "secondary" : "outline"}
                      onClick={() => onPageChange('partners')}
                      className={cn(
                        "w-full sm:w-auto",
                        index % 2 === 1 && "bg-white text-primary hover:bg-white/90"
                      )}
                    >
                      Talk to the Team
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, hsl(220 67% 91%) 0%, hsl(220 100% 90%) 50%, hsl(220 67% 92%) 100%)'
        }}
      >
        <FloatingShapes />
        <AnimatedDots />
        
        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center"
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Partner with iSpora?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Whether you're a government agency, NGO, academic institution, or impact organization, 
            we're here to help you achieve your development goals through strategic collaboration.
          </p>
          <Button
            size="lg"
            onClick={() => onPageChange('partners')}
            className="h-12 px-8"
          >
            Submit Partnership Interest
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </Section>
    </div>
  );
}
