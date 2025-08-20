import React from 'react';
import { SocialMediaRegistrationForm } from './SocialMediaRegistrationForm';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

interface RegistrationPageProps {
  onPageChange: (page: string) => void;
}

export function RegistrationPage({ onPageChange }: RegistrationPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="register" onPageChange={onPageChange} />
      <main className="flex-1">
        <SocialMediaRegistrationForm showHeader={false} />
      </main>
      <Footer onPageChange={onPageChange} />
    </div>
  );
}
