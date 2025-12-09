import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin,
  Send,
  Clock,
  Globe,
  MessageCircle,
  Users,
  CheckCircle,
  Headphones
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ContactPageProps {
  onPageChange: (page: string) => void;
}

export function ContactPage({ onPageChange }: ContactPageProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    role: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
             const response = await fetch('https://formspree.io/f/meozdbrv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          message: formData.message,
          _subject: `Contact from ${formData.name} - ${formData.role}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          role: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Us',
      description: 'General inquiries and support',
      value: 'info@ispora.com',
      badge: { text: '24h response', color: 'bg-green-100 text-green-800' }
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Live Chat',
      description: 'Real-time support during business hours',
      value: 'Start Chat',
      badge: { text: 'Mon-Fri 9AM-6PM', color: 'bg-primary/10 text-primary' }
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Reach',
      description: 'Active in 15+ African countries',
      value: 'Diaspora communities worldwide',
      badge: { text: 'Global', color: 'bg-purple-100 text-purple-800' }
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
                Get in Touch
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Let's Create Impact
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Together</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Have questions about our platform? Want to explore partnerships? We'd love to hear from you and discuss how we can create meaningful change together.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>24-hour response time</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Global support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="/conference.jpg"
                  alt="Conference and collaboration meeting"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background border border-border p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Always Here to Help</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {method.icon}
                  </div>
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                <p className="font-medium text-sm mb-3 text-foreground">{method.value}</p>
                <Badge className={method.badge.color}>{method.badge.text}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                      <Send className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Send us a Message</CardTitle>
                      <CardDescription>
                        Fill out the form and we'll get back to you within 24 hours.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Name *</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">I am a... *</label>
                      <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diaspora">Diaspora Professional</SelectItem>
                          <SelectItem value="youth">Youth</SelectItem>
                          <SelectItem value="organization">Organization/NGO</SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="investor">Investor</SelectItem>
                          <SelectItem value="media">Media</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Message *</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your inquiry, partnership ideas, or how we can help you..."
                        rows={6}
                        required
                      />
                    </div>
                                         <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                       <CheckCircle className="h-4 w-4" />
                       <span>We respect your privacy and will never share your information</span>
                     </div>
                     
                     {/* Status Messages */}
                     {submitStatus === 'success' && (
                       <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                         <div className="flex items-center space-x-2">
                           <CheckCircle className="h-5 w-5 text-green-600" />
                           <span className="text-green-800 font-medium">Message sent successfully!</span>
                         </div>
                         <p className="text-green-700 text-sm mt-1">We'll get back to you within 24 hours.</p>
                       </div>
                     )}
                     
                     {submitStatus === 'error' && (
                       <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                         <div className="flex items-center space-x-2">
                           <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                           <span className="text-red-800 font-medium">Failed to send message</span>
                         </div>
                         <p className="text-red-700 text-sm mt-1">Please try again or contact us directly at info@ispora.com</p>
                       </div>
                     )}
                     
                     <Button 
                       type="submit" 
                       className="w-full" 
                       size="lg"
                       disabled={isSubmitting}
                     >
                       {isSubmitting ? (
                         <>
                           <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Sending...
                         </>
                       ) : (
                         <>
                           <Send className="mr-2 h-4 w-4" />
                           Send Message
                         </>
                       )}
                     </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Headphones className="mr-2 h-5 w-5 text-secondary" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monday - Friday</span>
                    <span className="text-sm font-medium">9AM - 6PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Saturday</span>
                    <span className="text-sm font-medium">10AM - 4PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sunday</span>
                    <span className="text-sm font-medium">Closed</span>
                  </div>
                                     <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                     <p className="text-xs text-primary">
                       <strong>Email support</strong> is available 24/7 with responses within 24 hours
                     </p>
                   </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Users</span>
                    <span className="text-sm font-bold text-primary">1,200+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Countries</span>
                    <span className="text-sm font-bold text-secondary">15+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Projects Completed</span>
                    <span className="text-sm font-bold text-accent">85+</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Common questions about our platform and how to get started
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "How do I get started on iSpora?",
                answer: "Simply create your profile, browse available projects or mentorship opportunities, and apply to join. Youth access is completely free with no hidden costs!"
              },
              {
                question: "What is the time commitment?",
                answer: "Projects typically run 8-16 weeks with 4-8 hours per week. Mentorship sessions are flexible, usually 1-2 hours per month based on your availability."
              },
              {
                question: "Do you offer partnerships with organizations?",
                answer: "Yes! We work with NGOs, universities, and governments to integrate our platform into existing youth development programs with custom solutions."
              },
              {
                question: "How do you ensure project quality?",
                answer: "All diaspora leaders are vetted through a comprehensive screening process, projects are monitored for progress, and we have a robust feedback system."
              },
              {
                question: "Is there a cost for youth to participate?",
                answer: "No! Youth participation is completely free. We believe in removing financial barriers to opportunity and education."
              },
              {
                question: "What support do you provide to mentors?",
                answer: "We provide training resources, matching support, progress tracking tools, and a dedicated community of experienced mentors for peer support."
              }
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-start">
                    <MessageCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
