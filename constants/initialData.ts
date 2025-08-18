import {
  Post,
  Course,
  Podcast,
  PrayerRequest,
  Community,
  SabbathSchoolLesson,
  Comment,
  BibleVerse,
  Notification,
} from "../types";

export const initialPosts: Post[] = [
  {
    id: "1",
    title: "የእግዚአብሔር ፍቅር እና ምሕረት",
    description: "በሮሜዎስ 8፡38-39 ላይ የተመሠረተ ስብከት",
    content: "እግዚአብሔር ያለን ፍቅር ምንም ነገር ሊለየን አይችልም...",
    type: "sermon",
    author: "Pastor Abraham Tessema",
    author_id: "super_admin_1",
    views: 324,
    // The following properties have been updated to numbers
    likes: 3,
    shares: 12,
    comments: 1,
    mediaType: "video",
    mediaUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=225&fit=crop",
    duration: "45:30",
    status: "published",
    created_at: "2024-01-15T09:00:00Z",
    updated_at: "2024-01-15T09:00:00Z",
    tags: ["ፍቅር", "ምሕረት", "መጽሐፍቅዱስ"],
  },
  {
    id: "2",
    title: "God's Love and Mercy",
    description: "A sermon based on Romans 8:38-39",
    content: "Nothing can separate us from the love of God...",
    type: "sermon",
    author: "Pastor Abraham Tessema",
    author_id: "super_admin_1",
    views: 287,
    // The following properties have been updated to numbers
    likes: 2,
    shares: 8,
    comments: 0,
    mediaType: "audio",
    mediaUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    duration: "42:15",
    status: "published",
    created_at: "2024-01-10T09:00:00Z",
    updated_at: "2024-01-10T09:00:00Z",
    tags: ["love", "mercy", "bible"],
  },
  {
    id: "3",
    title: "የወጣቶች ሳምንት ዝግጅት",
    description: "ከጥር 20-25 የሚካሄደው የወጣቶች ሳምንት ዝግጅት",
    content: "ሁሉም ወጣቶች እንዲሳተፉ ተጋብዘዋል...",
    type: "announcement",
    author: "Elder Samuel Mekonnen",
    author_id: "admin_1",
    views: 156,
    // The following properties have been updated to numbers
    likes: 2,
    shares: 25,
    comments: 0,
    mediaType: "text",
    status: "published",
    created_at: "2024-01-12T14:00:00Z",
    updated_at: "2024-01-12T14:00:00Z",
    tags: ["ወጣቶች", "ዝግጅት", "ማስታወቂያ"],
  },
];

export const initialCourses: Course[] = [
  {
    id: "1",
    title: "የመጽሐፍ ቅዱስ መሠረታዊ ጥናት",
    description: "ለአዲስ አባላት የተዘጋጀ የመጽሐፍ ቅዱስ Learning",
    lessons: [
      {
        id: "lesson_1",
        title: "መጽሐፍ ቅዱስ ምንድን ነው?",
        description: "የመጽሐፍ ቅዱስ መሠረታዊ መግቢያ",
        content: "መጽሐፍ ቅዱስ የእግዚአብሔር ቃል ነው...",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        duration: "25:00",
        order: 1,
      },
      {
        id: "lesson_2",
        title: "የመጽሐፍ ቅዱስ ታሪክ",
        description: "መጽሐፍ ቅዱስ እንዴት ተጻፈ",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        duration: "30:00",
        order: 2,
      },
    ],
    instructor: "Elder Samuel Mekonnen",
    instructor_id: "admin_1",
    enrolled_users: ["user_1", "user_2"],
    assignments: [
      {
        id: "assignment_1",
        courseId: "1",
        title: "የመጽሐፍ ቅዱስ መሠረታዊ ጥያቄዎች",
        description: "ቀላል ጥያቄዎችን መልስ",
        type: "quiz",
        questions: [
          {
            id: "q1",
            question: "መጽሐፍ ቅዱስ ስንት መጻሕፍት አሉት?",
            type: "multiple_choice",
            options: ["66", "65", "67", "64"],
            correctAnswer: "66",
            points: 10,
          },
        ],
        maxScore: 100,
        submissions: [],
        created_at: "2024-01-01T00:00:00Z",
      },
    ],
    duration: "6 weeks",
    difficulty: "beginner",
    category: "Bible Study",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

export const initialPodcasts: Podcast[] = [
  {
    id: "1",
    title: "የቅዳሜ ማለዳ ጸሎት",
    description: "በየቅዳሜ ማለዳ የሚዘመር ጸሎታዊ ዝማሬ",
    duration: "15:30",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    author: "Worship Team",
    author_id: "admin_2",
    plays: 145,
    // The following properties have been updated to numbers
    likes: 3,
    shares: 23,
    comments: 1,
    mediaType: "audio",
    status: "published",
    created_at: "2024-01-08T06:00:00Z",
    updated_at: "2024-01-08T06:00:00Z",
    tags: ["ዝማሬ", "ጸሎት", "ቅዳሜ"],
  },
  {
    id: "2",
    title: "Morning Devotional Podcast",
    description: "Daily inspiration and biblical meditation",
    duration: "12:45",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=400&h=225&fit=crop",
    author: "Pastor Abraham Tessema",
    author_id: "super_admin_1",
    plays: 89,
    // The following properties have been updated to numbers
    likes: 2,
    shares: 12,
    comments: 0,
    mediaType: "video",
    status: "published",
    created_at: "2024-01-05T06:30:00Z",
    updated_at: "2024-01-05T06:30:00Z",
    tags: ["devotional", "morning", "inspiration"],
  },
];

export const initialPrayerRequests: PrayerRequest[] = [
  {
    id: "1",
    title: "ለቤተሰቤ ጤንነት",
    description: "እህቴ በጣም ታማለች። ለእሷ ፈውስ እጸልያለሁ።",
    author: "User One",
    author_id: "user_1",
    isAnonymous: false,
    prayers_count: 15,
    responses: [
      {
        id: "response_1",
        content: "እግዚአብሔር ፈውስ ይስጥ። እንጸልያለን።",
        author: "Pastor Abraham Tessema",
        author_id: "super_admin_1",
        isFromAdmin: true,
        created_at: "2024-01-16T10:00:00Z",
      },
    ],
    status: "active",
    isShared: true,
    created_at: "2024-01-15T18:00:00Z",
  },
  {
    id: "2",
    title: "For wisdom in decision making",
    description:
      "I have an important life decision to make and need God's guidance.",
    author: "Anonymous",
    author_id: "user_2",
    isAnonymous: true,
    prayers_count: 8,
    responses: [],
    status: "active",
    isShared: false,
    created_at: "2024-01-14T20:30:00Z",
  },
];

export const initialCommunities: Community[] = [
  {
    id: "1",
    name: "የወጣቶች ማህበር",
    description: "ለ18-35 ዕድሜ ያላቸው ወጣቶች",
    type: "public",
    creator_id: "admin_1",
    members: ["user_1", "user_2", "user_3", "user_4"],
    moderators: ["admin_1"],
    rules: ["ዬማናም ሰው ንጹህ ቋንቋ ይጠቀም", "የሃይማኖት ውይይት ላይ ብቻ ያተኩሩ", "እርስ በእርስ ያክብሩ"],
    created_at: "2024-01-01T00:00:00Z",
    messageCount: 45,
    isActive: true,
  },
  {
    id: "2",
    name: "Prayer Warriors",
    description: "Community dedicated to prayer and intercession",
    type: "public",
    creator_id: "super_admin_1",
    members: ["user_1", "user_3", "user_5", "user_6"],
    moderators: ["super_admin_1", "admin_2"],
    rules: [
      "Keep all discussions prayer-focused",
      "Respect confidentiality of prayer requests",
      "Encourage one another in faith",
    ],
    created_at: "2024-01-01T00:00:00Z",
    messageCount: 78,
    isActive: true,
  },
  {
    id: "3",
    name: "የቤተሰብ አገልግሎት",
    description: "ለቤተሰቦች የተዘጋጀ ማህበረሰብ",
    type: "private",
    creator_id: "admin_2",
    members: ["user_4", "user_5", "user_6"],
    moderators: ["admin_2"],
    rules: [
      "ፍርሃተ-እግዚአብሔርን የሚያሳድግ ንግግር",
      "የቤተሰብ እሴቶችን ማክበር",
      "ልጆችን የሚጠቅም ይዘት ማካፈል",
    ],
    created_at: "2024-01-01T00:00:00Z",
    messageCount: 23,
    isActive: true,
  },
];

export const initialSabbathLessons: SabbathSchoolLesson[] = [
  {
    id: "1",
    title: "የፍጥረት ዓለም",
    quarter: "Q1 2024",
    week: 1,
    date: "2024-01-06",
    memoryVerse: "በመጀመሪያ እግዚአብሔር ሰማዩንና ምድርን ፈጠረ። ዘፍጥረት 1፡1",
    content: {
      introduction: "እግዚአብሔር አስደናቂ የፍጥረት ሥራ አስፈፃሚ ነው...",
      dailyLessons: [
        {
          day: "እሑድ",
          title: "በመጀመሪያ እግዚአብሔር",
          content: "የፍጥረት ታሪክ በእግዚአብሔር ይጀምራል...",
          bibleReading: "ዘፍጥረት 1፡1-5",
          questions: ["እግዚአብሔር ምን ፈጠረ በመጀመሪያ ቀን?", "ብርሃን ከጨለማ እንዴት ተለየ?"],
        },
        {
          day: "ሰኞ",
          title: "የሰማይ መስፋፋት",
          content: "እግዚአብሔር በሁለተኛ ቀን ሰማዩን ፈጠረ...",
          bibleReading: "ዘፍጥረት 1፡6-8",
          questions: ["ሰማይ ምን አድርጎ ተፈጠረ?", "ውሃ እንዴት ተከፈለ?"],
        },
      ],
      discussion: [
        "የፍጥረት ዓለም ስለ እግዚአብሔር ምን ያስተምረናል?",
        "እንዴት እግዚአብሔርን በተፈጥሮ ውስጥ እናያለን?",
      ],
      application: "የእግዚአብሔርን ፍጥረት በዕለት ተዕለት ሕይወታችን እናመሰግናለን።",
    },
    language: "amharic",
    pdfUrl:
      "https://sabbath-school.adventech.io/api/v1/pdf/amharic/2024/01/lesson01.pdf",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "The Created World",
    quarter: "Q1 2024",
    week: 1,
    date: "2024-01-06",
    memoryVerse:
      "In the beginning God created the heavens and the earth. Genesis 1:1",
    content: {
      introduction: "God is the magnificent Creator of all that exists...",
      dailyLessons: [
        {
          day: "Sunday",
          title: "In the Beginning God",
          content: "The creation story begins with God...",
          bibleReading: "Genesis 1:1-5",
          questions: [
            "What did God create on the first day?",
            "How was light separated from darkness?",
          ],
        },
        {
          day: "Monday",
          title: "The Expanse of Heaven",
          content: "On the second day, God created the heavens...",
          bibleReading: "Genesis 1:6-8",
          questions: [
            "How was the firmament created?",
            "How were the waters divided?",
          ],
        },
      ],
      discussion: [
        "What does creation teach us about God?",
        "How do we see God in nature today?",
      ],
      application: "We give thanks for God's creation in our daily lives.",
    },
    language: "english",
    pdfUrl:
      "https://sabbath-school.adventech.io/api/v1/pdf/english/2024/01/lesson01.pdf",
    created_at: "2024-01-01T00:00:00Z",
  },
];

export const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "የወጣቶች ሳምንት ጀመረ",
    content: "የወጣቶች ሳምንት ዝግጅት ዛሬ ጀመረ። ሁሉም ወጣቶች እንዲሳተፉ ይፈለጋል።",
    type: "announcement",
    sender_id: "admin_1",
    senderName: "Elder Samuel Mekonnen",
    isRead: false,
    priority: "high",
    created_at: "2024-01-20T09:00:00Z",
  },
  {
    id: "2",
    title: "New Course Available",
    content:
      "A new Bible study course has been added to the learning platform.",
    type: "course",
    recipient_id: "user_1",
    sender_id: "super_admin_1",
    senderName: "Pastor Abraham Tessema",
    isRead: false,
    priority: "medium",
    actionUrl: "/courses/2",
    created_at: "2024-01-19T14:30:00Z",
  },
];

// Sample Bible verses for search functionality
export const sampleBibleVerses: BibleVerse[] = [
  {
    id: "1",
    book: "ዘፍጥረት",
    chapter: 1,
    verse: 1,
    text: "በመጀመሪያ እግዚአብሔር ሰማዩንና ምድርን ፈጠረ።",
    language: "amharic",
    version: "Ethiopian Orthodox",
  },
  {
    id: "2",
    book: "Genesis",
    chapter: 1,
    verse: 1,
    text: "In the beginning God created the heaven and the earth.",
    language: "english",
    version: "King James Version",
  },
  {
    id: "3",
    book: "ዮሐንስ",
    chapter: 3,
    verse: 16,
    text: "እግዚአብሔር ዓለምን በዚህ ያህል ወድዶአልና፥ ሁሉ በእርሱ የሚያምን ሰው እንዳይጠፋ፥ ዘላለማዊ ሕይወትንም እንዲያገኝ፥ አንድያ ልጁን ሰጠ።",
    language: "amharic",
    version: "Ethiopian Orthodox",
  },
  {
    id: "4",
    book: "John",
    chapter: 3,
    verse: 16,
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    language: "english",
    version: "King James Version",
  },
];
