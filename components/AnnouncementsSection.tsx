import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { announcements } from '../constants/landingPageData';

export function AnnouncementsSection() {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
          {language === 'am' ? 'ማስታወቂያዎች' : 'Announcements'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200">
                <ImageWithFallback
                  src={announcement.image}
                  alt={announcement.title[language]}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {announcement.title[language]}
                </h3>
                <p className="text-sm text-gray-600">
                  {announcement.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}