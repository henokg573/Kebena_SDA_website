import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { featuredPodcasts } from '../constants/landingPageData';
import { 
  Volume2, Play, Pause, Share2, Download, Clock, Users, Headphones
} from 'lucide-react';

interface MediaSectionProps {
  currentUser: any;
  setCurrentView: (view: string) => void;
  playingAudio: string | null;
  handlePlayAudio: (podcastId: string) => void;
}

export function MediaSection({ 
  currentUser, 
  setCurrentView, 
  playingAudio, 
  handlePlayAudio 
}: MediaSectionProps) {
  const { language } = useLanguage();

  return (
    <section id="media" className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'am' ? 'ፖድካስቶች፣ ስብከቶች እና ዝማሬዎች' : 'Podcasts & Music'}
          </h2>
          <p className="text-gray-300">
            {language === 'am' 
              ? 'መንፈሳዊ ፖድካስቶች፣ ስብከቶችና የአምልኮ ዝማሬዎች ያዳምጡ' 
              : 'Listen to spiritual podcasts, sermons and worship songs'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPodcasts.map((podcast) => (
            <Card key={podcast.id} className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors">
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={podcast.thumbnail}
                    alt={podcast.title[language]}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      size="lg"
                      className="rounded-full bg-white/20 hover:bg-white/30"
                      onClick={() => handlePlayAudio(podcast.id)}
                    >
                      {playingAudio === podcast.id ? 
                        <Pause className="w-8 h-8 text-white" /> : 
                        <Play className="w-8 h-8 text-white" />
                      }
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white line-clamp-2">
                      {podcast.title[language]}
                    </h3>
                    <Badge variant="secondary" className="ml-2">
                      <Clock className="w-3 h-3 mr-1" />
                      {podcast.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {podcast.author[language]}
                  </p>
                  <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                    {podcast.description[language]}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handlePlayAudio(podcast.id)}
                        className="text-gray-300 hover:text-white"
                      >
                        {playingAudio === podcast.id ? 
                          <Pause className="w-4 h-4" /> : 
                          <Play className="w-4 h-4" />
                        }
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Users className="w-3 h-3 mr-1" />
                      {Math.floor(Math.random() * 500) + 100}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="space-x-4">
            <Button 
              size="lg"
              onClick={() => currentUser ? setCurrentView('user-dashboard') : setCurrentView('signup')}
              className="bg-purple-600 hover:bg-purple-700 btn-hover-effect"
            >
              <Headphones className="w-5 h-5 mr-2" />
              {language === 'am' ? 'ተጨማሪ ያዳምጡ' : 'Listen to More'}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 btn-hover-effect">
              <Volume2 className="w-5 h-5 mr-2" />
              {language === 'am' ? 'የሙዚቃ ዝርዝር' : 'Music Playlist'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}