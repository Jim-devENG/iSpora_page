import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Section } from './layout/Section';
import { PageHeader } from './layout/PageHeader';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { AnimatedBlob } from './animations/FloatingElements';
import { AnimatedDots } from './animations/AnimatedBackground';
import { 
  Search,
  HelpCircle,
  MessageCircle,
  Mail,
  BookOpen,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { cn } from './ui/utils';

interface HelpCenterPageProps {
  onPageChange: (page: string) => void;
}

export function HelpCenterPage({ onPageChange }: HelpCenterPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'account', label: 'Account & Profile', icon: <HelpCircle className="h-5 w-5" /> },
    { id: 'mentorship', label: 'Mentorship', icon: <MessageCircle className="h-5 w-5" /> },
    { id: 'community', label: 'Community', icon: <MessageCircle className="h-5 w-5" /> }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I join iSpora?',
      answer: 'You can join iSpora by visiting our Join page and selecting either "Local Community" or "Diaspora Network" based on your location. Fill out the registration form and you\'ll receive a confirmation email.'
    },
    {
      category: 'getting-started',
      question: 'What is the difference between Local Community and Diaspora Network?',
      answer: 'Local Community is for youth and professionals based in the Global South. Diaspora Network is for professionals of African descent living outside the continent who want to give back through mentorship and collaboration.'
    },
    {
      category: 'account',
      question: 'How do I update my profile?',
      answer: 'Once logged into the platform, navigate to your profile settings where you can update your information, skills, interests, and availability for mentorship.'
    },
    {
      category: 'mentorship',
      question: 'How does the mentorship matching work?',
      answer: 'Our platform uses AI-powered matching to connect mentors and mentees based on shared interests, goals, and compatibility. You can also browse and request specific mentors.'
    },
    {
      category: 'mentorship',
      question: 'What is expected of a mentor?',
      answer: 'Mentors are expected to commit to regular check-ins with their mentees, provide guidance and support, share knowledge and experiences, and help mentees achieve their goals.'
    },
    {
      category: 'community',
      question: 'How can I participate in community events?',
      answer: 'Visit our Webinars & Programs page to see upcoming events. You can register for webinars, workshops, and other community activities directly from the event page.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            title="Help Center"
            description="Find answers to common questions and get support"
          />
        </div>
      </Section>

      {/* Search */}
      <Section 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 100% 96%) 50%, hsl(220 100% 98%) 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className={cn(
                  "p-6 rounded-lg border-2 transition-all text-left",
                  selectedCategory === category.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
                whileHover={safeAnimate({ scale: 1.02 })}
                whileTap={safeAnimate({ scale: 0.98 })}
              >
                <div className="mb-3 text-primary">{category.icon}</div>
                <div className="font-semibold">{category.label}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: safeTransition({ delay: index * 0.1 })
                  }
                }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No results found. Try a different search term.</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Still need help?</CardTitle>
              <CardDescription>Our support team is here to assist you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" onClick={() => onPageChange('contact')}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
                <Button onClick={() => onPageChange('community')}>
                  Join Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}

