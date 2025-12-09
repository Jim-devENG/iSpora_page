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
import { fetchJson } from '../src/utils/fetchJson';
import { 
  Calendar, 
  Clock, 
  MapPin,
  Users,
  Video,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  PlayCircle,
  Loader2
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
  // API URL: /api/events?upcoming=true (for upcoming) or /api/events?status=all (for all)
  // Response shape: { events: Event[] }
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch all events (we'll filter by status client-side for now)
        const response = await fetchJson<{ events: any[] }>('/api/events?status=all');
        const allEvents = Array.isArray(response.events) ? response.events : [];
        setEvents(allEvents);
      } catch (error: any) {
        // Log error but don't crash - show empty state instead
        console.error('Error fetching events:', error.message || error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events by status and date
  const now = new Date().toISOString();
  const upcomingEvents = events.filter((e: any) => {
    if (e.status !== 'published') return false;
    return e.start_at && new Date(e.start_at) >= new Date(now);
  });
  const pastEvents = events.filter((e: any) => {
    if (e.status !== 'published') return false;
    return e.start_at && new Date(e.start_at) < new Date(now);
  });
  
  const displayEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

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
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading events...</p>
            </div>
          ) : displayEvents.length === 0 ? (
            <div className="text-center py-12">
              <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No events available yet.</p>
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
                      src={event.cover_image_url || event.image_url || event.image || '/conference.jpg'} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={cn(
                      "absolute inset-0",
                      activeTab === 'upcoming' && index === 0
                        ? "bg-gradient-to-br from-primary/60 via-primary/40 to-primary/50"
                        : "bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"
                    )} />
                    {event.location && (
                      <Badge className={cn(
                        "absolute top-3 right-3",
                        activeTab === 'upcoming' && index === 0
                          ? "bg-white/20 text-white border-white/30"
                          : "bg-primary text-white"
                      )}>
                        {event.location}
                      </Badge>
                    )}
                  </div>

                  <CardHeader>
                    <div className={cn(
                      "flex items-center space-x-2 mb-2 text-xs",
                      activeTab === 'upcoming' && index === 0 ? "text-white/80" : "text-muted-foreground"
                    )}>
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(event.start_at || event.event_date || event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      {event.end_at && (
                        <>
                          <span>•</span>
                          <span>Ends: {new Date(event.end_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </>
                      )}
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
                      {event.description || 'No description available'}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {event.location && (
                      <div className={cn(
                        "mb-4 pb-4 border-b",
                        activeTab === 'upcoming' && index === 0 ? "border-white/20" : "border-border"
                      )}>
                        <div className={cn(
                          "text-sm font-medium",
                          activeTab === 'upcoming' && index === 0 ? "text-white" : "text-foreground"
                        )}>
                          📍 {event.location}
                        </div>
                      </div>
                    )}

                    {activeTab === 'upcoming' ? (
                      <div className="space-y-3">
                        {event.registration_link && (
                          <Button 
                            className={cn(
                              "w-full",
                              index === 0 && "bg-white text-primary hover:bg-white/90"
                            )}
                            onClick={() => window.open(event.registration_link || '#', '_blank')}
                          >
                            Register Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className={cn(
                          "text-sm",
                          index === 0 ? "text-white/80" : "text-muted-foreground"
                        )}>
                          This event has ended.
                        </p>
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

