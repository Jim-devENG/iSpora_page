import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Building, 
  Users, 
  Globe, 
  Target,
  CheckCircle,
  BarChart3,
  Zap,
  Shield,
  Settings,
  Headphones,
  ArrowRight,
  Award,
  BookOpen,
  Rocket
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PartnersPageProps {
  onPageChange: (page: string) => void;
}

export function PartnersPage({ onPageChange }: PartnersPageProps) {
  const partnerTypes = [
    {
      title: 'NGOs & Nonprofits',
      description: 'Scale your youth development programs with diaspora expertise',
      icon: <Building className="h-8 w-8" />,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      benefits: ['Expand program reach', 'Access skilled mentors', 'Track impact metrics', 'Reduce operational costs']
    },
    {
      title: 'Universities & Schools',
      description: 'Connect students with industry professionals for career guidance',
      icon: <BookOpen className="h-8 w-8" />,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop',
      benefits: ['Industry connections', 'Career counseling', 'Internship opportunities', 'Alumni engagement']
    },
    {
      title: 'Government Agencies',
      description: 'Leverage diaspora talent for national development initiatives',
      icon: <Globe className="h-8 w-8" />,
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400&h=250&fit=crop',
      benefits: ['Policy implementation', 'Capacity building', 'Knowledge transfer', 'Economic development']
    },
    {
      title: 'Corporate Partners',
      description: 'Integrate impact initiatives into your CSR programs',
      icon: <Target className="h-8 w-8" />,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
      benefits: ['CSR alignment', 'Employee engagement', 'Brand building', 'Talent pipeline']
    }
  ];

  const features = [
    {
      icon: <Settings className="h-6 w-6" />,
      title: 'White-Label Integration',
      description: 'Customize the platform with your branding and integrate with existing systems'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Bulk User Management',
      description: 'Efficiently manage large numbers of participants and mentors'
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Advanced Analytics',
      description: 'Comprehensive reporting and impact measurement tools'
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: 'Dedicated Support',
      description: 'Priority technical support and account management'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with advanced security features'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'API Access',
      description: 'Full API access for custom integrations and data export'
    }
  ];

  const successStories = [
    {
      organization: 'African Youth Foundation',
      type: 'NGO',
      impact: '500+ youth trained across 8 countries',
      duration: '18 months',
      logo: 'AYF',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop',
      quote: 'iSpora helped us scale our mentorship program 10x while maintaining quality and personal connections.',
      results: ['500+ youth trained', '95% completion rate', '78% job placement', '8 countries reached']
    },
    {
      organization: 'University of Cape Town',
      type: 'University',
      impact: 'Enhanced career services for 1,200+ students',
      duration: '12 months',
      logo: 'UCT',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop',
      quote: 'Our students now have direct access to industry professionals who understand their career aspirations.',
      results: ['1,200+ students served', '300+ mentors engaged', '85% satisfaction rate', '60% internship rate']
    },
    {
      organization: 'Kenya Ministry of Education',
      type: 'Government',
      impact: 'National digital skills initiative',
      duration: '24 months',
      logo: 'MOE',
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400&h=200&fit=crop',
      quote: 'This partnership enabled us to deliver world-class tech education to rural communities.',
      results: ['2,000+ youth reached', '15 counties covered', '50+ projects launched', '90% skills improvement']
    }
  ];

  const integrationProcess = [
    {
      step: '01',
      title: 'Discovery Call',
      description: 'We understand your needs and objectives',
      duration: '1 week'
    },
    {
      step: '02',
      title: 'Custom Setup',
      description: 'Platform configuration and branding',
      duration: '2-3 weeks'
    },
    {
      step: '03',
      title: 'Team Training',
      description: 'Train your team on platform features',
      duration: '1 week'
    },
    {
      step: '04',
      title: 'Launch & Support',
      description: 'Go live with ongoing support',
      duration: 'Ongoing'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
                For Organizations
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Scale Your Impact
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Together</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Partner with iSpora to integrate diaspora expertise into your youth development programs. Whether you're an NGO, university, or government agency, we help you create lasting impact at scale.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => onPageChange('contact')} className="text-lg px-8 py-3">
                  <Rocket className="mr-2 h-5 w-5" />
                  Schedule a Demo
                </Button>
                <Button size="lg" variant="outline" onClick={() => onPageChange('contact')} className="text-lg px-8 py-3">
                  <Users className="mr-2 h-5 w-5" />
                  Contact Team
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
                  alt="Organization team collaborating"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Who We Partner With</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Organizations across sectors leveraging diaspora talent for youth development
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerTypes.map((partner, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={partner.image}
                    alt={partner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      {partner.icon}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{partner.title}</CardTitle>
                  <CardDescription>{partner.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium text-sm">Key Benefits:</p>
                    <ul className="space-y-1">
                      {partner.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Enterprise Features</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to integrate and scale your youth development programs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Success Stories</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See how organizations are creating impact through our platform
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.organization}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{story.logo}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{story.organization}</CardTitle>
                        <CardDescription>{story.type}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">{story.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="font-medium text-primary">{story.impact}</p>
                    <blockquote className="text-sm italic border-l-4 border-primary pl-4 text-muted-foreground">
                      "{story.quote}"
                    </blockquote>
                    <div className="grid grid-cols-2 gap-2">
                      {story.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 inline mr-1" />
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Process */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How We Work Together</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A structured approach to ensure successful integration and maximum impact
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {integrationProcess.map((step, index) => (
              <div key={index} className="relative">
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg">
                      {step.step}
                    </div>
                    <CardTitle className="mt-4">{step.title}</CardTitle>
                    <Badge variant="outline" className="mt-2">{step.duration}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < integrationProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-primary to-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Transform Your Programs?
          </h2>
          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
            Join leading organizations who are already scaling their impact through strategic partnerships with diaspora talent.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" onClick={() => onPageChange('contact')}>
              <Rocket className="mr-2 h-5 w-5" />
              Schedule a Demo
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" onClick={() => onPageChange('contact')}>
              <Users className="mr-2 h-5 w-5" />
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
