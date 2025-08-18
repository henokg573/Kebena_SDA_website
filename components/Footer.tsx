import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import newLogo from "../constants/logo.png";

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer id="contact" className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
             {/* Logo */}
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={newLogo}
                            alt="Kebena SDA Church Logo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h1 className="font-bold text-lg">Kebena SDA Church</h1>
                          <p className="text-xs text-gray-300">
                            {language === "am" ? "ቀበና ሰባተኛ ቀን አድቬንቲስት ቤተ ክርስቲያን" : "Seventh-day Adventist"}
                          </p>
                        </div>
                      </div>
            <p className="text-gray-400 text-sm">
              {language === 'am' 
                ? 'በክርስቶስ ውስጥ እያደግን፣ ፍቅርን እና እውነትን እናካፍላለን።' 
                : 'Growing in Christ, sharing love and truth.'
              }
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'am' ? 'ፈጣን አገናኞች' : 'Quick Links'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">
                {language === 'am' ? 'Home' : 'Home'}
              </a></li>
              <li><a href="#bible" className="text-gray-400 hover:text-white transition-colors">
                {language === 'am' ? 'መጽሐፍ ቅዱስ' : 'Bible'}
              </a></li>
              <li><a href="#sabbath" className="text-gray-400 hover:text-white transition-colors">
                {language === 'am' ? 'Sabbath School' : 'Sabbath School'}
              </a></li>
              <li><a href="#media" className="text-gray-400 hover:text-white transition-colors">
                {language === 'am' ? 'Media' : 'Media'}
              </a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'am' ? 'አገልግሎቶች' : 'Services'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{language === 'am' ? 'ቅዳሜ Learning ቤት - 9:30 AM' : 'Sabbath School - 9:30 AM'}</li>
              <li>{language === 'am' ? 'ዋና አምልኮ - 11:00 AM' : 'Divine Worship - 11:00 AM'}</li>
              <li>{language === 'am' ? 'የጸሎት ስብሰባ - 7:00 PM' : 'Prayer Meeting - 7:00 PM'}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'am' ? 'Contact' : 'Contact Us'}
            </h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Kebena, Addis Ababa, Ethiopia</p>
              <p>Phone: +251-11-XXX-XXXX</p>
              <p>Email: info@kebenasda.org</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025  Kebena SDA Church. {language === 'am' ? 'All Rights Reserved' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
}