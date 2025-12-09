import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Section } from './layout/Section';
import { PageHeader } from './layout/PageHeader';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { AnimatedBlob } from './animations/FloatingElements';
import { AnimatedDots } from './animations/AnimatedBackground';
import { 
  Users,
  Heart,
  Shield,
  MessageCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface CommunityGuidelinesPageProps {
  onPageChange: (page: string) => void;
}

export function CommunityGuidelinesPage({ onPageChange }: CommunityGuidelinesPageProps) {
  const principles = [
    {
      title: 'Respect and Dignity',
      description: 'Treat all community members with respect, regardless of background, beliefs, or perspectives.',
      icon: <Heart className="h-6 w-6" />
    },
    {
      title: 'Inclusive Environment',
      description: 'Foster an inclusive space where everyone feels welcome and valued.',
      icon: <Users className="h-6 w-6" />
    },
    {
      title: 'Constructive Communication',
      description: 'Engage in meaningful, constructive dialogue that builds understanding and collaboration.',
      icon: <MessageCircle className="h-6 w-6" />
    },
    {
      title: 'Safety and Security',
      description: 'Maintain a safe environment free from harassment, discrimination, or harmful behavior.',
      icon: <Shield className="h-6 w-6" />
    }
  ];

  const doList = [
    'Be respectful and kind to all community members',
    'Share knowledge and experiences constructively',
    'Support and encourage others in their journey',
    'Provide honest, helpful feedback',
    'Respect privacy and confidentiality',
    'Celebrate diversity and different perspectives',
    'Report inappropriate behavior when you see it'
  ];

  const dontList = [
    'Harass, bully, or discriminate against others',
    'Share false or misleading information',
    'Spam or promote unrelated content',
    'Violate others\' privacy or confidentiality',
    'Engage in hate speech or discriminatory language',
    'Impersonate others or create fake accounts',
    'Use the platform for illegal activities'
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
            title="Community Guidelines"
            description="Our shared values and expectations for building a positive, impactful community"
          />
        </div>
      </Section>

      {/* Principles */}
      <Section 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 100% 96%) 50%, hsl(220 100% 98%) 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Principles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
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
                        {principle.icon}
                      </div>
                      <CardTitle className="text-xl">{principle.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{principle.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Do's */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: safeTransition({ delay: 0.2 })
                }
              }}
            >
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <CardTitle className="text-2xl">Do's</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {doList.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Don'ts */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: safeTransition({ delay: 0.3 })
                }
              }}
            >
              <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    <CardTitle className="text-2xl">Don'ts</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {dontList.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Enforcement */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Enforcement</CardTitle>
              <CardDescription>How we maintain a safe community</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Violations of these guidelines may result in warnings, temporary restrictions, or permanent removal from the platform, depending on the severity of the violation. We are committed to maintaining a safe, respectful, and productive environment for all members.
              </p>
              <p className="text-muted-foreground">
                If you witness or experience behavior that violates these guidelines, please report it immediately through our support channels or by contacting our community team.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}

