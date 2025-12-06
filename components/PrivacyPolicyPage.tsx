import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Section } from './layout/Section';
import { PageHeader } from './layout/PageHeader';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { AnimatedBlob } from './animations/FloatingElements';
import { AnimatedDots } from './animations/AnimatedBackground';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onPageChange: (page: string) => void;
}

export function PrivacyPolicyPage({ onPageChange }: PrivacyPolicyPageProps) {
  const sections = [
    {
      title: 'Information We Collect',
      icon: <FileText className="h-6 w-6" />,
      content: [
        'Personal information (name, email, location)',
        'Profile information (skills, interests, goals)',
        'Communication data (messages, posts, interactions)',
        'Usage data (how you interact with the platform)',
        'Device information (browser type, IP address)'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: <Eye className="h-6 w-6" />,
      content: [
        'To provide and improve our services',
        'To match mentors and mentees',
        'To facilitate connections and collaborations',
        'To send important updates and notifications',
        'To analyze platform usage and improve user experience',
        'To ensure platform security and prevent fraud'
      ]
    },
    {
      title: 'Data Protection',
      icon: <Lock className="h-6 w-6" />,
      content: [
        'We use industry-standard encryption to protect your data',
        'Access to personal information is restricted to authorized personnel',
        'We regularly update our security measures',
        'We do not sell your personal information to third parties',
        'Your data is stored securely and retained only as long as necessary'
      ]
    },
    {
      title: 'Your Rights',
      icon: <Shield className="h-6 w-6" />,
      content: [
        'Access your personal data',
        'Correct inaccurate information',
        'Request deletion of your data',
        'Opt-out of certain communications',
        'Export your data in a portable format'
      ]
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
            title="Privacy Policy"
            description="How we collect, use, and protect your personal information"
            subtitle="Last updated: January 2024"
          />
        </div>
      </Section>

      {/* Content */}
      <Section 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 100% 96%) 50%, hsl(220 100% 98%) 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-muted-foreground text-lg leading-relaxed">
              At iSpora, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
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
                <Card className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {section.icon}
                      </div>
                      <CardTitle className="text-2xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Questions About Privacy?</CardTitle>
              <CardDescription>We're here to help</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy or our data practices, please contact us at{' '}
                <a href="mailto:privacy@ispora.com" className="text-primary hover:underline">
                  privacy@ispora.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}

