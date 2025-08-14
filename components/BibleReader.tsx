import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { 
  Book, 
  Bookmark, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Volume2,
  Share2,
  Copy,
  Heart,
  Calendar,
  Download,
  Eye,
  RefreshCw,
  Globe
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

interface BibleReaderProps {
  currentUser: any;
  bibleVerses: any[];
  sabbathLessons: any[];
  onBookmark?: (verse: any) => void;
}

// Ethiopian Bible books in multiple languages
const BIBLE_BOOKS = {
  amharic: [
    'ዘፍጥረት', 'ዘዳግም', 'ዘሌዋዉያን', 'ዘቍጽሪ', 'ዘአበሳ', 'ዘኢያሱ', 'ዘመሣፍንት', 'ሩት',
    '1 ሳሙኤል', '2 ሳሙኤል', '1 ነገሥት', '2 ነገሥት', '1 ዜና', '2 ዜና', 'ዕዝራ', 'ነህምያ',
    'አስቴር', 'ኢዮብ', 'መዝሙር', 'መጠቅዕት', 'መክብብ', 'ኵሉ መክብብ', 'ግኖተ ሰሎሞን', 'ኢሳይያስ',
    'ኤርምያስ', 'ሰቆቃው', 'ዕዝቅኤል', 'ዳንኤል', 'ሆሴዕ', 'ኢዩኤል', 'አሞስ', 'አብድዩ',
    'ዮናስ', 'ሚክያስ', 'ናሆም', 'ሐባቆቅ', 'ሶፎንያስ', 'ሐጌ', 'ዘካርያስ', 'ሚልክያስ',
    'ማቴዎስ', 'ማርቆስ', 'ሉቃስ', 'ዮሐንስ', 'ሐዋርያት', 'ሮሜ', '1 ቆርንጦስ', '2 ቆርንጦስ',
    'ገላትያ', 'ኤፌሶን', 'ፊልጵስዩስ', 'ቆላስያስ', '1 ተሰሎንቄ', '2 ተሰሎንቄ', '1 ጢሞቴዎስ', '2 ጢሞቴዎስ',
    'ጢቶ', 'ፊልሞን', 'ዕብራይስጥ', 'ያዕቆብ', '1 ጴጥሮስ', '2 ጴጥሮስ', '1 ዮሐንስ', '2 ዮሐንስ',
    '3 ዮሐንስ', 'ይሁዳ', 'ራዕይ'
  ],
  english: [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
    '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah',
    'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
    'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah',
    'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
    'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
    'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
    '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
    '1 John', '2 John', '3 John', 'Jude', 'Revelation'
  ],
  oromo: [
    'Uumama', 'Baasuu', 'Lewotaa', 'Lakkoofsota', 'Himoota', 'Iyyaasuu', 'Abbaamursituu', 'Ruut',
    '1 Saamuʼeel', '2 Saamuʼeel', '1 Mootota', '2 Mootota', '1 Seenaa', '2 Seenaa', 'Izraa', 'Nahimiyaa'
  ]
};

// Sample Bible content from the website structure
const SAMPLE_BIBLE_CONTENT = {
  amharic: [
    {
      id: '1',
      book: 'ዘፍጥረት',
      chapter: 1,
      verse: 1,
      text: 'ቀዳሚሁኒ ወጸጸ አምላክ ሰማየ ወምድረ።',
      language: 'amharic'
    },
    {
      id: '2',
      book: 'ዘፍጥረት',
      chapter: 1,
      verse: 2,
      text: 'ወምድራ እኂተ መስኃል ወጽርዕት ወጽልመት ላዕለ ገጽ ባሕር። ወመንፈሰ አምላክ ይወዳይ ላዕለ ገጽ ማያት።',
      language: 'amharic'
    },
    {
      id: '3',
      book: 'ዘፍጥረት',
      chapter: 1,
      verse: 3,
      text: 'ወይቤ አምላክ ለይኩን ብርሃን ወኮነ ብርሃን።',
      language: 'amharic'
    },
    {
      id: '4',
      book: 'ዮሐንስ',
      chapter: 3,
      verse: 16,
      text: 'እስመ ከመዝ አፍቀሮ አምላክ ለዓለም እስከ ወሀበ ወልዶ ኅዱና ከመ ኢይሁልቅ ዘአምኖ ቦቱ አላ ይርከብ ሕይወተ ዘለዓለም።',
      language: 'amharic'
    }
  ],
  english: [
    {
      id: '5',
      book: 'Genesis',
      chapter: 1,
      verse: 1,
      text: 'In the beginning God created the heaven and the earth.',
      language: 'english'
    },
    {
      id: '6',
      book: 'Genesis',
      chapter: 1,
      verse: 2,
      text: 'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.',
      language: 'english'
    },
    {
      id: '7',
      book: 'Genesis',
      chapter: 1,
      verse: 3,
      text: 'And God said, Let there be light: and there was light.',
      language: 'english'
    },
    {
      id: '8',
      book: 'John',
      chapter: 3,
      verse: 16,
      text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
      language: 'english'
    }
  ]
};

// Sample Sabbath School lessons based on Adventech API structure
const SAMPLE_SABBATH_LESSONS = [
  {
    id: 'ss-2025-01-01',
    title: {
      amharic: 'በኢየሱስ ውስጥ ያለው ህይወት',
      english: 'Life in Jesus'
    },
    quarter: '2025-Q1',
    week: 1,
    date: '2025-01-04',
    language: 'amharic',
    memoryVerse: 'ዮሐንስ 10፡10 - "ሰዋርያ መጣው እንጂ ለሰረቅ ወለገደል ወለኪድ። አንሰ መጣሁ ሕይወተ ይርከቡ ወብዙኀ ይርከቡ።"',
    content: {
      introduction: 'የኢየሱስ ክርስቶስ መምጣት ለሰው ልጆች አዲስ ህይወት አመጣ። ይህ Learning ስለ እርሱ የተሰጠን ሙሉ ህይወት ይመረምራል።',
      dailyLessons: [
        {
          day: 'ቅዳሜ',
          title: 'ሕይወት ሰጪው ኢየሱስ',
          content: 'ኢየሱስ "አንሰ ሕይወት ነኝ" ብሎ ራሱን ይገልጻል። ይህ ሕይወት አካላዊ ብቻ ሳይሆን መንፈሳዊ የዘላለም ህይወት ነው።',
          bibleReading: 'ዮሐንስ 14፡6',
          questions: [
            'ኢየሱስ እንዴት ሕይወት ነው?',
            'ይህ ሕይወት ከአለማዊው ህይወት እንዴት ይለያል?'
          ]
        },
        {
          day: 'እሁድ',
          title: 'ስለ ህይወት የተሰጠ ተስፋ',
          content: 'አምላክ ለእኛ የሰጠው ተስፋ የዘላለም ህይወት ነው። ይህም በኢየሱስ ክርስቶስ በኩል ነው።',
          bibleReading: '1 ዮሐንስ 5፡11-13',
          questions: [
            'የዘላለም ህይወት ምንድን ነው?',
            'እንዴት እርግጠኛ መሆን እንችላለን?'
          ]
        }
      ],
      discussion: [
        'በኢየሱስ ያለው ህይወት ከግል ህይወታችን ጋር እንዴት ይዛመዳል?',
        'ይህ Learning ሌሎችን እንዴት ይረዳናል?',
        'የዘላለም ህይወት ዛሬ እንዴት ይጀምራል?'
      ],
      application: 'ዛሬ በኢየሱስ ያለውን ሙሉ ህይወት መመንተትና በሌሎች ጋር መካፈል።'
    }
  },
  {
    id: 'ss-2025-01-02',
    title: {
      amharic: 'የክርስቶስ ፍቅር',
      english: 'The Love of Christ'
    },
    quarter: '2025-Q1',
    week: 2,
    date: '2025-01-11',
    language: 'english',
    memoryVerse: '1 John 4:19 - "We love him, because he first loved us."',
    content: {
      introduction: 'The love of Christ is the foundation of our faith and the motivation for our service.',
      dailyLessons: [
        {
          day: 'Sabbath',
          title: 'God\'s Love Revealed',
          content: 'God\'s love is demonstrated through the sacrifice of Jesus Christ on the cross.',
          bibleReading: 'Romans 5:8',
          questions: [
            'How does God demonstrate His love?',
            'What does this mean for our daily lives?'
          ]
        },
        {
          day: 'Sunday',
          title: 'Love in Action',
          content: 'True love is not just words but actions that demonstrate care and sacrifice.',
          bibleReading: '1 John 3:16-18',
          questions: [
            'How should we show love to others?',
            'What are practical ways to demonstrate love?'
          ]
        }
      ],
      discussion: [
        'How has Christ\'s love changed your perspective?',
        'What challenges do we face in loving unconditionally?',
        'How can the church better demonstrate God\'s love?'
      ],
      application: 'Practice intentional acts of love and kindness this week, reflecting Christ\'s love.'
    }
  }
];

export function BibleReader({ 
  currentUser, 
  bibleVerses, 
  sabbathLessons,
  onBookmark 
}: BibleReaderProps) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'bible' | 'sabbath' | 'devotional'>('bible');
  const [selectedLanguage, setSelectedLanguage] = useState<'amharic' | 'english' | 'oromo'>('amharic');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVerses, setCurrentVerses] = useState<any[]>([]);
  const [availableLessons, setAvailableLessons] = useState<any[]>(SAMPLE_SABBATH_LESSONS);

  const books = BIBLE_BOOKS[selectedLanguage] || BIBLE_BOOKS.english;
  
  // Enhanced Bible content management
  useEffect(() => {
    loadBibleContent();
  }, [selectedBook, selectedChapter, selectedLanguage]);

  useEffect(() => {
    loadSabbathLessons();
  }, [selectedLanguage]);

  const loadBibleContent = async () => {
    if (!selectedBook) return;
    
    setIsLoading(true);
    try {
      // Use sample data, but in production this would fetch from API
      const sampleContent = SAMPLE_BIBLE_CONTENT[selectedLanguage] || SAMPLE_BIBLE_CONTENT.english;
      const filteredVerses = sampleContent.filter(verse => 
        verse.book === selectedBook && verse.chapter === selectedChapter
      );
      
      // If no content found, generate some placeholder verses
      if (filteredVerses.length === 0) {
        const placeholderVerses = Array.from({ length: 10 }, (_, i) => ({
          id: `${selectedBook}-${selectedChapter}-${i + 1}`,
          book: selectedBook,
          chapter: selectedChapter,
          verse: i + 1,
          text: language === 'am' 
            ? `ይህ የ${selectedBook} ${selectedChapter}:${i + 1} ቁልፍ ጥሬ ቃል ነው። የእውነተኛው ጽሑፍ ይሁንታ በኋላ ይጭመራል።`
            : `This is ${selectedBook} ${selectedChapter}:${i + 1}. The actual verse content will be loaded from the Bible API.`,
          language: selectedLanguage
        }));
        setCurrentVerses(placeholderVerses);
      } else {
        setCurrentVerses(filteredVerses);
      }
    } catch (error) {
      console.error('Error loading Bible content:', error);
      toast.error(language === 'am' ? 'የመጽሐፍ ቅዱስ ይዘት መጫን አልተሳካም' : 'Failed to load Bible content');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSabbathLessons = async () => {
    try {
      // In production, this would fetch from the Adventech API
      const filteredLessons = SAMPLE_SABBATH_LESSONS.filter(lesson => 
        lesson.language === selectedLanguage || !lesson.language
      );
      setAvailableLessons(filteredLessons);
    } catch (error) {
      console.error('Error loading Sabbath school lessons:', error);
    }
  };

  // Get available chapters for selected book
  const availableChapters = currentVerses.length > 0 
    ? [...new Set(currentVerses.map(v => v.chapter))].sort((a, b) => a - b)
    : [1, 2, 3, 4, 5]; // Default chapters

  // Enhanced search functionality
  useEffect(() => {
    if (searchQuery.length > 2) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedLanguage]);

  const performSearch = async () => {
    setIsLoading(true);
    try {
      // Use sample data for search
      const allContent = SAMPLE_BIBLE_CONTENT[selectedLanguage] || SAMPLE_BIBLE_CONTENT.english;
      const results = allContent.filter(verse =>
        verse.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        verse.book.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.slice(0, 20));
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmarkVerse = (verse: any) => {
    if (!currentUser) {
      toast.error(language === 'am' ? 'እባክዎ ይግቡ' : 'Please login first');
      return;
    }

    const isBookmarked = bookmarks.some(b => b.id === verse.id);
    if (isBookmarked) {
      setBookmarks(bookmarks.filter(b => b.id !== verse.id));
      toast.success(language === 'am' ? 'መታሰቢያ ተወገደ' : 'Bookmark removed');
    } else {
      setBookmarks([...bookmarks, { ...verse, bookmarkedAt: new Date().toISOString() }]);
      toast.success(language === 'am' ? 'መታሰቢያ ተጨመረ' : 'Verse bookmarked');
      onBookmark?.(verse);
    }
  };

  const handleCopyVerse = (verse: any) => {
    const text = `"${verse.text}" - ${verse.book} ${verse.chapter}:${verse.verse}`;
    navigator.clipboard.writeText(text);
    toast.success(language === 'am' ? 'ቃል ተገለበጠ' : 'Verse copied');
  };

  const handleShareVerse = (verse: any) => {
    const text = `"${verse.text}" - ${verse.book} ${verse.chapter}:${verse.verse}`;
    if (navigator.share) {
      navigator.share({
        title: 'Bible Verse',
        text: text
      });
    } else {
      handleCopyVerse(verse);
    }
  };

  const loadExternalBibleContent = async () => {
    setIsLoading(true);
    try {
      // This would integrate with https://www.wordproject.org/bibles/am/ API
      toast.success(language === 'am' ? 'ከውጭ ምንጭ ይጭመራል...' : 'Loading from external source...');
      // Implementation would fetch from the API
    } catch (error) {
      toast.error(language === 'am' ? 'ከውጭ ምንጭ መጫን አልተሳካም' : 'Failed to load from external source');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAdventechLessons = async () => {
    setIsLoading(true);
    try {
      // This would integrate with https://sabbath-school.adventech.io/en/2025-03 API
      toast.success(language === 'am' ? 'ከአድቬንቴክ ይጭመራል...' : 'Loading from Adventech...');
      // Implementation would fetch from the Adventech API
    } catch (error) {
      toast.error(language === 'am' ? 'ከአድቬንቴክ መጫን አልተሳካም' : 'Failed to load from Adventech');
    } finally {
      setIsLoading(false);
    }
  };

  const renderVerse = (verse: any, showActions: boolean = true) => (
    <div key={verse.id} className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50 group">
      <Badge variant="outline" className="mt-1 text-xs min-w-8 shrink-0">
        {verse.verse}
      </Badge>
      <div className="flex-1">
        <p className="text-gray-700 leading-relaxed">{verse.text}</p>
      </div>
      {showActions && (
        <div className={`flex space-x-1 transition-opacity ${showActions ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleBookmarkVerse(verse)}
            className={bookmarks.some(b => b.id === verse.id) ? 'text-yellow-500' : ''}
          >
            <Bookmark className={`w-4 h-4 ${bookmarks.some(b => b.id === verse.id) ? 'fill-current' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCopyVerse(verse)}
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleShareVerse(verse)}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Enhanced Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <Button
          variant={activeTab === 'bible' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('bible')}
          className="flex-1"
        >
          <Book className="w-4 h-4 mr-2" />
          {language === 'am' ? 'መጽሐፍ ቅዱስ' : 'Bible'}
        </Button>
        <Button
          variant={activeTab === 'sabbath' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('sabbath')}
          className="flex-1"
        >
          <Calendar className="w-4 h-4 mr-2" />
          {language === 'am' ? 'Sabbath School' : 'Sabbath School'}
        </Button>
        <Button
          variant={activeTab === 'devotional' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('devotional')}
          className="flex-1"
        >
          <Heart className="w-4 h-4 mr-2" />
          {language === 'am' ? 'Devotional' : 'Devotional'}
        </Button>
      </div>

      {activeTab === 'bible' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Bible Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {language === 'am' ? 'ዳሰሳ' : 'Navigation'}
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowBookmarks(!showBookmarks)}
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={loadExternalBibleContent}
                      disabled={isLoading}
                    >
                      {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Language Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {language === 'am' ? 'ቋንቋ' : 'Language'}
                  </label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage as any}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amharic">አማርኛ</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="oromo">Afaan Oromoo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Book Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {language === 'am' ? 'መጽሐፍ' : 'Book'}
                  </label>
                  <Select value={selectedBook} onValueChange={setSelectedBook}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'am' ? 'መጽሐፍ ይምረጡ' : 'Select Book'} />
                    </SelectTrigger>
                    <SelectContent>
                      {books.map((book, index) => (
                        <SelectItem key={index} value={book}>
                          {book}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Chapter Selection */}
                {selectedBook && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {language === 'am' ? 'ምዕራፍ' : 'Chapter'}
                    </label>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedChapter(Math.max(1, selectedChapter - 1))}
                        disabled={selectedChapter <= 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Select 
                        value={selectedChapter.toString()} 
                        onValueChange={(value) => setSelectedChapter(parseInt(value))}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableChapters.map((chapter) => (
                            <SelectItem key={chapter} value={chapter.toString()}>
                              {chapter}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedChapter(selectedChapter + 1)}
                        disabled={selectedChapter >= Math.max(...availableChapters)}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Enhanced Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {language === 'am' ? 'ፍለጋ' : 'Search'}
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder={language === 'am' ? 'ቃል ፈልግ...' : 'Search verses...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Volume2 className="w-4 h-4 mr-2" />
                    {language === 'am' ? 'ድምጽ ማጫወቻ' : 'Audio Player'}
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    {language === 'am' ? 'ከፋያል ውርድ' : 'Download'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Bible Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    {selectedBook} {selectedChapter}
                    {currentVerses.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {currentVerses.length} verses
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      {language === 'am' ? 'ንባብ ሁኔታ' : 'Reading Mode'}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {searchQuery.length > 2 ? (
                  // Enhanced Search Results
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center justify-between">
                        <span>{language === 'am' ? 'የፍለጋ ውጤቶች' : 'Search Results'} ({searchResults.length})</span>
                        {isLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
                      </h4>
                      {searchResults.map((verse) => (
                        <div key={verse.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="outline">
                              {verse.book} {verse.chapter}:{verse.verse}
                            </Badge>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleBookmarkVerse(verse)}
                              >
                                <Bookmark className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleCopyVerse(verse)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleShareVerse(verse)}
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-700">{verse.text}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : showBookmarks ? (
                  // Enhanced Bookmarks
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      <h4 className="font-medium">
                        {language === 'am' ? 'መታሰቢያዎች' : 'Bookmarks'} ({bookmarks.length})
                      </h4>
                      {bookmarks.map((verse) => (
                        <div key={verse.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="outline">
                              {verse.book} {verse.chapter}:{verse.verse}
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleBookmarkVerse(verse)}
                              className="text-red-500"
                            >
                              <Bookmark className="w-4 h-4 fill-current" />
                            </Button>
                          </div>
                          <p className="text-gray-700">{verse.text}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Bookmarked {new Date(verse.bookmarkedAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  // Enhanced Current Chapter
                  <ScrollArea className="h-96">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
                        <span className="ml-2 text-gray-500">
                          {language === 'am' ? 'እየጫነ...' : 'Loading...'}
                        </span>
                      </div>
                    ) : currentVerses.length > 0 ? (
                      <div className="space-y-3">
                        {currentVerses.map((verse) => renderVerse(verse))}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-12">
                        <Book className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p>{language === 'am' ? 'መጽሐፍ እና ምዕራፍ ይምረጡ' : 'Select a book and chapter'}</p>
                        <Button className="mt-4" onClick={loadExternalBibleContent}>
                          <Globe className="w-4 h-4 mr-2" />
                          {language === 'am' ? 'ከእንሸቶች ምንጭ ጫን' : 'Load from External Source'}
                        </Button>
                      </div>
                    )}
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : activeTab === 'sabbath' ? (
        // Enhanced Sabbath School Tab
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {language === 'am' ? 'ሳምንታዊ ት/ቶች' : 'Weekly Lessons'}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={loadAdventechLessons}
                    disabled={isLoading}
                  >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {availableLessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedLesson?.id === lesson.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        <h4 className="font-medium text-sm mb-1">
                          {lesson.title[selectedLanguage] || lesson.title.english}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {lesson.quarter} - Week {lesson.week}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(lesson.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedLesson ? (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedLesson.title[selectedLanguage] || selectedLesson.title.english}</CardTitle>
                  <p className="text-sm text-gray-500">
                    {selectedLesson.quarter} - Week {selectedLesson.week} - {new Date(selectedLesson.date).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-6">
                      {/* Memory Verse */}
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium mb-2">
                          {language === 'am' ? 'የማስታወሻ ቃል' : 'Memory Verse'}
                        </h4>
                        <p className="italic text-blue-800">{selectedLesson.memoryVerse}</p>
                      </div>

                      {/* Introduction */}
                      <div>
                        <h4 className="font-medium mb-2">
                          {language === 'am' ? 'መግቢያ' : 'Introduction'}
                        </h4>
                        <p className="text-gray-700">{selectedLesson.content.introduction}</p>
                      </div>

                      {/* Daily Lessons */}
                      <div>
                        <h4 className="font-medium mb-3">
                          {language === 'am' ? 'ዕለታዊ ትምህርቶች' : 'Daily Lessons'}
                        </h4>
                        <div className="space-y-4">
                          {selectedLesson.content.dailyLessons.map((dailyLesson: any, index: number) => (
                            <div key={index} className="border-l-4 border-blue-200 pl-4">
                              <h5 className="font-medium text-sm mb-1">
                                {dailyLesson.day}: {dailyLesson.title}
                              </h5>
                              <p className="text-sm text-gray-600 mb-2">{dailyLesson.content}</p>
                              <Badge variant="outline" className="text-xs mb-2">
                                {dailyLesson.bibleReading}
                              </Badge>
                              {dailyLesson.questions && dailyLesson.questions.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs font-medium text-gray-600 mb-1">
                                    {language === 'am' ? 'ጥያቄዎች:' : 'Questions:'}
                                  </p>
                                  <ul className="text-xs text-gray-600 space-y-1">
                                    {dailyLesson.questions.map((question: string, qIndex: number) => (
                                      <li key={qIndex}>• {question}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Discussion Questions */}
                      <div>
                        <h4 className="font-medium mb-2">
                          {language === 'am' ? 'የውይይት ጥያቄዎች' : 'Discussion Questions'}
                        </h4>
                        <ul className="space-y-2">
                          {selectedLesson.content.discussion.map((question: string, index: number) => (
                            <li key={index} className="text-sm text-gray-700">
                              {index + 1}. {question}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Application */}
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium mb-2">
                          {language === 'am' ? 'ተግባራዊ አተገባበር' : 'Practical Application'}
                        </h4>
                        <p className="text-sm text-green-800">{selectedLesson.content.application}</p>
                      </div>

                      {/* Downloads and Actions */}
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          {language === 'am' ? 'PDF አውርድ' : 'Download PDF'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Volume2 className="w-4 h-4 mr-1" />
                          {language === 'am' ? 'ድምጽ Learning' : 'Audio Lesson'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4 mr-1" />
                          {language === 'am' ? 'አጋራ' : 'Share'}
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>{language === 'am' ? 'Learning ይምረጡ' : 'Select a lesson'}</p>
                  <Button className="mt-4" onClick={loadAdventechLessons}>
                    <Globe className="w-4 h-4 mr-2" />
                    {language === 'am' ? 'ከአድቬንቴክ ጫን' : 'Load from Adventech'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Devotional Tab
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'am' ? 'ዕለታዊ Devotional' : 'Daily Devotional'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'am' ? 'የእግዚአብሔር ፍቅር' : 'God\'s Love'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {new Date().toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US')}
                  </p>
                  <p className="italic text-blue-800 mb-4">
                    {language === 'am' 
                      ? '"እስመ ከመዝ አፍቀሮ አምላክ ለዓለም እስከ ወሀበ ወልዶ ኅዱና..." - ዮሐንስ 3፡16'
                      : '"For God so loved the world that he gave his one and only Son..." - John 3:16'
                    }
                  </p>
                  <div className="text-left space-y-3">
                    <p>
                      {language === 'am' 
                        ? 'የእግዚአብሔር ፍቅር ለሰው ልጅ ላለምግርምሺት የሚገለጠው በኢየሱስ ክርስቶስ መስዋዕትነት ነው። ይህ ፍቅር ውድመት ያመጣ አይደለም፣ አዳኛ ነው።'
                        : 'God\'s love for humanity is most clearly revealed through the sacrifice of Jesus Christ. This love is not destructive, but redemptive.'
                      }
                    </p>
                    <p>
                      {language === 'am' 
                        ? 'ዛሬ እንቅስቃሴ፡ የእግዚአብሔርን ፍቅር በሌላ ሰው ላይ ያንጸባርቁ።'
                        : 'Today\'s Action: Reflect God\'s love to someone else.'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {language === 'am' ? 'አዲስ Devotional' : 'New Devotional'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}