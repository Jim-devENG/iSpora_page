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
  Download,
  FileText,
  Image as ImageIcon,
  Video,
  Mail,
  Globe
} from 'lucide-react';

interface PressKitPageProps {
  onPageChange: (page: string) => void;
}

export function PressKitPage({ onPageChange }: PressKitPageProps) {
  const resources = [
    {
      title: 'Brand Guidelines',
      description: 'Logo usage, color palette, and brand identity guidelines',
      icon: <FileText className="h-6 w-6" />,
      download: '#'
    },
    {
      title: 'Logo Pack',
      description: 'High-resolution logos in various formats',
      icon: <ImageIcon className="h-6 w-6" />,
      download: '#'
    },
    {
      title: 'Press Release Template',
      description: 'Template for writing about iSpora',
      icon: <FileText className="h-6 w-6" />,
      download: '#'
    },
    {
      title: 'Product Screenshots',
      description: 'High-quality screenshots of the platform',
      icon: <ImageIcon className="h-6 w-6" />,
      download: '#'
    },
    {
      title: 'Video Assets',
      description: 'Promotional videos and b-roll footage',
      icon: <Video className="h-6 w-6" />,
      download: '#'
    },
    {
      title: 'Fact Sheet',
      description: 'Key facts and statistics about iSpora',
      icon: <FileText className="h-6 w-6" />,
      download: '#'
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
            title="Press Kit"
            description="Resources for media, partners, and content creators"
          />
        </div>
      </Section>

      {/* About Section */}
      <Section 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 100% 96%) 50%, hsl(220 100% 98%) 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>About iSpora</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                iSpora is a Global Impact Engine for the Global South, connecting diaspora professionals with youth in their home countries to create meaningful, lasting impact through mentorship, collaboration, and shared projects.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform facilitates connections, enables knowledge transfer, and supports initiatives that drive positive change across Africa and the Global South.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Resources */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Press Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
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
                <Card className="h-full hover:shadow-lg transition-shadow border-primary/20">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {resource.icon}
                      </div>
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => window.open(resource.download, '_blank')}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Media Inquiries</CardTitle>
              <CardDescription>Get in touch with our press team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:press@ispora.com" className="text-primary hover:underline">
                    press@ispora.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <a href="https://ispora.com" className="text-primary hover:underline">
                    ispora.com
                  </a>
                </div>
                <Button onClick={() => onPageChange('contact')} className="mt-4">
                  Contact Press Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}

