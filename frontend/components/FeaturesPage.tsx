import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Rocket, 
  Users, 
  Heart, 
  Trophy, 
  MessageCircle, 
  BarChart3,
  Target,
  Clock,
  Globe,
  Zap,
  Shield,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturesPageProps {
  onPageChange: (page: string) => void;
}

export function FeaturesPage({ onPageChange }: FeaturesPageProps) {
  const features = [
    {
      icon: <Rocket className="h-8 w-8" />,
      title: 'Project Launch Engine',
      description: 'Create and launch impact-driven projects with powerful tools designed for diaspora-youth collaboration.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
      details: [
        'Project templates for common impact areas',
        'Goal setting and milestone tracking',
        'Youth application and selection system',
        'Resource planning and budgeting tools',
        'Timeline management with automated reminders'
      ],
      benefits: ['Reduce project setup time by 75%', 'Higher success rates with structured approach', 'Easy youth recruitment']
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Collaborative Workroom',
      description: 'Digital workspace where diaspora leaders and youth work together seamlessly across time zones.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      details: [
        'Real-time document collaboration',
        'Video conferencing integration',
        'Task assignment and progress tracking',
        'File sharing and version control',
        'Time zone-aware scheduling'
      ],
      benefits: ['Break down geographical barriers', 'Increase productivity by 60%', 'Foster meaningful connections']
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Mentorship Portal',
      description: 'Structured mentorship system connecting experienced diaspora professionals with ambitious youth.',
      image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=600&h=400&fit=crop',
      details: [
        'Smart mentor-mentee matching',
        'Structured learning pathways',
        'Progress tracking and goal setting',
        'One-on-one and group sessions',
        'Feedback and evaluation system'
      ],
      benefits: ['Accelerate career development', 'Build lasting relationships', 'Transfer knowledge effectively']
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: 'Impact Credit System',
      description: 'Gamified recognition system that rewards meaningful contributions and unlocks new opportunities.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      details: [
        'Points for project participation',
        'Badges for skill development',
        'Reputation scores for quality work',
        'Leaderboards and competitions',
        'Unlock premium features and opportunities'
      ],
      benefits: ['Increase engagement by 80%', 'Motivate continuous learning', 'Recognize valuable contributions']
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: 'Real-time Impact Feed',
      description: 'Stay connected with project updates, community achievements, and inspiring success stories.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop',
      details: [
        'Project milestone celebrations',
        'Community achievements showcase',
        'Success story highlights',
        'Mentorship moments sharing',
        'Cross-project collaboration opportunities'
      ],
      benefits: ['Build community spirit', 'Inspire through shared success', 'Foster cross-project learning']
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Recognition Dashboard',
      description: 'Comprehensive analytics and reporting to measure impact, track progress, and showcase achievements.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      details: [
        'Individual progress tracking',
        'Project impact metrics',
        'Community growth analytics',
        'Exportable reports and certificates',
        'Portfolio building tools'
      ],
      benefits: ['Demonstrate tangible impact', 'Support career advancement', 'Attract funding and partnerships']
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Users', icon: <Users className="h-6 w-6" /> },
    { number: '500+', label: 'Projects Launched', icon: <Rocket className="h-6 w-6" /> },
    { number: '50+', label: 'Countries Reached', icon: <Globe className="h-6 w-6" /> },
    { number: '95%', label: 'Success Rate', icon: <Trophy className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
                Platform Features
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Powerful Features for
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Global Impact</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Every tool you need to build meaningful connections, launch impactful projects, and create lasting change across borders.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => onPageChange('diasporans')} className="text-lg px-8 py-3">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Building Today
                </Button>
                <Button size="lg" variant="outline" onClick={() => onPageChange('youth')} className="text-lg px-8 py-3">
                  <Target className="mr-2 h-5 w-5" />
                  Join as Youth
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
                  alt="Team collaboration and innovation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Collaboration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:gap-24">
            {features.map((feature, index) => (
              <div key={index} className={`grid grid-cols-1 gap-8 lg:grid-cols-2 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{feature.title}</h3>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground mb-8">{feature.description}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-accent" />
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {feature.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-secondary" />
                        Benefits
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <Badge key={benefitIndex} variant="secondary" className="text-sm">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video relative">
                      <ImageWithFallback
                        src={feature.image}
                        alt={`${feature.title} interface`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                          <Play className="h-8 w-8 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                          <p className="text-sm font-medium text-gray-900">
                            Interactive {feature.title} Demo
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose iSpora?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Compare our comprehensive platform with traditional approaches
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="relative">
              <div className="absolute -top-3 -left-3 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">×</span>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <Clock className="h-6 w-6 mr-2" />
                  Traditional Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Fragmented communication across multiple platforms
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Manual project management and tracking
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Limited mentorship matching capabilities
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Difficult to measure and report impact
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    High coordination overhead
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Limited scalability
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary relative">
              <div className="absolute -top-3 -left-3 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Zap className="h-6 w-6 mr-2" />
                  iSpora Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    All-in-one integrated collaboration platform
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Automated project management and workflows
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    AI-powered mentor-mentee matching
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Real-time impact tracking and analytics
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Streamlined processes and communication
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Built for global scale and growth
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Seamless Integrations</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Connect with the tools you already use and love
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              { name: 'Slack', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=120&fit=crop' },
              { name: 'Zoom', image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=120&h=120&fit=crop' },
              { name: 'Google Workspace', image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=120&fit=crop' },
              { name: 'Microsoft Teams', image: 'https://images.unsplash.com/photo-1633419461186-7d40cd14397f?w=120&h=120&fit=crop' },
              { name: 'Notion', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=120&fit=crop' },
              { name: 'Trello', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=120&fit=crop' }
            ].map((integration, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-3 rounded-lg overflow-hidden bg-muted group-hover:scale-110 transition-transform duration-200">
                  <ImageWithFallback
                    src={integration.image}
                    alt={integration.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {integration.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-primary to-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Experience These Features?
          </h2>
          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
            Join our community and be part of building the future of diaspora-youth collaboration.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" onClick={() => onPageChange('join')}>
              <Globe className="mr-2 h-5 w-5" />
              Join as Diaspora
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" onClick={() => onPageChange('join')}>
              <Target className="mr-2 h-5 w-5" />
              Join as Youth
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
