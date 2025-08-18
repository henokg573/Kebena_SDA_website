import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { dailyDevotions } from '../constants/landingPageData';
import { Heart, Share2 } from 'lucide-react';

interface DevotionalSectionProps {
  currentUser: any;
  setCurrentView: (view: string) => void;
}

export function DevotionalSection({ currentUser, setCurrentView }: DevotionalSectionProps) {
  const { language } = useLanguage();
  const [currentDevotion, setCurrentDevotion] = useState(0);

  useEffect(() => {
    const devotionInterval = setInterval(() => {
      setCurrentDevotion((prev) => (prev + 1) % dailyDevotions.length);
    }, 10000);
    return () => clearInterval(devotionInterval);
  }, []);

  const currentDevotionData = dailyDevotions[currentDevotion];

  return (
    <section id="devotional" className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            {language === 'am' ? 'ዕለታዊ መንፈሳዊ ጸሎት/ንባብ' : 'Daily Devotional'}
          </h2>
          <p className="text-gray-600">
            {language === 'am' 
              ? 'በየቀኑ የእግዚአብሔርን ቃል በማንበብ መንፈሳዊ እድገት ያድርጉ' 
              : 'Grow spiritually by reading God\'s word daily'
            }
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-900">
                {currentDevotionData.title[language]}
              </CardTitle>
              <p className="text-gray-600">{currentDevotionData.date}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-4 bg-blue-100 rounded-lg">
                <p className="italic text-blue-800 font-medium">
                  {currentDevotionData.verse[language]}
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed text-center">
                {currentDevotionData.content[language]}
              </p>
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentDevotion((prev) => (prev + 1) % dailyDevotions.length)}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {language === 'am' ? 'ቀጣይ' : 'Next'}
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  {language === 'am' ? 'አጋራ' : 'Share'}
                </Button>
                {!currentUser && (
                  <Button 
                    onClick={() => setCurrentView('signup')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {language === 'am' ? 'ተመዝግበው ተጨማሪ ያንብቡ' : 'Sign up for more'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}