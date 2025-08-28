import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, AlertCircle, Loader2, Globe, Users, Share2 } from 'lucide-react';
import { registrationService } from './services/registrationService';

interface RegistrationData {
  name: string;
  email: string;
  whatsapp: string;
  countryOfOrigin: string;
  countryOfResidence: string;
  ipAddress?: string;
  location?: {
    country?: string;
    city?: string;
    region?: string;
    latitude?: number;
    longitude?: number;
  };
  timestamp: string;
  userAgent: string;
}

interface SocialMediaRegistrationFormProps {
  showHeader?: boolean;
  formTitle?: string;
  description?: string;
  successCtaUrl?: string; // When provided, show a success CTA button to join WhatsApp
  successCtaLabel?: string;
  group?: 'local' | 'diaspora';
  countriesOverride?: { code: string; name: string }[];
}

const countries = [
  { code: 'NG', name: 'Nigeria' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'PT', name: 'Portugal' },
  { code: 'IE', name: 'Ireland' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'KE', name: 'Kenya' },
  { code: 'GH', name: 'Ghana' },
  { code: 'UG', name: 'Uganda' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'SN', name: 'Senegal' },
  { code: 'ML', name: 'Mali' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'CI', name: 'Ivory Coast' },
  { code: 'TG', name: 'Togo' },
  { code: 'BJ', name: 'Benin' },
  { code: 'NE', name: 'Niger' },
  { code: 'TD', name: 'Chad' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'CG', name: 'Republic of the Congo' },
  { code: 'CD', name: 'Democratic Republic of the Congo' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ST', name: 'São Tomé and Príncipe' },
  { code: 'AO', name: 'Angola' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' },
  { code: 'BW', name: 'Botswana' },
  { code: 'NA', name: 'Namibia' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'SZ', name: 'Eswatini' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'KM', name: 'Comoros' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'SO', name: 'Somalia' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SS', name: 'South Sudan' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'LY', name: 'Libya' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'MA', name: 'Morocco' },
  { code: 'EG', name: 'Egypt' },
  { code: 'JO', name: 'Jordan' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'SY', name: 'Syria' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IR', name: 'Iran' },
  { code: 'AF', name: 'Afghanistan' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'IN', name: 'India' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'NP', name: 'Nepal' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'MV', name: 'Maldives' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'TH', name: 'Thailand' },
  { code: 'LA', name: 'Laos' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'SG', name: 'Singapore' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'PH', name: 'Philippines' },
  { code: 'BR', name: 'Brazil' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'PE', name: 'Peru' },
  { code: 'CO', name: 'Colombia' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'GY', name: 'Guyana' },
  { code: 'SR', name: 'Suriname' },
  { code: 'FK', name: 'Falkland Islands' },
  { code: 'MX', name: 'Mexico' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'BZ', name: 'Belize' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'HN', name: 'Honduras' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'PA', name: 'Panama' },
  { code: 'CU', name: 'Cuba' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'HT', name: 'Haiti' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'BB', name: 'Barbados' },
  { code: 'GD', name: 'Grenada' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'DM', name: 'Dominica' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'MT', name: 'Malta' },
  { code: 'IS', name: 'Iceland' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MC', name: 'Monaco' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'AD', name: 'Andorra' },
  { code: 'SM', name: 'San Marino' },
  { code: 'VA', name: 'Vatican City' },
  { code: 'GR', name: 'Greece' },
  { code: 'HR', name: 'Croatia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'HU', name: 'Hungary' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'PL', name: 'Poland' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LV', name: 'Latvia' },
  { code: 'EE', name: 'Estonia' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'RO', name: 'Romania' },
  { code: 'RS', name: 'Serbia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'MK', name: 'North Macedonia' },
  { code: 'AL', name: 'Albania' },
  { code: 'XK', name: 'Kosovo' },
  { code: 'MD', name: 'Moldova' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'BY', name: 'Belarus' },
  { code: 'RU', name: 'Russia' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'GE', name: 'Georgia' },
  { code: 'AM', name: 'Armenia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'IL', name: 'Israel' },
  { code: 'PS', name: 'Palestine' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'QA', name: 'Qatar' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'OM', name: 'Oman' },
  { code: 'YE', name: 'Yemen' },
  { code: 'CN', name: 'China' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'MO', name: 'Macau' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'KP', name: 'North Korea' }
].sort((a, b) => a.name.localeCompare(b.name));

export function SocialMediaRegistrationForm({ showHeader = true, formTitle, description, successCtaUrl, successCtaLabel, group, countriesOverride }: SocialMediaRegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    whatsapp: '',
    countryOfOrigin: '',
    countryOfResidence: '',
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  // Location is collected silently for admin; not shown on the user form

  // Get IP and location data on component mount
  useEffect(() => {
    const getLocationData = async () => {
      try {
        // Get IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        
        // Get location data from IP
        const locationResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
        const locationJson = await locationResponse.json();
        setFormData(prev => ({
          ...prev,
          ipAddress: ipData.ip,
          location: {
            country: locationJson.country_name,
            city: locationJson.city,
            region: locationJson.region,
            latitude: locationJson.latitude,
            longitude: locationJson.longitude
          }
        }));
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    getLocationData();
  }, []);

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Update timestamp
      const updatedData = {
        ...formData,
        timestamp: new Date().toISOString()
      };

      // Build payload to match service contract
      const payload = {
        name: updatedData.name,
        email: updatedData.email,
        whatsapp: updatedData.whatsapp,
        countryOfOrigin: updatedData.countryOfOrigin,
        countryOfResidence: updatedData.countryOfResidence,
        ipAddress: updatedData.ipAddress || '',
        location: {
          city: updatedData.location?.city || '',
          country: updatedData.location?.country || '',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
          coordinates: (updatedData.location?.latitude != null && updatedData.location?.longitude != null)
            ? { lat: updatedData.location.latitude, lng: updatedData.location.longitude }
            : undefined,
        },
        group: group || 'diaspora' as const,
      };

      // Submit registration using the service
      await registrationService.submitRegistration(payload);
      
      setSubmitStatus('success');
      // Don't reset form data immediately - let user see success and click WhatsApp link
      // setFormData({
      //   name: '',
      //   email: '',
      //   whatsapp: '',
      //   countryOfOrigin: '',
      //   countryOfResidence: '',
      //   timestamp: new Date().toISOString(),
      //   userAgent: navigator.userAgent
      // });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${showHeader ? 'min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8' : 'py-8 px-4 sm:px-6 lg:px-8'}`}>
      <div className="max-w-2xl mx-auto">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={safeAnimate({ opacity: 1, y: 0 })}
            transition={safeTransition({ duration: 0.6 })}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full mr-3">
                <Share2 className="h-8 w-8 text-primary" />
              </div>
              <div className="p-3 bg-secondary/10 rounded-full mr-3">
                <Users className="h-7 w-7 text-secondary" />
              </div>
              <div className="p-3 bg-accent/10 rounded-full">
                <Globe className="h-7 w-7 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join Our Global Community
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow diaspora members, stay updated on our initiatives, and be part of our growing network across social media platforms.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={safeAnimate({ opacity: 1, y: 0 })}
          transition={safeTransition({ duration: 0.6, delay: 0.2 })}
        >
          <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold text-foreground">
                {formTitle || 'Social Media Registration'}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {description || 'Fill out the form below to join our social media platforms and stay connected'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="h-12 border-border/50 focus:border-primary focus:ring-primary/20"
                    disabled={submitStatus === 'success'}
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="h-12 border-border/50 focus:border-primary focus:ring-primary/20"
                    disabled={submitStatus === 'success'}
                  />
                </div>

                {/* WhatsApp Field */}
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
                    WhatsApp Number *
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="Enter your WhatsApp number (with country code)"
                    required
                    className="h-12 border-border/50 focus:border-primary focus:ring-primary/20"
                    disabled={submitStatus === 'success'}
                  />
                </div>

                {/* Country of Origin */}
                <div className="space-y-2">
                  <Label htmlFor="countryOfOrigin" className="text-sm font-medium text-foreground">
                    Country of Origin *
                  </Label>
                  <Select
                    value={formData.countryOfOrigin}
                    onValueChange={(value) => handleInputChange('countryOfOrigin', value)}
                    required
                    disabled={submitStatus === 'success'}
                  >
                    <SelectTrigger className="h-12 border-border/50 focus:border-primary focus:ring-primary/20">
                      <SelectValue placeholder="Select your country of origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {(countriesOverride || countries).map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Country of Residence */}
                <div className="space-y-2">
                  <Label htmlFor="countryOfResidence" className="text-sm font-medium text-foreground">
                    Country of Residence *
                  </Label>
                  <Select
                    value={formData.countryOfResidence}
                    onValueChange={(value) => handleInputChange('countryOfResidence', value)}
                    required
                    disabled={submitStatus === 'success'}
                  >
                    <SelectTrigger className="h-12 border-border/50 focus:border-primary focus:ring-primary/20">
                      <SelectValue placeholder="Select your current country of residence" />
                    </SelectTrigger>
                    <SelectContent>
                      {(countriesOverride || countries).map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location is collected silently and surfaced in the admin dashboard only */}

                {/* Submit Button */}
                                  <Button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {(() => {
                          const messages = [
                            "Registering...",
                            "Processing...",
                            "Adding you to our community...",
                            "Setting up your account...",
                            "Connecting you..."
                          ];
                          return messages[Math.floor(Math.random() * messages.length)];
                        })()}
                      </>
                    ) : (
                      <>
                        <Share2 className="mr-2 h-4 w-4" />
                        {(() => {
                          const messages = [
                            "Join Our Community",
                            "Register Now",
                            "Sign Up",
                            "Get Connected",
                            "Join the Network"
                          ];
                          return messages[Math.floor(Math.random() * messages.length)];
                        })()}
                      </>
                    )}
                  </Button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="space-y-4">
                    <Alert className="border-green-200 bg-green-50 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        {(() => {
                          const messages = [
                            "🎉 Registration successful!",
                            "✅ You're all set!",
                            "🌟 Welcome aboard!",
                            "🚀 Success!",
                          ];
                          return messages[Math.floor(Math.random() * messages.length)];
                        })()}
                      </AlertDescription>
                    </Alert>
                    {successCtaUrl && (
                      <a 
                        href={successCtaUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block"
                        onClick={(e) => {
                          console.log('WhatsApp link clicked:', successCtaUrl);
                          // Ensure the link opens in a new tab
                          window.open(successCtaUrl, '_blank', 'noopener,noreferrer');
                          e.preventDefault();
                        }}
                      >
                        <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white">
                          {successCtaLabel || 'Join WhatsApp Group'}
                        </Button>
                      </a>
                    )}
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          name: '',
                          email: '',
                          whatsapp: '',
                          countryOfOrigin: '',
                          countryOfResidence: '',
                          timestamp: new Date().toISOString(),
                          userAgent: navigator.userAgent
                        });
                        setSubmitStatus('idle');
                      }}
                      className="w-full h-12"
                    >
                      Submit Another Registration
                    </Button>
                  </div>
                )}

                                  {submitStatus === 'error' && (
                    <Alert className="border-red-200 bg-red-50 text-red-800">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errorMessage || (() => {
                          const messages = [
                            "Oops! Something went wrong. Please try again.",
                            "Registration failed. Please check your details and try again.",
                            "We couldn't process your registration. Please try again.",
                            "Something went wrong on our end. Please try again.",
                            "Registration error. Please refresh and try again."
                          ];
                          return messages[Math.floor(Math.random() * messages.length)];
                        })()}
                      </AlertDescription>
                    </Alert>
                  )}
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={safeAnimate({ opacity: 1, y: 0 })}
          transition={safeTransition({ duration: 0.6, delay: 0.4 })}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground mb-4">Follow us on social media</p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://x.com/ispora_"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-full transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61578588581183"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-full transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/ispora/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-full transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ispora_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-full transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
