import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { worshipSchedule } from '../constants/landingPageData';

export function WorshipScheduleSection() {
  const { language } = useLanguage();

  return (
    <section id="services" className="py-16 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === 'am' ? 'የአምልኮ ጊዜ ሰሌዳ' : 'Worship Schedule'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {worshipSchedule.map((service, index) => (
            <div key={index} className="bg-blue-800 rounded-lg p-6 text-center hover:bg-blue-700 transition-colors">
              <h3 className="text-2xl font-bold mb-4">
                {service.title[language]}
              </h3>
              <p className="text-lg mb-2">{service.time}</p>
              <p className="text-blue-200">
                {service.description[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}