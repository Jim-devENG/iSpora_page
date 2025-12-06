import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { Section } from './layout/Section';
import { PageHeader } from './layout/PageHeader';
import { 
  Users,
  Globe,
  Send,
  Loader2,
  CheckCircle
} from 'lucide-react';

interface JoinPageProps {
  onPageChange: (page: string) => void;
}

export function JoinPage({ onPageChange }: JoinPageProps) {
  const [diasporaFormData, setDiasporaFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryOfResidence: '',
    countryOfOrigin: '',
    city: '',
    linkedin: '',
    currentWork: '',
    contributeInterest: '',
    areasOfInterest: [] as string[],
    otherInterest: '',
    expectations: ''
  });

  const [localFormData, setLocalFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    ageRange: '',
    background: '',
    fieldOfStudy: '',
    interests: [] as string[],
    otherInterest: '',
    expectations: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState('diaspora');

  const diasporaAreasOfInterest = [
    'Mentorship',
    'Career & Professional Development',
    'Volunteering',
    'Project Collaboration',
    'Policy & Governance',
    'Investment & Startup Support',
    'Events & Speaking Opportunities',
    'Community Building',
    'Technology & Innovation',
    'National Development Programs',
    'Youth Empowerment'
  ];

  const localInterests = [
    'Mentorship',
    'Leadership Development',
    'Career & Professional Growth',
    'Skill Acquisition / Training',
    'Internship & Job Opportunities',
    'Project Collaboration',
    'Volunteering',
    'Entrepreneurship Support',
    'Scholarships / Learning Resources',
    'Events, Webinars & Conferences',
    'Youth-led Initiatives Support'
  ];

  const handleDiasporaInputChange = (field: string, value: string | string[]) => {
    setDiasporaFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocalInputChange = (field: string, value: string | string[]) => {
    setLocalFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDiasporaCheckboxChange = (option: string, checked: boolean) => {
    setDiasporaFormData(prev => {
      const current = prev.areasOfInterest;
      if (checked) {
        return { ...prev, areasOfInterest: [...current, option] };
      } else {
        return { ...prev, areasOfInterest: current.filter(item => item !== option) };
      }
    });
  };

  const handleLocalCheckboxChange = (option: string, checked: boolean) => {
    setLocalFormData(prev => {
      const current = prev.interests;
      if (checked) {
        return { ...prev, interests: [...current, option] };
      } else {
        return { ...prev, interests: current.filter(item => item !== option) };
      }
    });
  };

  const handleDiasporaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Submit to API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      // Reset form after delay
      setTimeout(() => {
        setDiasporaFormData({
          fullName: '',
          email: '',
          phone: '',
          countryOfResidence: '',
          countryOfOrigin: '',
          city: '',
          linkedin: '',
          currentWork: '',
          contributeInterest: '',
          areasOfInterest: [],
          otherInterest: '',
          expectations: ''
        });
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Submit to API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      // Reset form after delay
      setTimeout(() => {
        setLocalFormData({
          fullName: '',
          email: '',
          phone: '',
          country: '',
          state: '',
          city: '',
          ageRange: '',
          background: '',
          fieldOfStudy: '',
          interests: [],
          otherInterest: '',
          expectations: ''
        });
        setSubmitStatus('idle');
      }, 3000);
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
        className="pt-24 pb-12 sm:pt-32"
        style={{
          background: 'linear-gradient(135deg, hsl(220 100% 95%) 0%, hsl(220 100% 92%) 50%, hsl(220 67% 94%) 100%)'
        }}
      >
        <PageHeader
          title="Join the iSpora Network"
          description="Choose the pathway that best describes you: Local Community, Diaspora Network, or Partner Organization."
        />
      </Section>

      {/* Forms with Tabs */}
      <Section 
        className="relative"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 100% 94%) 50%, hsl(220 100% 96%) 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="diaspora" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Diaspora Network</span>
              </TabsTrigger>
              <TabsTrigger value="local" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Local Community</span>
              </TabsTrigger>
            </TabsList>

            {/* Diaspora Community Form */}
            <TabsContent value="diaspora">
              <Card className="shadow-xl border-primary/10">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="secondary">For citizens of the Global South living abroad</Badge>
                  </div>
                  <CardTitle className="text-2xl">Diaspora Community Form</CardTitle>
                  <CardDescription>
                    Join our global diaspora network and connect with opportunities to contribute to the Global South.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDiasporaSubmit} className="space-y-6">
                    {/* 1. Personal Information */}
                    <div className="space-y-4 border-b pb-6">
                      <h3 className="text-lg font-semibold">1. Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="d-fullName">Full Name *</Label>
                          <Input
                            id="d-fullName"
                            value={diasporaFormData.fullName}
                            onChange={(e) => handleDiasporaInputChange('fullName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="d-email">Email Address *</Label>
                          <Input
                            id="d-email"
                            type="email"
                            value={diasporaFormData.email}
                            onChange={(e) => handleDiasporaInputChange('email', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="d-phone">Phone Number (optional)</Label>
                          <Input
                            id="d-phone"
                            type="tel"
                            value={diasporaFormData.phone}
                            onChange={(e) => handleDiasporaInputChange('phone', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="d-countryResidence">Country of Residence *</Label>
                          <Input
                            id="d-countryResidence"
                            value={diasporaFormData.countryOfResidence}
                            onChange={(e) => handleDiasporaInputChange('countryOfResidence', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="d-countryOrigin">Country of Origin (Home Country) *</Label>
                          <Input
                            id="d-countryOrigin"
                            value={diasporaFormData.countryOfOrigin}
                            onChange={(e) => handleDiasporaInputChange('countryOfOrigin', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="d-city">City (optional)</Label>
                          <Input
                            id="d-city"
                            value={diasporaFormData.city}
                            onChange={(e) => handleDiasporaInputChange('city', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="d-linkedin">LinkedIn Profile (optional but recommended)</Label>
                          <Input
                            id="d-linkedin"
                            type="url"
                            value={diasporaFormData.linkedin}
                            onChange={(e) => handleDiasporaInputChange('linkedin', e.target.value)}
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2. Your Background */}
                    <div className="space-y-4 border-b pb-6">
                      <h3 className="text-lg font-semibold">2. Your Background</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="d-currentWork">What do you currently do? *</Label>
                          <p className="text-sm text-muted-foreground">(Job title, field of work, or area of expertise)</p>
                          <Input
                            id="d-currentWork"
                            value={diasporaFormData.currentWork}
                            onChange={(e) => handleDiasporaInputChange('currentWork', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Are you interested in contributing your experience or skills to initiatives back home? *</Label>
                          <RadioGroup
                            value={diasporaFormData.contributeInterest}
                            onValueChange={(value) => handleDiasporaInputChange('contributeInterest', value)}
                            required
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="d-contribute-yes" />
                              <Label htmlFor="d-contribute-yes" className="font-normal">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="d-contribute-no" />
                              <Label htmlFor="d-contribute-no" className="font-normal">No</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="maybe" id="d-contribute-maybe" />
                              <Label htmlFor="d-contribute-maybe" className="font-normal">Maybe later</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>

                    {/* 3. Areas of Interest */}
                    <div className="space-y-4 border-b pb-6">
                      <h3 className="text-lg font-semibold">3. Areas of Interest (Select All That Apply)</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {diasporaAreasOfInterest.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`d-${option}`}
                              checked={diasporaFormData.areasOfInterest.includes(option)}
                              onCheckedChange={(checked) => handleDiasporaCheckboxChange(option, checked as boolean)}
                            />
                            <Label htmlFor={`d-${option}`} className="text-sm font-normal cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="d-otherInterest">Other (please specify)</Label>
                        <Input
                          id="d-otherInterest"
                          value={diasporaFormData.otherInterest}
                          onChange={(e) => handleDiasporaInputChange('otherInterest', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* 4. Expectations */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">4. What are your expectations for joining our Diaspora Community?</h3>
                      <div className="space-y-2">
                        <Label htmlFor="d-expectations">(Short answer) *</Label>
                        <Textarea
                          id="d-expectations"
                          value={diasporaFormData.expectations}
                          onChange={(e) => handleDiasporaInputChange('expectations', e.target.value)}
                          rows={4}
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t">
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
                            Join the Diaspora Network
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Join the Diaspora Network
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Local Community Form */}
            <TabsContent value="local">
              <Card className="shadow-xl border-primary/10">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="secondary">For young people, youth leaders, students, and professionals living within the Global South</Badge>
                  </div>
                  <CardTitle className="text-2xl">Local Community Form</CardTitle>
                  <CardDescription>
                    Connect with opportunities, mentorship, training, and a growing ecosystem of change-makers across the Global South.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLocalSubmit} className="space-y-6">
                    {/* 1. Personal Information */}
                    <div className="space-y-4 border-b pb-6">
                      <h3 className="text-lg font-semibold">1. Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="l-fullName">Full Name *</Label>
                          <Input
                            id="l-fullName"
                            value={localFormData.fullName}
                            onChange={(e) => handleLocalInputChange('fullName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="l-email">Email Address *</Label>
                          <Input
                            id="l-email"
                            type="email"
                            value={localFormData.email}
                            onChange={(e) => handleLocalInputChange('email', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="l-phone">Phone Number / WhatsApp Number *</Label>
                          <Input
                            id="l-phone"
                            type="tel"
                            value={localFormData.phone}
                            onChange={(e) => handleLocalInputChange('phone', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="l-country">Country *</Label>
                          <Input
                            id="l-country"
                            value={localFormData.country}
                            onChange={(e) => handleLocalInputChange('country', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="l-state">State / Region *</Label>
                          <Input
                            id="l-state"
                            value={localFormData.state}
                            onChange={(e) => handleLocalInputChange('state', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="l-city">City (optional)</Label>
                          <Input
                            id="l-city"
                            value={localFormData.city}
                            onChange={(e) => handleLocalInputChange('city', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Age Range *</Label>
                          <RadioGroup
                            value={localFormData.ageRange}
                            onValueChange={(value) => handleLocalInputChange('ageRange', value)}
                            required
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="under18" id="l-age-under18" />
                              <Label htmlFor="l-age-under18" className="font-normal">Under 18</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="18-24" id="l-age-18-24" />
                              <Label htmlFor="l-age-18-24" className="font-normal">18-24</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="25-35" id="l-age-25-35" />
                              <Label htmlFor="l-age-25-35" className="font-normal">25-35</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="36+" id="l-age-36+" />
                              <Label htmlFor="l-age-36+" className="font-normal">36+</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>

                    {/* 2. Your Background */}
                    <div className="space-y-4 border-b pb-6">
                      <h3 className="text-lg font-semibold">2. Your Background</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Are you a: *</Label>
                          <RadioGroup
                            value={localFormData.background}
                            onValueChange={(value) => handleLocalInputChange('background', value)}
                            required
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="student" id="l-bg-student" />
                              <Label htmlFor="l-bg-student" className="font-normal">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="graduate" id="l-bg-graduate" />
                              <Label htmlFor="l-bg-graduate" className="font-normal">Graduate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="professional" id="l-bg-professional" />
                              <Label htmlFor="l-bg-professional" className="font-normal">Young Professional</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="leader" id="l-bg-leader" />
                              <Label htmlFor="l-bg-leader" className="font-normal">Youth Leader</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="volunteer" id="l-bg-volunteer" />
                              <Label htmlFor="l-bg-volunteer" className="font-normal">Community Volunteer</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="entrepreneur" id="l-bg-entrepreneur" />
                              <Label htmlFor="l-bg-entrepreneur" className="font-normal">Entrepreneur</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="l-bg-other" />
                              <Label htmlFor="l-bg-other" className="font-normal">Other</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="l-fieldOfStudy">Field of Study / Work / Skills *</Label>
                          <Input
                            id="l-fieldOfStudy"
                            value={localFormData.fieldOfStudy}
                            onChange={(e) => handleLocalInputChange('fieldOfStudy', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3. Interests */}
                    <div className="space-y-4 border-b pb-6">
                      <h3 className="text-lg font-semibold">3. What are you Interested in? (Select multiple)</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {localInterests.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`l-${option}`}
                              checked={localFormData.interests.includes(option)}
                              onCheckedChange={(checked) => handleLocalCheckboxChange(option, checked as boolean)}
                            />
                            <Label htmlFor={`l-${option}`} className="text-sm font-normal cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="l-otherInterest">Other (please specify)</Label>
                        <Input
                          id="l-otherInterest"
                          value={localFormData.otherInterest}
                          onChange={(e) => handleLocalInputChange('otherInterest', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* 4. Expectations */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">4. What are your expectations for joining our Local Community?</h3>
                      <div className="space-y-2">
                        <Textarea
                          id="l-expectations"
                          value={localFormData.expectations}
                          onChange={(e) => handleLocalInputChange('expectations', e.target.value)}
                          rows={4}
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t">
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
                            Join the Local Community
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Join the Local Community
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Section>
    </div>
  );
}

