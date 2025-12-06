import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { Section } from './layout/Section';
import { PageHeader } from './layout/PageHeader';
import { 
  Smartphone,
  Globe,
  Users,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';

interface AppPageProps {
  onPageChange: (page: string) => void;
}

export function AppPage({ onPageChange }: AppPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section 
        className="pt-24 pb-12 sm:pt-32"
        style={{
          background: 'linear-gradient(135deg, hsl(220 67% 94%) 0%, hsl(220 100% 92%) 50%, hsl(220 100% 95%) 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: safeTransition({ staggerChildren: 0.1, delayChildren: 0.2 })
              }
            }}
          >
            <motion.div variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: safeTransition({ duration: 0.6 }) }
            }}>
              <Badge variant="secondary" className="mb-4">
                <Sparkles className="h-3 w-3 mr-2" />
                Coming Soon
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: safeTransition({ delay: 0.1, duration: 0.6 }) }
              }}
            >
              iSpora App
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-muted-foreground mb-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: safeTransition({ delay: 0.2, duration: 0.6 }) }
              }}
            >
              The Global Impact Engine
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: safeTransition({ delay: 0.3, duration: 0.6 }) }
              }}
            >
              <Button
                size="lg"
                className="h-12 px-8 text-base font-medium"
                onClick={() => onPageChange('community')}
              >
                Be first to know — Join our Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Coming Soon Message */}
      <Section 
        className="relative"
        style={{
          background: 'linear-gradient(180deg, hsl(220 67% 94%) 0%, hsl(0 0% 100%) 50%, hsl(220 100% 95%) 100%)'
        }}
      >
        <motion.div
          className="max-w-3xl mx-auto text-center"
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
          <Card className="border-2 border-primary/10 hover:border-primary/30">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Smartphone className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">The Digital Platform for Global Impact</CardTitle>
              <CardDescription className="text-base">
                The iSpora app will be the digital space where youth, diaspora, and partners come together to create lasting change.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Prior to the iSpora digital app launch, we are building a formidable community of local youths and diasporans who share our vision and believe in the massive opportunities that iSpora would open up to both the diaspora and home-based youths of the global south.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => onPageChange('community')}
                >
                  Join the Local Community
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onPageChange('community')}
                >
                  Join the Diaspora Network
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>
    </div>
  );
}

