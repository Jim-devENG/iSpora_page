import React from 'react';
import { SocialMediaRegistrationForm } from './SocialMediaRegistrationForm';

interface RegistrationPageProps {
  onPageChange: (page: string) => void;
}

export function RegistrationPage({ onPageChange }: RegistrationPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <SocialMediaRegistrationForm showHeader={false} />
      </main>
    </div>
  );
}
