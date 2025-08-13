import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  Target, 
  Heart, 
  Trophy, 
  Users, 
  BookOpen,
  Star,
  ArrowRight,
  CheckCircle,
  Award,
  Briefcase,
  GraduationCap,
  Zap,
  Play,
  Globe
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface YouthPageProps {
  onPageChange: (page: string) => void;
}

export function YouthPage({ onPageChange }: YouthPageProps) {
  const benefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'World-Class Mentorship',
      description: 'Learn directly from successful diaspora professionals who want to see you succeed.'
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: 'Real Project Experience',
      description: 'Gain hands-on experience working on meaningful projects that create actual impact.'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Skill Development',
      description: 'Build technical and professional skills that employers and universities value.'
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'Career Opportunities',
      description: 'Access job opportunities, internships, and recommendations from your mentors.'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Create Your Profile',
      description: 'Tell us about your interests, goals, and what you want to learn.',
      icon: <Users className="h-8 w-8" />
    },
    {
      step: '02',
      title: 'Browse Projects',
      description: 'Discover exciting projects that match your interests and career goals.',
      icon: <Target className="h-8 w-8" />
    },
    {
      step: '03',
      title: 'Apply & Get Selected',
      description: 'Submit your application and get matched with projects and mentors.',
      icon: <CheckCircle className="h-8 w-8" />
    },
    {
      step: '04',
      title: 'Learn & Build',
      description: 'Work alongside mentors to build skills and create meaningful impact.',
      icon: <BookOpen className="h-8 w-8" />
    }
  ];

  const successStories = [
    {
      name: 'Fatima Mohammed',
      age: 19,
      location: 'Lagos, Nigeria',
      project: 'Tech Skills Bootcamp',
      mentor: 'Sarah Chen',
      achievement: 'Now studying Computer Science at University of Lagos',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b192?w=150&h=150&fit=crop&crop=face',
      quote: 'iSpora changed my life. I went from never coding to building my first app in 3 months.',
      skillsGained: ['JavaScript', 'React', 'Node.js', 'Problem Solving'],
      timeSpent: '12 weeks',
      badgesEarned: 8
    },
    {
      name: 'Kwame Asante',
      age: 22,
      location: 'Kumasi, Ghana',
      project: 'Sustainable Agriculture Initiative',
      mentor: 'Dr. James Osei',
      achievement: 'Started his own organic farming cooperative',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: 'Learning modern farming techniques helped me transform our family farm and employ 10 people.',
      skillsGained: ['Sustainable Farming', 'Business Planning', 'Leadership', 'Marketing'],
      timeSpent: '16 weeks',
      badgesEarned: 12
    },
    {
      name: 'Amina Hassan',
      age: 20,
      location: 'Nairobi, Kenya',
      project: 'Digital Marketing Academy',
      mentor: 'Lisa Wanjiku',
      achievement: 'Landed marketing role at a growing startup',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      quote: 'The digital marketing skills I learned helped me start my own agency while still in university.',
      skillsGained: ['Digital Marketing', 'Social Media', 'Analytics', 'Content Creation'],
      timeSpent: '8 weeks',
      badgesEarned: 15
    }
  ];

  const pointsAndBadges = [
    {
      category: 'Project Participation',
      points: 100,
      description: 'Complete your first project',
      badge: 'Achiever',
      color: 'bg-green-100 text-green-800'
    },
    {
      category: 'Skill Development',
      points: 50,
      description: 'Master a new skill',
      badge: 'Learner',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      category: 'Community Contribution',
      points: 75,
      description: 'Help other youth in the platform',
      badge: 'Helper',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      category: 'Leadership',
      points: 150,
      description: 'Lead a project initiative',
      badge: 'Leader',
      color: 'bg-yellow-100 text-yellow-800'
    }
  ];

  const benefits_detailed = [
    {
      title: 'Free Access',
      description: 'Complete access to all platform features at no cost',
      features: ['Project applications', 'Mentorship sessions', 'Skill resources', 'Community support']
    },
    {
      title: 'Real Experience',
      description: 'Work on actual projects that make a difference',
      features: ['Portfolio building', 'Reference letters', 'LinkedIn recommendations', 'Real-world skills']
    },
    {
      title: 'Global Network',
      description: 'Connect with successful professionals worldwide',
      features: ['Career guidance', 'Industry insights', 'Job opportunities', 'Lasting relationships']
    },
    {
      title: 'Recognition',
      description: 'Earn badges and certificates for your achievements',
      features: ['Skill certificates', 'Progress tracking', 'Achievement badges', 'Public profiles']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                ✨ 100% Free for Youth
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Your Future Starts
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Here</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Connect with successful diaspora professionals, join exciting projects, and build the skills you need for an amazing career. All completely free for youth.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => onPageChange('projects')} className="text-lg px-8 py-3">
                  <Target className="mr-2 h-5 w-5" />
                  Browse Projects
                </Button>
                <Button size="lg" variant="outline" onClick={() => onPageChange('mentorship')} className="text-lg px-8 py-3">
                  <Heart className="mr-2 h-5 w-5" />
                  Find a Mentor
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>100% Free Forever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No Hidden Costs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>1000+ Youth Active</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=500&fit=crop"
                  alt="Young people learning and collaborating"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Join Free Today</span>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 bg-primary p-3 rounded-xl shadow-lg text-white">
                <div className="text-center">
                  <div className="text-lg font-bold">1000+</div>
                  <div className="text-xs">Youth Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Overview */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Join iSpora?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Access world-class mentorship and real project experience that will accelerate your career.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white">
                    {benefit.icon}
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How to Get Started</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Four simple steps to start your journey with experienced mentors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white mb-4">
                      {step.icon}
                    </div>
                    <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg">
                      {step.step}
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Youth Success Stories</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See how other young people transformed their careers through iSpora
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={story.image} alt={story.name} />
                      <AvatarFallback>{story.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{story.name}, {story.age}</CardTitle>
                      <CardDescription>{story.location}</CardDescription>
                      <Badge variant="secondary" className="mt-1">{story.badgesEarned} badges earned</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-primary">Project:</p>
                        <p>{story.project}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-secondary">Mentor:</p>
                        <p>{story.mentor}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-green-600">Achievement:</p>
                      <p className="text-sm">{story.achievement}</p>
                    </div>
                    <blockquote className="text-sm italic border-l-4 border-primary pl-4 text-muted-foreground">
                      "{story.quote}"
                    </blockquote>
                    <div>
                      <p className="font-semibold text-sm mb-2">Skills Gained:</p>
                      <div className="flex flex-wrap gap-1">
                        {story.skillsGained.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Points and Badges System */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Earn Points & Badges</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get recognized for your achievements and unlock new opportunities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pointsAndBadges.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white mb-4">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-lg">{item.category}</CardTitle>
                  <div className="flex items-center justify-center space-x-2">
                    <Badge className={item.color}>{item.badge}</Badge>
                    <Badge variant="outline">{item.points} pts</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Benefits */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What You Get</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to accelerate your career and personal growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits_detailed.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {benefit.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Video Section */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Hear From Our Youth</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Watch real stories from youth who transformed their careers
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="aspect-video relative group cursor-pointer">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=450&fit=crop"
                  alt="Youth testimonial video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Play className="h-10 w-10 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <p className="font-medium text-gray-900">
                      "From Zero to Full-Stack Developer in 6 Months"
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Watch Fatima's incredible transformation story
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-primary to-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your Future is Waiting
          </h2>
          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
            Join thousands of ambitious youth who are building better futures through mentorship and real project experience.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" onClick={() => onPageChange('projects')}>
              <Target className="mr-2 h-5 w-5" />
              Start Your Journey Today
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" onClick={() => onPageChange('mentorship')}>
              <Heart className="mr-2 h-5 w-5" />
              Find Your Mentor
            </Button>
          </div>
          <div className="mt-8 text-white/80 text-sm">
            100% Free Forever • No Credit Card Required • Join in 2 Minutes
          </div>
        </div>
      </section>
    </div>
  );
}
