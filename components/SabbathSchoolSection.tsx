import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { sabbathLessonsPreview } from '../constants/landingPageData';
import { Calendar, BookOpen, Download, Share2, Globe } from 'lucide-react';

interface SabbathSchoolSectionProps {
  currentUser: any;
  setCurrentView: (view: string) => void;
}

export function SabbathSchoolSection({ currentUser, setCurrentView }: SabbathSchoolSectionProps) {
  const { language } = useLanguage();

  return (
    <section id="sabbath" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            {language === 'am' ? 'የሰንበት Learning ቤት' : 'Sabbath School'}
          </h2>
          <p className="text-gray-600">
            {language === 'am' 
              ? 'ሳምንታዊ የመጽሐፍ ቅዱስ ጥናት እና ትምህርቶች' 
              : 'Weekly Bible study lessons and discussions'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {sabbathLessonsPreview.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {lesson.title[language]}
                  </CardTitle>
                  <Badge variant="outline">
                    Week {lesson.week}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{lesson.quarter}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      {language === 'am' ? 'የማስታወሻ ቃል:' : 'Memory Verse:'}
                    </p>
                    <p className="text-sm text-blue-800">
                      {lesson.memoryVerse[language]}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {language === 'am' ? 'አንብብ' : 'Read'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      {language === 'am' ? 'አውርድ' : 'Download'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4 mr-1" />
                      {language === 'am' ? 'አጋራ' : 'Share'}
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
              className="bg-green-600 hover:bg-green-700 btn-hover-effect"
            >
              <Calendar className="w-5 h-5 mr-2" />
              {language === 'am' ? 'ሁሉንም ትምህርቶች ይመልከቱ' : 'View All Lessons'}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.open('https://sabbath-school.adventech.io/en/2025-03', '_blank')}
              className="btn-hover-effect"
            >
              <Globe className="w-5 h-5 mr-2" />
              {language === 'am' ? 'አድቬንቴክ' : 'Adventech'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}