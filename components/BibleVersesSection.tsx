import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { quickBibleVerses } from '../constants/landingPageData';
import { BookOpen, Share2, Heart, Globe } from 'lucide-react';

interface BibleVersesSectionProps {
  currentUser: any;
  setCurrentView: (view: string) => void;
}

export function BibleVersesSection({ currentUser, setCurrentView }: BibleVersesSectionProps) {
  const { language } = useLanguage();

  return (
    <section id="bible" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            {language === 'am' ? 'የእለቱ የመጽሐፍ ቅዱስ ቃላት' : 'Bible Verses of the Day'}
          </h2>
          <p className="text-gray-600">
            {language === 'am' 
              ? 'ሰላምና ኃይል የሚሰጡ የመጽሐፍ ቅዱስ ቃላት' 
              : 'Inspiring Bible verses for peace and strength'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickBibleVerses.map((verse) => (
            <Card key={verse.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-3">
                    {verse.reference[language]}
                  </Badge>
                  <p className="italic text-gray-700 mb-4">
                    "{verse.text[language]}"
                  </p>
                  <div className="flex justify-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <BookOpen className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="space-x-4">
            <Button 
              size="lg"
              onClick={() => currentUser ? setCurrentView('user-dashboard') : setCurrentView('signup')}
              className="bg-blue-600 hover:bg-blue-700 btn-hover-effect"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              {language === 'am' ? 'Read Bible' : 'Read Full Bible'}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.open('https://www.wordproject.org/bibles/am/', '_blank')}
              className="btn-hover-effect"
            >
              <Globe className="w-5 h-5 mr-2" />
              {language === 'am' ? 'External Source' : 'External Source'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}