import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { FloatingShapes, AnimatedBlob, FloatingIcon } from './animations/FloatingElements';
import { AnimatedDots, AnimatedGrid } from './animations/AnimatedBackground';
import { 
  Heart, 
  Globe, 
  Target, 
  Users, 
  Lightbulb,
  Award,
  Calendar,
  MapPin,
  Linkedin,
  Twitter,
  Mail,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Network,
  Rocket,
  CheckCircle,
  Earth,
  Building,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { Section } from './layout/Section';
import { PageHeader } from './layout/PageHeader';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { cn } from './ui/utils';

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

export function AboutPage({ onPageChange }: AboutPageProps) {
  const teamMembers = [
    {
      name: 'Oluwaseyi Olawale',
      role: 'Co-Founder & Lead Visionary',
      bio: 'Oluwaseyi is a serial entrepreneur and founder of Genomac Holdings, a thriving biotechnology company driving innovation across Africa and beyond. As the lead visionary behind the iSpora digital app, he provides strategic oversights and foundational support that sustain the evolution of the iSpora vision. His Genomac Innovation Hub, a subsidiary of Genomac Holdings, currently offers workspace, personnel, and strategic backing to iSpora—serving as a key engine supporting the platform\'s development.',
      initials: 'OO'
    },
    {
      name: 'Elijah Jesuseye Ogunyale',
      role: 'Co-Founder & CEO',
      bio: 'Elijah is a passionate youth leader and founder of EmQuip Leadership Trainers & Development Partners Limited, with a bold vision for African and Global South leadership transformation. His unique passion for the African Diaspora, leadership development, and national growth fuels iSpora\'s mission. As the founding CEO of iSpora, he drives community-building, leadership, and strategic ideation, shaping the movement and ensuring its alignment with the broader vision of Global South development.',
      initials: 'EO'
    },
    {
      name: 'Enietan James',
      role: 'Co-Founder & Chief Technology Officer (CTO)',
      bio: 'Enietan is a seasoned full-stack software engineer with a strong track record of building advanced digital solutions. He leads the development of the iSpora digital platform, overseeing its architecture, engineering, functionality, and user experience as CTO.',
      initials: 'EJ'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section 
        className="relative overflow-hidden pt-24 pb-12 sm:pt-32"
        style={{
          background: 'linear-gradient(135deg, hsl(220 100% 94%) 0%, hsl(220 100% 92%) 50%, hsl(220 100% 95%) 100%)'
        }}
      >
        <AnimatedBlob className="top-0 left-0 bg-primary/15" delay={0} size="w-96 h-96" />
        <AnimatedBlob className="bottom-0 right-0 bg-secondary/15" delay={2} size="w-80 h-80" />
        <AnimatedDots />
        
        <div className="relative z-10">
          <PageHeader
            title="Our Story"
            description="iSpora was founded on the belief that Global South Diasporans possess immense potential to drive real, lasting transformation in their nations—and that this potential can be most effectively harnessed through an ecosystem that enables seamless collaboration with local and international organizations already working for progress."
          />
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section 
        className="relative"
        style={{
          background: 'linear-gradient(180deg, hsl(220 67% 94%) 0%, hsl(0 0% 100%) 50%, hsl(220 100% 95%) 100%)'
        }}
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: safeTransition({ duration: 0.6 })
              }
            }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/30 hover:bg-primary/5">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our mission is fundamentally aligned with SDG 17: Partnerships for the Goals.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We exist to build bridges between Diaspora communities, institutions, governments, youth-led initiatives, and impact-driven organizations across the Global South.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: safeTransition({ duration: 0.6, delay: 0.1 })
              }
            }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/30 hover:bg-primary/5">
              <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <Earth className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">Our Goal</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our goal is to create an ecosystem that strengthens collaboration between Global South organizations and their Diaspora counterparts—empowering both sides to do more, together.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  As the Global Impact Engine, we also foster partnerships among organizations that share a common vision, enabling far-reaching and sustainable impact.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Why We Exist */}
      <Section 
        className="relative"
        style={{
          background: 'linear-gradient(90deg, hsl(220 100% 94%) 0%, hsl(220 67% 90%) 50%, hsl(220 100% 93%) 100%)'
        }}
      >
          <motion.div 
          className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: safeTransition({ duration: 0.6 })
            }
          }}
        >
          <h2 className="text-3xl font-bold mb-6">Why iSpora Exists</h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              We recognize that countless youth-led initiatives across the Global South are making meaningful change in their communities yet lack the visibility, support, and resources needed to scale.
            </p>
            <p>
              Through the iSpora platform, we aim to spotlight these initiatives, amplify their work, and help them grow.
            </p>
                    </div>
                  </motion.div>
      </Section>

      {/* Meet the Founding Team */}
      <Section 
        className="relative"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 100% 95%) 50%, hsl(220 100% 96%) 100%)'
        }}
      >
        <PageHeader
          title="Meet the Founding Team"
          description="iSpora was co-founded by three visionaries united by a shared commitment to the transformation of the Global South."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
          <motion.div 
              key={member.name}
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
                "h-full hover:shadow-xl transition-all duration-300 border-2 relative overflow-hidden",
                index === 1 
                  ? "bg-primary text-primary-foreground border-primary shadow-lg" 
                  : "border-primary/20 hover:border-primary/40 bg-gradient-to-br from-primary/5 to-background"
              )}>
                {index === 1 && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-16 -mt-16" />
                )}
                <div className={cn("relative z-10", index === 1 && "text-white")}>
                  <CardHeader>
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="h-24 w-24 mb-4 ring-4 ring-primary/20">
                        <AvatarFallback className={cn(
                          "text-2xl font-bold",
                          index === 1 
                            ? "bg-white/20 text-white backdrop-blur-sm" 
                            : "bg-gradient-to-r from-primary to-secondary text-white"
                        )}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className={cn("text-xl font-bold", index === 1 && "text-white")}>
                        {member.name}
                      </CardTitle>
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "mt-2 font-medium",
                          index === 1 && "bg-white/20 text-white border-white/30"
                        )}
                      >
                        {member.role}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className={cn(
                      "text-sm leading-relaxed",
                      index === 1 ? "text-white/90" : "text-muted-foreground"
                    )}>
                      {member.bio}
                    </p>
                  </CardContent>
                </div>
              </Card>
              </motion.div>
            ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section 
        className="relative"
            style={{
          background: 'linear-gradient(135deg, hsl(220 100% 92%) 0%, hsl(220 67% 88%) 50%, hsl(220 100% 91%) 100%)'
            }}
      >
          <motion.div
          className="text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: safeTransition({ duration: 0.6 })
            }
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join Us in Building the Future
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Whether you're a youth leader, diaspora professional, or impact-driven organization, 
            there's a place for you in the iSpora ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onPageChange('community')}
              className="h-12 px-8"
            >
              Join Our Community
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onPageChange('partners')}
              className="h-12 px-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Become a Partner
            </Button>
          </div>
            </motion.div>
      </Section>
    </div>
  );
}
