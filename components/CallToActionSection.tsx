import React from 'react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { UserPlus, MessageCircle } from 'lucide-react';

interface CallToActionSectionProps {
  setCurrentView: (view: string) => void;
}

export function CallToActionSection({ setCurrentView }: CallToActionSectionProps) {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">
          {language === 'am' 
            ? 'Join Our Community' 
            : 'Join Our Community'
          }
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          {language === 'am' 
            ? 'በመጽሐፍ ቅዱስ ጥናት፣ ጸሎት እና የወንድማማች አጋርነት የእምነት ጉዞዎን ይቀጥሉ' 
            : 'Continue your faith journey with Bible study, prayer, and fellowship'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => setCurrentView('signup')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg btn-hover-effect"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            {language === 'am' ? 'Join Us Today' : 'Sign Up Today'}
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg btn-hover-effect"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {language === 'am' ? 'Contact' : 'Contact Us'}
          </Button>
        </div>
      </div>
    </section>
  );
}