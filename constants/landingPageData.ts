export const heroSlides = [
  {
    image: "/constants/kebena_church.jpg",
    title: {
      am: "እንኳን ወደ ቀበና ሰባተኛ ቀን አድቬንቲስት ቤተ ክርስቲያን በደህና መጡ",
      en: "Welcome to Kebena SDA Church",
    },
    subtitle: {
      am: "የእግዚአብሔርን ፍቅር እና እውነት በማህበረሰብ ውስጥ እያካፈልን፣ በክርስቶስ ውስጥ እያደግን ነው",
      en: "Growing in Christ together, sharing God's love and truth in our community",
    },
    buttonText: {
      am: "Visit Our Church",
      en: "Visit Our Church",
    },
  },
  {
    image:
      "/constants/jesus_walking.jpg",
    title: {
      am: "በእምነት እና በጸሎት አንድ ሆነን",
      en: "United in Faith and Prayer",
    },
    subtitle: {
      am: "እያንዳንዱ ቅዳሜ በጋራ እንሰበሰባለን፣ እግዚአብሔርን እናመሰግናለን እና ቃሉን እንማራለን",
      en: "Every Sabbath we gather together to worship God and learn from His Word",
    },
    buttonText: {
      am: "View Worship Times",
      en: "View Worship Times",
    },
  },
  {
    image:
      "/constants/open_bible.jpg",
    title: {
      am: "የማህበረሰብ ወንድማማችነት",
      en: "Community Fellowship",
    },
    subtitle: {
      am: "በእግዚአብሔር ቤት ውስጥ አንድ ቤተሰብ እንሆናለን፣ እርስ በእርሳችን እንደግፋለን እና አንድ ላይ እናድጋለን",
      en: "We are one family in God's house, supporting each other and growing together",
    },
    buttonText: {
      am: "Join Us",
      en: "Join Us",
    },
  },
];

export const announcements = [
  {
    id: 1,
    image: "/constants/sintayew.png",
    title: {
      am: "አዲስ የመጽሐፍ ቅዱስ ጥናት ክፍል",
      en: "New Bible Study Class"
    },
    date: "ሰኔ 15 - 2024"
  },
  {
    id: 2,
    image: "/constants/prayer_program.png",
    title: {
      am: "የወጣቶች ሳምንት ዝግጅት",
      en: "Youth Week Program"
    },
    date: "ሰኔ 22 - 2024"
  },
  {
    id: 3,
    image: "/constants/special_program.png",
    title: {
      am: "የማህበረሰብ አገልግሎት ቀን",
      en: "Community Service Day"
    },
    date: "ሰኔ 29 - 2024"
  },
  {
    id: 4,
    image: "/constants/temesgen.png",
    title: {
      am: "የህፃናት እና ቤተሰቦች ቀን",
      en: "Children & Families Day"
    },
    date: "ሐምሌ 6 - 2024"
  }
];

export const dailyDevotions = [
  {
    id: 1,
    title: {
      am: "የእግዚአብሔር ፍቅር",
      en: "God's Love"
    },
    verse: {
      am: "ዮሐንስ 3፡16 - እስመ ከመዝ አፍቀሮ አምላክ ለዓለም እስከ ወሀበ ወልዶ ኅዱና...",
      en: "John 3:16 - For God so loved the world that he gave his one and only Son..."
    },
    content: {
      am: "የእግዚአብሔር ፍቅር ለሰው ልጅ ላለምግርምሺት የሚገለጠው በኢየሱስ ክርስቶስ መስዋዕትነት ነው።",
      en: "God's love for humanity is most clearly revealed through the sacrifice of Jesus Christ."
    },
    date: new Date().toLocaleDateString()
  },
  {
    id: 2,
    title: {
      am: "እምነት እና ተስፋ",
      en: "Faith and Hope"
    },
    verse: {
      am: "ዕብራይስጥ 11፡1 - እምነት ሶበ ተስፋ ዘሎቱ እምወገነ እንዘ አይወጽእ።",
      en: "Hebrews 11:1 - Faith is confidence in what we hope for and assurance about what we do not see."
    },
    content: {
      am: "እምነት የቀደመ ነገር አይደለም፤ ዛሬ ልናገኘው የምንፈልገው ነው።",
      en: "Faith is not something of the past, but what we need to access today."
    },
    date: new Date(Date.now() - 86400000).toLocaleDateString()
  }
];

export const quickBibleVerses = [
  {
    id: 1,
    reference: {
      am: "መዝሙር 23፡1",
      en: "Psalm 23:1"
    },
    text: {
      am: "እግዚአብሔር መዊተ ዘአይጌድፈኒ።",
      en: "The Lord is my shepherd, I lack nothing."
    }
  },
  {
    id: 2,
    reference: {
      am: "ኢሳይያስ 40፡31",
      en: "Isaiah 40:31"
    },
    text: {
      am: "ወእለ ተወከሉ ለእግዚአብሔር ይትነሥኡ ኃይሎሙ፤",
      en: "But those who hope in the Lord will renew their strength."
    }
  },
  {
    id: 3,
    reference: {
      am: "ፊልጵስዩስ 4፡13",
      en: "Philippians 4:13"
    },
    text: {
      am: "ኵሎ እክል በእንተ ዘየኃይለኒ ክርስቶስ።",
      en: "I can do all things through Christ who strengthens me."
    }
  }
];

export const featuredPodcasts = [
  {
    id: 1,
    title: {
      am: "የእምነት ግንዛቤ",
      en: "Understanding Faith"
    },
    author: {
      am: "ፓስተር ዳንኤል",
      en: "Pastor Daniel"
    },
    duration: "45:30",
    description: {
      am: "እምነት ምን እንደሆነና እንዴት ማጠናከር እንደሚቻል ስለ እምነት ሙሉ Learning።",
      en: "A comprehensive teaching on what faith is and how we can strengthen it."
    },
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: {
      am: "የአምልኮ ዝማሬዎች",
      en: "Worship Songs"
    },
    author: {
      am: "ቀበና ዝማሬ ቡድን",
      en: "Kebena Worship Team"
    },
    duration: "38:15",
    description: {
      am: "የአምልኮ ጊዜ ዝማሬዎችና መዝሙሮች።",
      en: "Collection of worship songs and hymns."
    },
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: {
      am: "የቅዳሜ Learning",
      en: "Sabbath School"
    },
    author: {
      am: "መምህር አብርሃም",
      en: "Teacher Abraham"
    },
    duration: "52:20",
    description: {
      am: "ዕለታዊ የቅዳሜ Learning ክፍል ውይይት።",
      en: "Daily Sabbath school lesson discussion."
    },
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

export const sabbathLessonsPreview = [
  {
    id: 1,
    title: {
      am: "በኢየሱስ ውስጥ ያለው ሕይወት",
      en: "Life in Jesus"
    },
    week: 1,
    quarter: "2025-Q1",
    memoryVerse: {
      am: "ዮሐንስ 10፡10",
      en: "John 10:10"
    }
  },
  {
    id: 2,
    title: {
      am: "የክርስቶስ ፍቅር",
      en: "The Love of Christ"
    },
    week: 2,
    quarter: "2025-Q1",
    memoryVerse: {
      am: "1 ዮሐንስ 4፡19",
      en: "1 John 4:19"
    }
  }
];

export const worshipSchedule = [
  {
    title: {
      am: "ቅዳሜ Learning ቤት",
      en: "Sabbath School"
    },
    time: "9:30 AM - 10:45 AM",
    description: {
      am: "በየቅዳሜው ጠዋት",
      en: "Every Saturday Morning"
    }
  },
  {
    title: {
      am: "ዋና አምልኮ",
      en: "Divine Worship"
    },
    time: "11:00 AM - 12:30 PM",
    description: {
      am: "በየቅዳሜው",
      en: "Every Saturday"
    }
  },
  {
    title: {
      am: "የጸሎት ስብሰባ",
      en: "Prayer Meeting"
    },
    time: "7:00 PM - 8:00 PM",
    description: {
      am: "በየረቡዕ ምሽት",
      en: "Every Wednesday Evening"
    }
  }
];