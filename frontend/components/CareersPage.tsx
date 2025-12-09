import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Section } from './layout/Section';
import { PageHeader } from './layout/PageHeader';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { AnimatedBlob } from './animations/FloatingElements';
import { AnimatedDots } from './animations/AnimatedBackground';
import { 
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Users,
  Rocket
} from 'lucide-react';

interface CareersPageProps {
  onPageChange: (page: string) => void;
}

export function CareersPage({ onPageChange }: CareersPageProps) {
  const openPositions = [
    {
      title: 'Senior Full-Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build and scale the iSpora platform to connect diaspora professionals with youth globally.'
    },
    {
      title: 'Community Manager',
      department: 'Community',
      location: 'Remote / Hybrid',
      type: 'Full-time',
      description: 'Foster engagement and growth within our global community of mentors and mentees.'
    },
    {
      title: 'Partnership Development Lead',
      department: 'Partnerships',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build strategic partnerships with organizations and institutions across the Global South.'
    }
  ];

  const benefits = [
    {
      title: 'Remote First',
      description: 'Work from anywhere in the world',
      icon: <MapPin className="h-6 w-6" />
    },
    {
      title: 'Impact Driven',
      description: 'Make a real difference in communities',
      icon: <Heart className="h-6 w-6" />
    },
    {
      title: 'Collaborative Culture',
      description: 'Work with passionate, mission-driven team',
      icon: <Users className="h-6 w-6" />
    },
    {
      title: 'Growth Opportunities',
      description: 'Continuous learning and development',
      icon: <Rocket className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <Section 
        className="relative overflow-hidden pt-24 pb-12 sm:pt-32"
        style={{
          background: 'linear-gradient(135deg, hsl(220 100% 96%) 0%, hsl(220 100% 92%) 50%, hsl(220 100% 95%) 100%)'
        }}
      >
        <AnimatedBlob className="top-0 right-0 bg-primary/15" delay={0} size="w-96 h-96" />
        <AnimatedDots />
        
        <div className="relative z-10">
          <PageHeader
            title="Careers"
            description="Join us in building bridges and creating lasting impact"
          />
        </div>
      </Section>

      {/* Why Join Section */}
      <Section 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 100% 96%) 50%, hsl(220 100% 98%) 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Join iSpora?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: safeTransition({ delay: index * 0.1 })
                  }
                }}
              >
                <Card className="h-full border-primary/20 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {benefit.icon}
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: safeTransition({ delay: index * 0.1 })
                  }
                }}
              >
                <Card className="hover:shadow-lg transition-shadow border-primary/20">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline">{position.department}</Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {position.location}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {position.type}
                          </Badge>
                        </div>
                        <CardDescription className="text-base mt-2">
                          {position.description}
                        </CardDescription>
                      </div>
                      <Button className="sm:mt-0">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-primary/5 border-primary/20 text-center">
            <CardHeader>
              <CardTitle>Don't See a Role That Fits?</CardTitle>
              <CardDescription>We're always looking for talented individuals to join our mission</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => onPageChange('contact')}>
                Send Us Your Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}

