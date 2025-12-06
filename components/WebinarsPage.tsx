import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Section } from './layout/Section';
import { PageHeader } from './layout/PageHeader';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { FloatingShapes, AnimatedBlob } from './animations/FloatingElements';
import { AnimatedDots } from './animations/AnimatedBackground';
import { 
  Calendar, 
  Clock, 
  MapPin,
  Users,
  Video,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  PlayCircle
} from 'lucide-react';
import { cn } from './ui/utils';

interface WebinarsPageProps {
  onPageChange: (page: string) => void;
}

export function WebinarsPage({ onPageChange }: WebinarsPageProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Fallback data
  const fallbackUpcomingEvents = [
    {
      id: 1,
      title: 'Diaspora Engagement Strategies for Development',
      description: 'Learn how diaspora professionals can effectively contribute to development initiatives in the Global South.',
      date: '2024-02-15',
      time: '2:00 PM GMT',
      type: 'Webinar',
      speaker: 'Dr. Ama Mensah',
      speakerRole: 'Development Expert',
      image: '/conference.jpg',
      registrationLink: '#',
      attendees: 150
    },
    {
      id: 2,
      title: 'Youth Leadership in Tech Innovation',
      description: 'Exploring how young leaders are driving tech innovation across Africa and the role of mentorship.',
      date: '2024-02-22',
      time: '3:00 PM GMT',
      type: 'Workshop',
      speaker: 'Tech Leaders Panel',
      speakerRole: 'Industry Experts',
      image: '/Career.jpg',
      registrationLink: '#',
      attendees: 89
    },
    {
      id: 3,
      title: 'Building Sustainable Partnerships',
      description: 'How to create lasting partnerships between diaspora organizations and local communities.',
      date: '2024-03-01',
      time: '1:00 PM GMT',
      type: 'Panel Discussion',
      speaker: 'Partnership Specialists',
      speakerRole: 'NGO Leaders',
      image: '/Collaboration.jpg',
      registrationLink: '#',
      attendees: 203
    }
  ];

  const fallbackPastEvents = [
    {
      id: 4,
      title: 'Introduction to iSpora Platform',
      description: 'An overview of the iSpora platform features and how to get started.',
      date: '2024-01-10',
      time: '2:00 PM GMT',
      type: 'Webinar',
      speaker: 'iSpora Team',
      speakerRole: 'Platform Team',
      image: '/academy.jpg',
      recordingLink: '#',
      attendees: 312,
      views: 1250
    },
    {
      id: 5,
      title: 'Mentorship Best Practices',
      description: 'Effective mentorship strategies for diaspora professionals working with youth.',
      date: '2024-01-05',
      time: '3:00 PM GMT',
      type: 'Workshop',
      speaker: 'Dr. James Osei',
      speakerRole: 'Senior Mentor',
      image: '/Mentorship.jpg',
      recordingLink: '#',
      attendees: 187,
      views: 890
    },
    {
      id: 6,
      title: 'Community Building in the Digital Age',
      description: 'How to build and sustain vibrant online communities for social impact.',
      date: '2023-12-20',
      time: '2:30 PM GMT',
      type: 'Panel Discussion',
      speaker: 'Community Leaders',
      speakerRole: 'Network Builders',
      image: '/communinty.jpg',
      recordingLink: '#',
      attendees: 245,
      views: 1567
    }
  ];

  // Use API data if available, otherwise use fallback
  const upcomingEvents = events.filter((e: any) => e.status === 'upcoming');
  const pastEvents = events.filter((e: any) => e.status === 'past');
  
  const displayEvents = events.length > 0 
    ? (activeTab === 'upcoming' ? upcomingEvents : pastEvents)
    : (activeTab === 'upcoming' ? fallbackUpcomingEvents : fallbackPastEvents);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <Section 
        className="relative overflow-hidden pt-24 pb-12 sm:pt-32"
        style={{
          background: 'linear-gradient(135deg, hsl(220 100% 96%) 0%, hsl(220 100% 92%) 50%, hsl(220 100% 95%) 100%)'
        }}
      >
        <AnimatedBlob className="top-0 left-0 bg-primary/15" delay={0} size="w-96 h-96" />
        <AnimatedBlob className="bottom-0 right-0 bg-secondary/15" delay={2} size="w-80 h-80" />
        <AnimatedDots />
        
        <div className="relative z-10">
          <PageHeader
            title="Webinars & Programs"
            description="Join our upcoming events and access recordings of past webinars, workshops, and programs"
          />
        </div>
      </Section>

      {/* Tabs */}
      <Section 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 100% 96%) 50%, hsl(220 100% 98%) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-primary/20 bg-background p-1">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium transition-all",
                  activeTab === 'upcoming'
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium transition-all",
                  activeTab === 'past'
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Past Events
              </button>
            </div>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading events...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayEvents.map((event: any, index: number) => (
              <motion.div
                key={event.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: safeTransition({ delay: index * 0.1, duration: 0.5 })
                  }
                }}
              >
                <Card className={cn(
                  "h-full hover:shadow-xl transition-all duration-300 border-2 overflow-hidden",
                  activeTab === 'upcoming' && index === 0
                    ? "bg-primary text-primary-foreground border-primary shadow-lg"
                    : "border-primary/20 hover:border-primary/40 bg-card"
                )}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image_url || event.image || '/conference.jpg'} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={cn(
                      "absolute inset-0",
                      activeTab === 'upcoming' && index === 0
                        ? "bg-gradient-to-br from-primary/60 via-primary/40 to-primary/50"
                        : "bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"
                    )} />
                    <Badge className={cn(
                      "absolute top-3 right-3",
                      activeTab === 'upcoming' && index === 0
                        ? "bg-white/20 text-white border-white/30"
                        : "bg-primary text-white"
                    )}>
                      {event.event_type || event.type}
                    </Badge>
                  </div>

                  <CardHeader>
                    <div className={cn(
                      "flex items-center space-x-2 mb-2 text-xs",
                      activeTab === 'upcoming' && index === 0 ? "text-white/80" : "text-muted-foreground"
                    )}>
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(event.event_date || event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>{event.event_time || event.time}</span>
                    </div>
                    <CardTitle className={cn(
                      "text-xl font-bold mb-2",
                      activeTab === 'upcoming' && index === 0 && "text-white"
                    )}>
                      {event.title}
                    </CardTitle>
                    <CardDescription className={cn(
                      "text-sm leading-relaxed",
                      activeTab === 'upcoming' && index === 0 && "text-white/90"
                    )}>
                      {event.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className={cn(
                      "mb-4 pb-4 border-b",
                      activeTab === 'upcoming' && index === 0 ? "border-white/20" : "border-border"
                    )}>
                      <div className={cn(
                        "text-sm font-medium mb-1",
                        activeTab === 'upcoming' && index === 0 ? "text-white" : "text-foreground"
                      )}>
                        {event.speaker}
                      </div>
                      <div className={cn(
                        "text-xs",
                        activeTab === 'upcoming' && index === 0 ? "text-white/70" : "text-muted-foreground"
                      )}>
                        {event.speaker_role || event.speakerRole}
                      </div>
                    </div>

                    {activeTab === 'upcoming' ? (
                      <div className="space-y-3">
                        <div className={cn(
                          "flex items-center space-x-2 text-sm",
                          index === 0 ? "text-white/80" : "text-muted-foreground"
                        )}>
                          <Users className="h-4 w-4" />
                          <span>{event.attendees || 0} registered</span>
                        </div>
                        <Button 
                          className={cn(
                            "w-full",
                            index === 0 && "bg-white text-primary hover:bg-white/90"
                          )}
                          onClick={() => window.open(event.registration_link || event.registrationLink || '#', '_blank')}
                        >
                          Register Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className={cn(
                          "flex items-center justify-between text-sm",
                          index === 0 ? "text-white/80" : "text-muted-foreground"
                        )}>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees || 0} attended</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <PlayCircle className="h-4 w-4" />
                            <span>{event.views || 0} views</span>
                          </div>
                        </div>
                        <Button 
                          variant={index === 0 ? "secondary" : "outline"}
                          className={cn(
                            "w-full",
                            index === 0 && "bg-white text-primary hover:bg-white/90"
                          )}
                          onClick={() => window.open(event.recording_link || event.recordingLink || '#', '_blank')}
                        >
                          Watch Recording
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={safeTransition({ delay: 0.3 })}
          >
            <p className="text-muted-foreground mb-4">
              Want to stay updated on upcoming events?
            </p>
            <Button onClick={() => onPageChange('join')}>
              Join Our Community
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}

