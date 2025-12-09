import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Rocket, 
  Heart, 
  Globe, 
  Trophy, 
  Users, 
  Target,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Lightbulb,
  MapPin,
  Star,
  Play,
  Calendar,
  Award
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DiasporansPageProps {
  onPageChange: (page: string) => void;
}

export function DiasporansPage({ onPageChange }: DiasporansPageProps) {
  const benefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Make Meaningful Impact',
      description: 'Create lasting change in your home communities while sharing your expertise and experience.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Mentor the Next Generation',
      description: 'Guide ambitious youth and help them develop skills that will transform their futures.'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Bridge Two Worlds',
      description: 'Connect your global experience with local needs to create solutions that truly work.'
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: 'Build Your Legacy',
      description: 'Leave a lasting impact that extends far beyond your professional achievements.'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Create Your Profile',
      description: 'Share your expertise, skills, and passion for creating impact back home.',
      icon: <Users className="h-8 w-8" />
    },
    {
      step: '02',
      title: 'Launch a Project',
      description: 'Use our Project Engine to design initiatives that match your goals and expertise.',
      icon: <Rocket className="h-8 w-8" />
    },
    {
      step: '03',
      title: 'Connect with Youth',
      description: 'Our platform matches you with motivated youth who are eager to learn and contribute.',
      icon: <Target className="h-8 w-8" />
    },
    {
      step: '04',
      title: 'Create Impact Together',
      description: 'Collaborate in our digital workroom and watch your vision become reality.',
      icon: <Heart className="h-8 w-8" />
    }
  ];

  const successStories = [
    {
      name: 'Sarah Chen',
      role: 'Senior Software Engineer at Google',
      project: 'Tech Skills Bootcamp Lagos',
      impact: '50 youth trained in web development',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b192?w=150&h=150&fit=crop&crop=face',
      projectImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop',
      quote: 'Seeing these young developers build their first applications was more rewarding than any promotion I\'ve ever received.',
      location: 'From San Francisco to Lagos',
      duration: '12 weeks',
      participants: 50
    },
    {
      name: 'Dr. James Osei',
      role: 'Agricultural Scientist',
      project: 'Sustainable Agriculture Initiative',
      impact: 'Modern farming techniques for 100+ farmers',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      projectImage: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1dedc?w=400&h=200&fit=crop',
      quote: 'This platform allowed me to share 20 years of research in a way that directly helps farming communities.',
      location: 'From Canada to Ghana',
      duration: '16 weeks',
      participants: 100
    },
    {
      name: 'Lisa Wanjiku',
      role: 'Marketing Director at Shopify',
      project: 'Digital Marketing Academy',
      impact: '75 entrepreneurs equipped with digital skills',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      projectImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      quote: 'Every youth who completed the program has either started their own business or landed a marketing role.',
      location: 'From Toronto to Nairobi',
      duration: '8 weeks',
      participants: 75
    }
  ];

  const mentorshipOpportunities = [
    {
      title: 'One-on-One Mentorship',
      description: 'Personal guidance sessions with individual youth',
      time: '2-4 hours/month',
      impact: 'Deep personal development',
      icon: <Heart className="h-6 w-6" />
    },
    {
      title: 'Group Workshops',
      description: 'Lead skill-building sessions for multiple participants',
      time: '4-6 hours/month',
      impact: 'Broader skill transfer',
      icon: <Users className="h-6 w-6" />
    },
    {
      title: 'Project Advisory',
      description: 'Strategic guidance for ongoing youth projects',
      time: '1-2 hours/week',
      impact: 'Project success acceleration',
      icon: <Target className="h-6 w-6" />
    },
    {
      title: 'Career Coaching',
      description: 'Professional development and career path guidance',
      time: '2-3 hours/month',
      impact: 'Career trajectory change',
      icon: <Award className="h-6 w-6" />
    }
  ];

  const stats = [
    { number: '300+', label: 'Diaspora Mentors', icon: <Users className="h-6 w-6" /> },
    { number: '500+', label: 'Projects Launched', icon: <Rocket className="h-6 w-6" /> },
    { number: '15+', label: 'Countries Active', icon: <Globe className="h-6 w-6" /> },
    { number: '95%', label: 'Project Success Rate', icon: <Trophy className="h-6 w-6" /> }
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
                For African Diaspora Leaders
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Your Expertise Can
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Transform Lives</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                You've built expertise and success in your field. Now use that knowledge to create lasting impact back home. Launch projects, mentor youth, and be the bridge between global opportunity and local talent.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => onPageChange('projects')} className="text-lg px-8 py-3">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start a Project
                </Button>
                <Button size="lg" variant="outline" onClick={() => onPageChange('mentorship')} className="text-lg px-8 py-3">
                  <Heart className="mr-2 h-5 w-5" />
                  Become a Mentor
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>$5/month only</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>30-day money back</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>300+ mentors active</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=500&fit=crop"
                  alt="Diaspora professionals collaborating"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Impact Starts Here</span>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 bg-secondary p-3 rounded-xl shadow-lg text-white">
                <div className="text-center">
                  <div className="text-lg font-bold">500+</div>
                  <div className="text-xs">Projects Live</div>
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

      {/* Why Your Matter Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Your Experience Matters</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              You carry unique perspectives and skills that can transform communities. Here's how you can make an impact.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How to Launch Your Project</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Four simple steps to start creating impact with youth back home
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Diaspora Spotlight</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real stories from diaspora leaders who are making a difference
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video relative group">
                  <ImageWithFallback
                    src={story.projectImage}
                    alt={story.project}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      <Play className="h-6 w-6 ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-900">{story.participants} participants</Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={story.image} alt={story.name} />
                      <AvatarFallback>{story.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{story.name}</CardTitle>
                      <CardDescription>{story.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="secondary">{story.location}</Badge>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{story.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2 text-primary">{story.project}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{story.impact}</p>
                  <blockquote className="text-sm italic border-l-4 border-primary pl-4 text-muted-foreground">
                    "{story.quote}"
                  </blockquote>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship Opportunities */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Mentorship Opportunities</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose how you want to share your knowledge and make an impact
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentorshipOpportunities.map((opportunity, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white mb-4">
                    {opportunity.icon}
                  </div>
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  <CardDescription>{opportunity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium text-primary">Time Commitment:</span>
                      <br />
                      {opportunity.time}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-secondary">Expected Impact:</span>
                      <br />
                      {opportunity.impact}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Diaspora Leaders Say</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Hear from professionals who are making a real difference
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-lg my-6">
                  "iSpora gave me a structured way to share my tech expertise with youth in Nigeria. The platform's tools made it easy to manage the project and track progress. Seeing 50 young developers graduate and find jobs was incredibly fulfilling."
                </blockquote>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b192?w=50&h=50&fit=crop&crop=face" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-sm text-muted-foreground">Software Engineer, Google</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-lg my-6">
                  "The mentorship matching system connected me with ambitious youth who reminded me why I fell in love with agriculture. Through this platform, I've helped establish 3 sustainable farms and trained over 100 farmers."
                </blockquote>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" />
                    <AvatarFallback>JO</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Dr. James Osei</p>
                    <p className="text-sm text-muted-foreground">Agricultural Scientist</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-primary to-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Transform Lives?
          </h2>
          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
            Your expertise is needed. Your experience matters. Start your impact project today and be part of the solution.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" onClick={() => onPageChange('projects')}>
              <Rocket className="mr-2 h-5 w-5" />
              Launch Your First Project
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" onClick={() => onPageChange('mentorship')}>
              <Heart className="mr-2 h-5 w-5" />
              Start Mentoring
            </Button>
          </div>
          <div className="mt-8 text-white/80 text-sm">
            Join for just $5/month • Cancel anytime • 30-day money-back guarantee
          </div>
        </div>
      </section>
    </div>
  );
}
