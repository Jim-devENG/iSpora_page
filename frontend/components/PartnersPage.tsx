import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Section } from './layout/Section';
import { PageHeader } from './layout/PageHeader';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { FloatingShapes, AnimatedBlob } from './animations/FloatingElements';
import { AnimatedDots, AnimatedGrid } from './animations/AnimatedBackground';
import { 
  Building, 
  Users, 
  Globe, 
  Target,
  CheckCircle,
  ArrowRight,
  Send,
  Loader2
} from 'lucide-react';

interface PartnersPageProps {
  onPageChange: (page: string) => void;
}

export function PartnersPage({ onPageChange }: PartnersPageProps) {
  const [formData, setFormData] = useState({
    // Contact Information
    fullName: '',
    email: '',
    phone: '',
    country: '',
    linkedin: '',
    // Organization Information
    orgName: '',
    orgType: '',
    role: '',
    orgWebsite: '',
    orgSocialMedia: '',
    // Partnership Focus
    partnershipFocus: [] as string[],
    otherFocus: '',
    // About Your Work
    aboutWork: '',
    // Partnership Intent
    whyPartner: '',
    howContribute: '',
    whatExpect: '',
    // Additional Notes
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const partnershipFocusOptions = [
    'Mentorship & Talent Development',
    'Project Collaboration',
    'Funding / Investment',
    'Diaspora Engagement Initiatives',
    'National Development Programs',
    'Research & Policy Support',
    'Technology & Innovation',
    'Capacity Building & Training',
    'Youth Empowerment',
    'Events, Seminars & Speaking Engagements',
    'Volunteering'
  ];

  const orgTypes = [
    'NGO',
    'Social Enterprise',
    'Government Agency',
    'Academic Institution',
    'Diaspora Group',
    'Corporate Organization',
    'Foundation',
    'Youth-Led Initiative',
    'Other'
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    setFormData(prev => {
      const current = prev.partnershipFocus;
      if (checked) {
        return { ...prev, partnershipFocus: [...current, option] };
      } else {
        return { ...prev, partnershipFocus: current.filter(item => item !== option) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Get IP address and user agent
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;
      const userAgent = navigator.userAgent;

      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ipAddress,
          userAgent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit partnership interest');
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        linkedin: '',
        orgName: '',
        orgType: '',
        role: '',
        orgWebsite: '',
        orgSocialMedia: '',
        partnershipFocus: [],
        otherFocus: '',
        aboutWork: '',
        whyPartner: '',
        howContribute: '',
        whatExpect: '',
        additionalNotes: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <Section 
        className="relative overflow-hidden pt-24 pb-12 sm:pt-32"
        style={{
          background: 'linear-gradient(135deg, hsl(220 67% 94%) 0%, hsl(220 100% 92%) 50%, hsl(220 100% 95%) 100%)'
        }}
      >
        <AnimatedBlob className="top-0 left-0 bg-primary/15" delay={0} size="w-96 h-96" />
        <AnimatedBlob className="bottom-0 right-0 bg-secondary/15" delay={2} size="w-80 h-80" />
        <AnimatedDots />
        
        <div className="relative z-10">
          <PageHeader
            title="Partnership & Collaborations"
            description="At iSpora, we are building a coalition of Diaspora innovators, global institutions, NGOs, and impact-driven organizations—both local and international—dedicated to reshaping the future of the Global South. Together, we can accelerate meaningful and lasting change."
                />
              </div>
      </Section>

      {/* Partnership Context */}
      <Section 
        className="relative"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 100% 94%) 50%, hsl(220 67% 92%) 100%)'
        }}
      >
        <motion.div
          className="max-w-4xl mx-auto space-y-6"
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
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              As a platform rooted in collaboration, iSpora's mission directly aligns with <strong className="text-foreground">SDG 17: Partnerships for the Goals</strong>.
            </p>
            <p>
              We believe that bringing diverse impact-driven efforts into a single, interconnected ecosystem will significantly enhance effectiveness, foster strong and productive collaborations, drive transformation across nations, and inspire greater participation from both Diasporans and home-based change-makers.
            </p>
            <p>
              If you are an impact-driven founder, Diaspora leader, CEO, investor, builder, or stakeholder connected to the Global South—and you share our vision for transformation—we would be delighted to explore collaboration with you.
            </p>
            <p className="font-semibold text-foreground">
              Kindly fill out the form below, and a member of our team will reach out to you promptly.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Partnership Interest Form */}
      <Section 
        className="relative"
        style={{
          background: 'linear-gradient(90deg, hsl(220 100% 94%) 0%, hsl(220 67% 90%) 50%, hsl(220 100% 93%) 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-primary/10">
                <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl">Partnership Interest Form</CardTitle>
              <CardDescription>
                Please fill out all required fields. Our representative will communicate with you promptly.
              </CardDescription>
                </CardHeader>
                <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">1. Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                      />
                  </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
          </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
        </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country / Region *</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        required
                      />
          </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                  </div>
          </div>
        </div>

                {/* 2. Organization Information */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-xl font-semibold mb-4">2. Organization Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="orgName">Organization Name *</Label>
                      <Input
                        id="orgName"
                        value={formData.orgName}
                        onChange={(e) => handleInputChange('orgName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orgType">Organization Type *</Label>
                      <Select
                        value={formData.orgType}
                        onValueChange={(value) => handleInputChange('orgType', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent>
                          {orgTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Your Role / Position *</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        required
                      />
          </div>
                    <div className="space-y-2">
                      <Label htmlFor="orgWebsite">Organization Website</Label>
                      <Input
                        id="orgWebsite"
                        type="url"
                        value={formData.orgWebsite}
                        onChange={(e) => handleInputChange('orgWebsite', e.target.value)}
                        placeholder="https://example.com"
                  />
                </div>
                    <div className="space-y-2">
                      <Label htmlFor="orgSocialMedia">Organization Social Media Pages</Label>
                      <Input
                        id="orgSocialMedia"
                        value={formData.orgSocialMedia}
                        onChange={(e) => handleInputChange('orgSocialMedia', e.target.value)}
                        placeholder="Twitter, Facebook, Instagram handles"
                      />
                      </div>
                    </div>
                  </div>

                {/* 3. Partnership Focus */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-xl font-semibold mb-4">3. Partnership Focus</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Which areas are you most interested in? (Select one or multiple)
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {partnershipFocusOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={formData.partnershipFocus.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                        />
                        <Label htmlFor={option} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                        </div>
                      ))}
                    </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="otherFocus">Other (please specify)</Label>
                    <Input
                      id="otherFocus"
                      value={formData.otherFocus}
                      onChange={(e) => handleInputChange('otherFocus', e.target.value)}
                    />
                  </div>
                  </div>

                {/* 4. About Your Work */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-xl font-semibold mb-4">4. About Your Work</h3>
                  <div className="space-y-2">
                    <Label htmlFor="aboutWork">
                      Briefly describe your organization or initiative *
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      What do you do? Who do you serve? What impact have you created so far?
                    </p>
                    <Textarea
                      id="aboutWork"
                      value={formData.aboutWork}
                      onChange={(e) => handleInputChange('aboutWork', e.target.value)}
                      rows={5}
                      required
                    />
          </div>
        </div>

                {/* 5. Partnership Intent */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-xl font-semibold mb-4">5. Partnership Intent</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="whyPartner">Why do you want to partner with iSpora? *</Label>
                      <Textarea
                        id="whyPartner"
                        value={formData.whyPartner}
                        onChange={(e) => handleInputChange('whyPartner', e.target.value)}
                        rows={3}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="howContribute">
                        How would you like to contribute to the iSpora ecosystem? *
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        (Expertise, funding, network access, opportunities, mentoring, training, tech support, institutional support, etc.)
                      </p>
                      <Textarea
                        id="howContribute"
                        value={formData.howContribute}
                        onChange={(e) => handleInputChange('howContribute', e.target.value)}
                        rows={3}
                        required
                      />
          </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatExpect">
                        What do you expect from iSpora in this partnership? *
                      </Label>
                      <Textarea
                        id="whatExpect"
                        value={formData.whatExpect}
                        onChange={(e) => handleInputChange('whatExpect', e.target.value)}
                        rows={3}
                        required
                      />
                    </div>
                  </div>
              </div>

                {/* 6. Additional Notes */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-xl font-semibold mb-4">6. Additional Notes</h3>
                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Anything else you'd like us to know? (Optional)</Label>
                    <Textarea
                      id="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                      rows={3}
                    />
          </div>
        </div>

                {/* Submit Button */}
                <div className="border-t pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 text-base font-medium"
                    disabled={isSubmitting || submitStatus === 'success'}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Submitted Successfully
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Partnership Interest
                      </>
                    )}
                  </Button>
                  {submitStatus === 'success' && (
                    <p className="mt-4 text-sm text-green-600 text-center">
                      Our representative will communicate with you promptly.
                    </p>
                  )}
          </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}
