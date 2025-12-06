import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Section } from './layout/Section';
import { PageHeader } from './layout/PageHeader';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { AnimatedBlob } from './animations/FloatingElements';
import { AnimatedDots } from './animations/AnimatedBackground';
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

interface TermsOfServicePageProps {
  onPageChange: (page: string) => void;
}

export function TermsOfServicePage({ onPageChange }: TermsOfServicePageProps) {
  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: <CheckCircle className="h-6 w-6" />,
      content: 'By accessing and using the iSpora platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the platform.'
    },
    {
      title: 'User Accounts',
      icon: <FileText className="h-6 w-6" />,
      content: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.'
    },
    {
      title: 'User Conduct',
      icon: <AlertTriangle className="h-6 w-6" />,
      content: 'You agree to use the platform in a manner consistent with our Community Guidelines. You will not engage in any activity that disrupts or interferes with the platform, including but not limited to spamming, harassment, or posting inappropriate content.'
    },
    {
      title: 'Intellectual Property',
      icon: <Scale className="h-6 w-6" />,
      content: 'All content on the iSpora platform, including text, graphics, logos, and software, is the property of iSpora or its content suppliers and is protected by copyright and other intellectual property laws.'
    },
    {
      title: 'Limitation of Liability',
      icon: <Scale className="h-6 w-6" />,
      content: 'iSpora provides the platform "as is" without warranties of any kind. We are not liable for any damages arising from your use of the platform, including but not limited to direct, indirect, incidental, or consequential damages.'
    },
    {
      title: 'Termination',
      icon: <AlertTriangle className="h-6 w-6" />,
      content: 'We reserve the right to suspend or terminate your account at any time for violations of these Terms of Service or for any other reason we deem necessary to protect the platform and its users.'
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
            title="Terms of Service"
            description="The terms and conditions governing your use of the iSpora platform"
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
              Please read these Terms of Service carefully before using the iSpora platform. By using our platform, you agree to be bound by these terms.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
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
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Questions About Terms?</CardTitle>
              <CardDescription>Contact us for clarification</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@ispora.com" className="text-primary hover:underline">
                  legal@ispora.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}

