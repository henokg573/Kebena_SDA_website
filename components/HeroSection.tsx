import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { heroSlides } from '../constants/landingPageData';
import { ChevronLeft, ChevronRight, BookOpen, UserPlus } from 'lucide-react';

interface HeroSectionProps {
  currentUser: any;
  setCurrentView: (view: string) => void;
}

export function HeroSection({ currentUser, setCurrentView }: HeroSectionProps) {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section id="home" className="relative h-[650px] bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        <div className="w-full h-full bg-gradient-to-r from-black/80 to-black/40">
          <ImageWithFallback
            src={currentSlideData.image}
            alt="Church"
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
          />
        </div>
      </div>

      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              {currentSlideData.title[language]}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
              {currentSlideData.subtitle[language]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-medium border-0 shadow-lg btn-hover-effect"
                onClick={() => !currentUser && setCurrentView('signup')}
              >
                {currentSlideData.buttonText[language]}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-black hover:text-white px-8 py-3 text-lg font-medium btn-hover-effect"
                onClick={() => document.getElementById('bible')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                {language === 'am' ? 'Read Bible' : 'Read Bible'}
              </Button>
            </div>
          </div>
        </div>

        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 transition-colors p-2 rounded-full bg-black/30 hover:bg-black/50"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 transition-colors p-2 rounded-full bg-black/30 hover:bg-black/50"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-blue-500 scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
}