import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'am';
  setLanguage: (lang: 'en' | 'am') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    miracles: "Miracles",
    people: "People",
    login: "Login",

    // Hero Section
    heroTitle: "Experience God's Amazing Grace",
    heroSubtitle:
      "Join our vibrant community where faith comes alive and hearts are transformed through divine love and fellowship.",
    joinUs: "Join Us",
    watchOnline: "Watch Online",

    // Service Times
    sundayServices: "Sunday Services",
    serviceTime1: "9:00 AM",
    serviceTime2: "11:00 AM",
    community: "Community",
    growingTogether: "Growing Together",
    lifeGroups: "Life Groups",
    everyWednesday: "Every Wednesday",

    // Publications
    publications: "Publications",

    // About Section
    aboutChurch: "About Kebena SDA Church",
    aboutDescription:
      "For decades, Kebena SDA Church has been a beacon of hope and spiritual growth in our community. We are committed to sharing God's love and helping people discover their purpose through faith, fellowship, and service.",
    readMore: "Read More",

    // Church Info
    churchInfoTitle: "Our Church Community",
    churchInfoDescription:
      "Experience worship in our beautiful sanctuary where hundreds gather each week to praise God, learn from His Word, and fellowship together as one family in Christ.",

    // Books Section
    booksTitle: "Spiritual Resources",
    buyNow: "Buy Now",

    // Social Links
    socialTitle: "Connect With Us",

    // Footer
    footerText:
      "© 2025 Kebena Seventh Day Adventist Church. All rights reserved.",

    // Contact
    address: "123 Church Street, Addis Ababa, Ethiopia",
    phone: "+251-11-xxx-xxxx",
    email: "info@kebenasda.org",
  },
  am: {
    // Navigation
    home: "Home",
    about: "ስለ እኛ",
    miracles: "ተአምራት",
    people: "ሰዎች",
    login: "ግባ",

    // Hero Section
    heroTitle: "የእግዚአብሔርን ድንቅ ጸጋ ለመስ",
    heroSubtitle:
      "እምነት የሚተርፍበት እና ልብ በመለኮታዊ ፍቅር እና ብርተት የሚለወጥበት ወቅቻ ማህበረሰብ ተቀላቀሉን።",
    joinUs: "ተቀላቀሉን",
    watchOnline: "በመስመር ይመልከቱ",

    // Service Times
    sundayServices: "የእሁድ አገልግሎት",
    serviceTime1: "9:00 ሰ.ሰ",
    serviceTime2: "11:00 ሰ.ሰ",
    community: "ማህበረሰብ",
    growingTogether: "በጋራ እያደግን",
    lifeGroups: "የህይወት ቡድኖች",
    everyWednesday: "በየረቡዕ",

    // Publications
    publications: "ህትመቶች",

    // About Section
    aboutChurch: "ስለ ቀበና ሰባተኛ ቀን አድቬንቲስት ቤተ ክርስቲያን",
    aboutDescription:
      "ቀበና ሰባተኛ ቀን አድቬንቲስት ቤተ ክርስቲያን ለዓመታት በማህበረሰባችን ውስጥ የተስፋ እና የመንፈሳዊ እድገት ብርሃን ሆኖ ቆይቷል። የእግዚአብሔርን ፍቅር ለማካፈል እና ሰዎች በእምነት፣ በወንድማማችነት እና በአገልግሎት ዓላማቸውን እንዲያገኙ ለመርዳት ቁርጠኛ ነን።",
    readMore: "ተጨማሪ ያንብቡ",

    // Church Info
    churchInfoTitle: "የእኛ የቤተክርስቲያን ማህበረሰብ",
    churchInfoDescription:
      "በእኛ ውብ መቅደስ ውስጥ መቶዎች በየሳምንቱ እግዚአብሔርን ለማመስገን፣ ከቃሉ ለመማር እና በክርስቶስ ውስጥ እንደ አንድ ቤተሰብ ለመተዋወቅ የሚሰበሰቡበት አምልኮ ይለማመዱ።",

    // Books Section
    booksTitle: "መንፈሳዊ ምንጮች",
    buyNow: "አሁን ይግዙ",

    // Social Links
    socialTitle: "ከእኛ ጋር ተገናኙ",

    // Footer
    footerText:
      "© 2025 Kebena Seventh Day Adventist Church. All Rights Reserved",

    // Contact
    address: "123 ቤተክርስቲያን ጎዳና፣ አዲስ አበባ፣ ኢትዮጵያ",
    phone: "+251-11-xxx-xxxx",
    email: "info@kebenasda.org",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'am'>('am');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}