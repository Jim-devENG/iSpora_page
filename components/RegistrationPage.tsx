import React from 'react';
import { SocialMediaRegistrationForm } from './SocialMediaRegistrationForm';

interface RegistrationPageProps {
  onPageChange: (page: string) => void;
}

export function RegistrationPage({ onPageChange }: RegistrationPageProps) {
  const africanCountries = [
    { code: 'NG', name: 'Nigeria' },
    { code: 'GH', name: 'Ghana' },
    { code: 'KE', name: 'Kenya' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'UG', name: 'Uganda' },
    { code: 'TZ', name: 'Tanzania' },
    { code: 'RW', name: 'Rwanda' },
    { code: 'ET', name: 'Ethiopia' },
    { code: 'ZM', name: 'Zambia' },
    { code: 'ZW', name: 'Zimbabwe' },
    { code: 'BW', name: 'Botswana' },
    { code: 'NA', name: 'Namibia' },
    { code: 'CI', name: 'Côte d’Ivoire' },
    { code: 'SN', name: 'Senegal' },
    { code: 'CM', name: 'Cameroon' },
    { code: 'ML', name: 'Mali' },
    { code: 'GM', name: 'Gambia' },
    { code: 'SL', name: 'Sierra Leone' },
    { code: 'LR', name: 'Liberia' },
    { code: 'BJ', name: 'Benin' },
    { code: 'TG', name: 'Togo' },
    { code: 'MW', name: 'Malawi' },
    { code: 'MZ', name: 'Mozambique' },
    { code: 'AO', name: 'Angola' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'MA', name: 'Morocco' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'EG', name: 'Egypt' },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const diasporaCountries = [
    // Key diaspora hubs across continents
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'SE', name: 'Sweden' },
    { code: 'NO', name: 'Norway' },
    { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' },
    { code: 'IE', name: 'Ireland' },
    { code: 'ES', name: 'Spain' },
    { code: 'PT', name: 'Portugal' },
    { code: 'IT', name: 'Italy' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'BE', name: 'Belgium' },
    { code: 'AT', name: 'Austria' },
    { code: 'AU', name: 'Australia' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'QA', name: 'Qatar' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'CN', name: 'China' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'SG', name: 'Singapore' },
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <SocialMediaRegistrationForm
            showHeader={false}
            formTitle="iSpora Local"
            description="Join our local community chapter. Fill the form and then join the WhatsApp group to connect with people near you."
            successCtaUrl="https://chat.whatsapp.com/I9utNeip977H5k8oGW5KCy?mode=ems_copy_c"
            successCtaLabel="Join iSpora Local WhatsApp Group"
            group="local"
            countriesOverride={africanCountries}
          />
          <SocialMediaRegistrationForm
            showHeader={false}
            formTitle="iSpora Diaspora"
            description="Join our global diaspora network. Fill the form and then join the WhatsApp group to connect globally."
            successCtaUrl="https://chat.whatsapp.com/CVWXWSeSfuKFj5UFmj6ESL?mode=ems_copy_c"
            successCtaLabel="Join iSpora Diaspora WhatsApp Group"
            group="diaspora"
            countriesOverride={diasporaCountries}
          />
        </div>
      </main>
    </div>
  );
}
