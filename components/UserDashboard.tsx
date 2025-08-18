import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import newLogo from "../constants/logo.png";
import { 
  Home, 
  Book, 
  Users, 
  MessageCircle, 
  Bell, 
  Settings, 
  LogOut,
  Heart,
  Share2,
  Play,
  Crown,
  Pause,
  Upload,
  Send,
  BookOpen,
  Award,
  Church,
  Calendar,
  Hand,
  GraduationCap,
  FileText,
  Video,
  Headphones,
  Plus,
  Search
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MediaPlayer } from './MediaPlayer';
import { CommunityChat } from './CommunityChat';
import { BibleReader } from './BibleReader';
import { LearningPlatform } from './LearningPlatform';
import { UserProfile } from './UserProfile';

interface UserDashboardProps {
  currentUser: any;
  setCurrentView: (view: string) => void;
  handleLogout: () => void;
  posts: any[];
  courses: any[];
  podcasts: any[];
  prayerRequests: any[];
  communities: any[];
  messages: any[];
  notifications: any[];
  userSubmissions: any[];
  sabbathLessons: any[];
  certificates: any[];
  bibleVerses: any[];
  unreadCount: number;
  enrollInCourse: (courseId: string) => void;
  viewContent: (contentId: string, content: any) => void;
  likeContent: (contentId: string, type: 'post' | 'podcast') => void;
  addComment: (contentId: string, comment: string, type: 'post' | 'podcast') => void;
  shareContent: (contentId: string, type: 'post' | 'podcast', platform?: string) => void;
  playPodcast: (podcastId: string) => void;
  submitPrayerRequest: (form: any) => void;
  submitUserContent: (form: any) => void;
  joinCommunity: (communityId: string) => void;
  sendMessage: (content: string, communityId?: string, recipientId?: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  playingPodcast: string | null;
  selectedContent: any;
  showContentModal: boolean;
  setShowContentModal: (show: boolean) => void;
  activeChat: string | null;
  setActiveChat: (chatId: string | null) => void;
  updateUserProfile?: (user: any) => void;
  uploadProfilePhoto?: (file: File) => Promise<string>;
  deleteAccount?: () => void;
  changePassword?: (currentPassword: string, newPassword: string) => void;
}

export function UserDashboard({
  currentUser,
  setCurrentView,
  handleLogout,
  posts,
  courses,
  podcasts,
  prayerRequests,
  communities,
  messages,
  notifications,
  userSubmissions,
  sabbathLessons,
  certificates,
  bibleVerses,
  unreadCount,
  enrollInCourse,
  viewContent,
  likeContent,
  addComment,
  shareContent,
  playPodcast,
  submitPrayerRequest,
  submitUserContent,
  joinCommunity,
  sendMessage,
  markNotificationAsRead,
  playingPodcast,
  selectedContent,
  showContentModal,
  setShowContentModal,
  activeChat,
  setActiveChat,
  updateUserProfile,
  uploadProfilePhoto,
  deleteAccount,
  changePassword
}: UserDashboardProps) {
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('home');
  const [commentText, setCommentText] = useState<{[key: string]: string}>({});
  const [showPrayerForm, setShowPrayerForm] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  
  // Prayer form state
  const [prayerForm, setPrayerForm] = useState({
    title: '',
    description: '',
    isAnonymous: false
  });

  // User submission form state
  const [submissionForm, setSubmissionForm] = useState({
    title: '',
    description: '',
    type: 'sermon',
    content: '',
    file: null as File | null,
    mediaType: 'text'
  });

  const handleLike = (contentId: string, type: 'post' | 'podcast') => {
    likeContent(contentId, type);
  };

  const handleComment = (contentId: string, type: 'post' | 'podcast') => {
    const comment = commentText[contentId];
    if (comment?.trim()) {
      addComment(contentId, comment, type);
      setCommentText(prev => ({ ...prev, [contentId]: '' }));
    }
  };

  const handleShare = (contentId: string, type: 'post' | 'podcast', platform?: string) => {
    shareContent(contentId, type, platform);
  };

  const handlePrayerSubmit = () => {
    if (prayerForm.title.trim() && prayerForm.description.trim()) {
      submitPrayerRequest(prayerForm);
      setPrayerForm({ title: '', description: '', isAnonymous: false });
      setShowPrayerForm(false);
    }
  };

  const handleContentSubmit = () => {
    if (submissionForm.title.trim() && submissionForm.description.trim()) {
      submitUserContent(submissionForm);
      setSubmissionForm({
        title: '',
        description: '',
        type: 'sermon',
        content: '',
        file: null,
        mediaType: 'text'
      });
      setShowSubmissionForm(false);
    }
  };

  const isLiked = (content: any) => {
    return content.likes?.includes(currentUser?.id);
  };

  const renderContentCard = (content: any, type: 'post' | 'podcast') => {
    const contentType = type === 'post' ? 'post' : 'podcast';
    
    return (
      <Card key={content.uniqueKey || content.id} className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${content.author}`} />
              <AvatarFallback>{content.author?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{content.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {content.type || 'podcast'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {content.author} • {new Date(content.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm mt-2">{content.description}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Media Content */}
          {(content.videoUrl || content.audioUrl || content.mediaUrl) && (
            <div className="mb-4">
              {content.mediaType === 'video' || content.videoUrl ? (
                <div className="relative">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center cursor-pointer"
                       onClick={() => viewContent(content.id, content)}>
                    {content.thumbnailUrl ? (
                      <img src={content.thumbnailUrl} alt={content.title} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-2" />
                        <p>Click to play video</p>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-3">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : content.mediaType === 'audio' || content.audioUrl ? (
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 rounded-full p-3">
                      <Headphones className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{content.title}</h4>
                      <p className="text-sm opacity-80">{content.duration || 'Audio Content'}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playPodcast(content.id)}
                      className="text-white hover:bg-white/20"
                    >
                      {playingPodcast === content.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Engagement Buttons */}
          <div className="flex items-center justify-between border-t pt-3">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(content.id, contentType)}
                className={`flex items-center space-x-2 ${isLiked(content) ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-4 h-4 ${isLiked(content) ? 'fill-current' : ''}`} />
                <span>{content.likes?.length || 0}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{content.comments?.length || 0}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare(content.id, contentType)}
                className="flex items-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>{content.shares || 0}</span>
              </Button>
            </div>

            {content.mediaType && (
              <Badge variant="secondary" className="text-xs">
                {content.mediaType}
              </Badge>
            )}
          </div>

          {/* Comments Section */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex space-x-2 mb-3">
              <Input
                placeholder={language === 'am' ? 'አስተያየት ጻፍ...' : 'Write a comment...'}
                value={commentText[content.id] || ''}
                onChange={(e) => setCommentText(prev => ({ ...prev, [content.id]: e.target.value }))}
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={() => handleComment(content.id, contentType)}
                disabled={!commentText[content.id]?.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Recent Comments */}
            {content.comments && content.comments.length > 0 && (
              <div className="space-y-2">
                {content.comments.slice(0, 2).map((comment: any) => (
                  <div key={comment.id} className="flex space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.author}`} />
                      <AvatarFallback className="text-xs">{comment.author?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-gray-50 rounded-lg p-2">
                      <p className="text-xs font-medium">{comment.author}</p>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
                {content.comments.length > 2 && (
                  <Button variant="ghost" size="sm" className="text-xs">
                    View all {content.comments.length} comments
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left section - Logo and title */}
            <div className="flex items-center space-x-4 min-w-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-lg flex-shrink-0">
                <img
                  src={newLogo}
                  alt="Kebena SDA Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h1 className="text-xl font-semibold truncate">
                {language === "am"
                  ? "ቀበና ሰባተኛ ቀን አድቬንቲስት ቤተ ክርስቲያን"
                  : "Kebena SDA"}
              </h1>
            </div>

            {/* Right section - Controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Notification button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("notifications")}
                className="relative p-2"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>

              {/* User profile */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser?.name}`}
                  />
                  <AvatarFallback>
                    {currentUser?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium truncate max-w-[100px]">
                  {currentUser?.name}
                </span>
              </div>

              {/* Logout button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="p-2"
              >
                <LogOut className="w-4 h-4" />
              </Button>

              {/* Language toggle - Moved inside the right section */}
              <div className="flex items-center space-x-1 bg-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setLanguage("am")}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    language === "am"
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  አማ
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    language === "en"
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-8">
            <TabsTrigger value="home" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === "am" ? "Home" : "Home"}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="learning"
              className="flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === "am" ? "Learning" : "Learning"}
              </span>
            </TabsTrigger>
            <TabsTrigger value="bible" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === "am" ? "Bible" : "Bible"}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === "am" ? "Community" : "Community"}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="prayers"
              className="flex items-center space-x-2"
            >
              <Hand className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === "am" ? "Prayer" : "Prayer"}
              </span>
            </TabsTrigger>
            <TabsTrigger value="submit" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === "am" ? "Share" : "Share"}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center space-x-2 lg:flex hidden"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === "am" ? "Notifications" : "Notifications"}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex items-center space-x-2 lg:flex hidden"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === "am" ? "Profile" : "Profile"}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content Feed */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Video className="w-5 h-5" />
                      <span>
                        {language === "am"
                          ? "ስብከቶችና ትምህርቶች"
                          : "Sermons & Teachings"}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-96">
                      {posts.map((post, index) =>
                        renderContentCard(
                          { ...post, uniqueKey: `post-${post.id || index}` },
                          "post"
                        )
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Headphones className="w-5 h-5" />
                      <span>
                        {language === "am"
                          ? "ፖድካስቶች፣ ስብከቶች እና ዝማሬዎች"
                          : "Podcasts & Music"}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-96">
                      {podcasts.map((podcast, index) =>
                        renderContentCard(
                          {
                            ...podcast,
                            uniqueKey: `podcast-${podcast.id || index}`,
                          },
                          "podcast"
                        )
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "am" ? "ፈጣን እርምጃዎች" : "Quick Actions"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setShowPrayerForm(true)}
                    >
                      <Hand className="w-4 h-4 mr-2" />
                      {language === "am" ? "የጸሎት ጥያቄ" : "Prayer Request"}
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setShowSubmissionForm(true)}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {language === "am" ? "ይዘት አካፍል" : "Submit Content"}
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setActiveTab("bible")}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      {language === "am" ? "መጽሐፍ ቅዱስ" : "Read Bible"}
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setActiveTab("learning")}
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      {language === "am" ? "Learning ይማሩ" : "Learn"}
                    </Button>
                  </CardContent>
                </Card>

                {/* My Courses */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "am" ? "የእኔ ትምህርቶች" : "My Courses"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {courses
                      .filter((course) =>
                        course.enrolled_users?.includes(currentUser?.id)
                      )
                      .slice(0, 3)
                      .map((course) => (
                        <div
                          key={course.id}
                          className="p-3 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50"
                          onClick={() => setActiveTab("learning")}
                        >
                          <h4 className="font-medium text-sm">
                            {course.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {course.instructor}
                          </p>
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full"
                                style={{ width: "60%" }}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              60% complete
                            </p>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                {/* Recent Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "am"
                        ? "የቅርብ ጊዜ ማሳወቂያዎች"
                        : "Recent Notifications"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className="p-2 border-b last:border-b-0"
                      >
                        <p className="text-sm font-medium">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(
                            notification.created_at
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning">
            <LearningPlatform
              currentUser={currentUser}
              courses={courses}
              certificates={certificates}
              onEnrollInCourse={enrollInCourse}
              onSubmitAssignment={(assignmentId: string, answers: any[]) => {
                console.log("Assignment submitted:", { assignmentId, answers });
              }}
              onGradeAssignment={(
                submissionId: string,
                score: number,
                feedback: string
              ) => {
                console.log("Assignment graded:", {
                  submissionId,
                  score,
                  feedback,
                });
              }}
              onIssueCertificate={(
                userId: string,
                courseId: string,
                score: number
              ) => {
                console.log("Certificate issued:", { userId, courseId, score });
              }}
            />
          </TabsContent>

          {/* Bible Tab */}
          <TabsContent value="bible">
            <BibleReader
              currentUser={currentUser}
              bibleVerses={bibleVerses}
              sabbathLessons={sabbathLessons}
              onBookmark={(verse: any) => {
                console.log("Verse bookmarked:", verse);
              }}
            />
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community">
            <CommunityChat
              currentUser={currentUser}
              communities={communities}
              messages={messages}
              selectedCommunity={activeChat}
              onSelectCommunity={(communityId: string) =>
                setActiveChat(communityId)
              }
              onSendMessage={sendMessage}
              onJoinCommunity={joinCommunity}
              onCreateCommunity={(form: any) => {
                console.log("Community creation not available for users");
              }}
            />
          </TabsContent>

          {/* Prayers Tab */}
          <TabsContent value="prayers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
                {language === "am" ? "የጸሎት ጥያቄዎች" : "Prayer Requests"}
              </h2>
              <Button onClick={() => setShowPrayerForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                {language === "am" ? "አዲስ ጥያቄ" : "New Request"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prayerRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{request.title}</h3>
                      <Badge
                        variant={
                          request.status === "active" ? "default" : "secondary"
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      By {request.author} •{" "}
                      {new Date(request.created_at).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{request.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Hand className="w-4 h-4" />
                        <span className="text-sm">
                          {request.prayers_count} prayers
                        </span>
                      </div>
                      <Button size="sm" variant="outline">
                        {language === "am" ? "ጸልዩ" : "Pray"}
                      </Button>
                    </div>
                    {request.responses && request.responses.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-muted-foreground mb-2">
                          {request.responses.length} response(s)
                        </p>
                        {request.responses.slice(0, 1).map((response: any) => (
                          <div
                            key={response.id}
                            className="bg-gray-50 rounded p-2"
                          >
                            <p className="text-sm">{response.content}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              - {response.author}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Submit Tab */}
          <TabsContent value="submit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "am"
                    ? "ይዘት ለማጋራት ይህንን ይጠቀሙ"
                    : "Share Your Content"}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {language === "am"
                    ? "የእርስዎን ስብከት፣ ዝማሬ፣ ወይም ማንኛውንም ማንኛውንም ክርስቲያዊ ይዘት ያጋሩ። አስተዳዳሪዎች ይገመግሙታል።"
                    : "Share your sermons, songs, or any Christian content. It will be reviewed by administrators."}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{language === "am" ? "ርዕስ" : "Title"}</Label>
                      <Input
                        value={submissionForm.title}
                        onChange={(e) =>
                          setSubmissionForm((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder={
                          language === "am"
                            ? "ይዘትዎ ርዕስ"
                            : "Title of your content"
                        }
                      />
                    </div>
                    <div>
                      <Label>{language === "am" ? "አይነት" : "Type"}</Label>
                      <Select
                        value={submissionForm.type}
                        onValueChange={(value) =>
                          setSubmissionForm((prev) => ({
                            ...prev,
                            type: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sermon">
                            {language === "am" ? "ስብከት" : "Sermon"}
                          </SelectItem>
                          <SelectItem value="song">
                            {language === "am" ? "ዝማሬ" : "Song"}
                          </SelectItem>
                          <SelectItem value="podcast">
                            {language === "am" ? "ፖድካስት" : "Podcast"}
                          </SelectItem>
                          <SelectItem value="testimony">
                            {language === "am" ? "ምስክርነት" : "Testimony"}
                          </SelectItem>
                          <SelectItem value="announcement">
                            {language === "am" ? "ማስታወቂያ" : "Announcement"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>{language === "am" ? "መግለጫ" : "Description"}</Label>
                    <Textarea
                      value={submissionForm.description}
                      onChange={(e) =>
                        setSubmissionForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder={
                        language === "am"
                          ? "የይዘትዎ መግለጫ"
                          : "Description of your content"
                      }
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>{language === "am" ? "ይዘት" : "Content"}</Label>
                    <Textarea
                      value={submissionForm.content}
                      onChange={(e) =>
                        setSubmissionForm((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      placeholder={
                        language === "am"
                          ? "ተጨማሪ ዝርዝሮች ወይም ስክሪፕት"
                          : "Additional details or script"
                      }
                      rows={5}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>
                        {language === "am" ? "Media አይነት" : "Media Type"}
                      </Label>
                      <Select
                        value={submissionForm.mediaType}
                        onValueChange={(value) =>
                          setSubmissionForm((prev) => ({
                            ...prev,
                            mediaType: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">
                            {language === "am" ? "ጽሑፍ ብቻ" : "Text Only"}
                          </SelectItem>
                          <SelectItem value="audio">
                            {language === "am" ? "ድምጽ" : "Audio"}
                          </SelectItem>
                          <SelectItem value="video">
                            {language === "am" ? "ቪዲዮ" : "Video"}
                          </SelectItem>
                          <SelectItem value="document">
                            {language === "am" ? "ሰነድ" : "Document"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>
                        {language === "am" ? "ፋይል ይምረጡ" : "Choose File"}
                      </Label>
                      <Input
                        type="file"
                        onChange={(e) =>
                          setSubmissionForm((prev) => ({
                            ...prev,
                            file: e.target.files?.[0] || null,
                          }))
                        }
                        accept={
                          submissionForm.mediaType === "audio"
                            ? "audio/*"
                            : submissionForm.mediaType === "video"
                            ? "video/*"
                            : submissionForm.mediaType === "document"
                            ? ".pdf,.doc,.docx"
                            : "*"
                        }
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleContentSubmit} className="flex-1">
                      <Upload className="w-4 h-4 mr-2" />
                      {language === "am" ? "ለግምገማ ላክ" : "Submit for Review"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setSubmissionForm({
                          title: "",
                          description: "",
                          type: "sermon",
                          content: "",
                          file: null,
                          mediaType: "text",
                        })
                      }
                    >
                      {language === "am" ? "አጽዳ" : "Clear"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* My Submissions */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "am" ? "የእኔ አቅርቦቶች" : "My Submissions"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userSubmissions
                  .filter((sub) => sub.submitter_id === currentUser?.id)
                  .map((submission) => (
                    <div
                      key={submission.id}
                      className="p-4 border rounded-lg mb-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{submission.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {submission.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Submitted{" "}
                            {new Date(
                              submission.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            submission.status === "approved"
                              ? "default"
                              : submission.status === "rejected"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {submission.status}
                        </Badge>
                      </div>
                      {submission.adminNotes && (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          <p className="text-sm font-medium">Admin Notes:</p>
                          <p className="text-sm">{submission.adminNotes}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "am" ? "ማሳወቂያዎች" : "Notifications"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b last:border-b-0 cursor-pointer transition-colors ${
                        !notification.isRead
                          ? "bg-blue-50 hover:bg-blue-100"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.content}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            From {notification.senderName} •{" "}
                            {new Date(notification.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {notification.type}
                          </Badge>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <UserProfile
              currentUser={currentUser}
              onUpdateProfile={updateUserProfile || (() => {})}
              onUploadProfilePhoto={uploadProfilePhoto || (async () => "")}
              onDeleteAccount={deleteAccount || (() => {})}
              onChangePassword={changePassword || (() => {})}
            />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "am" ? "የእኔ መገለጫ" : "My Profile"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser?.name}`}
                    />
                    <AvatarFallback className="text-2xl">
                      {currentUser?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {currentUser?.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {currentUser?.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentUser?.phone}
                    </p>
                    <Badge variant="outline" className="mt-2">
                      {currentUser?.role}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <GraduationCap className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-2xl font-semibold">
                        {
                          courses.filter((c) =>
                            c.enrolled_users?.includes(currentUser?.id)
                          ).length
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Enrolled Courses
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Award className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                      <p className="text-2xl font-semibold">
                        {
                          certificates.filter(
                            (c) => c.userId === currentUser?.id
                          ).length
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Certificates
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <p className="text-2xl font-semibold">
                        {
                          communities.filter((c) =>
                            c.members?.includes(currentUser?.id)
                          ).length
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Communities
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Prayer Request Modal */}
      {showPrayerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                {language === "am" ? "የጸሎት ጥያቄ" : "Prayer Request"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{language === "am" ? "ርዕስ" : "Title"}</Label>
                <Input
                  value={prayerForm.title}
                  onChange={(e) =>
                    setPrayerForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder={
                    language === "am" ? "የጸሎት ጥያቄ ርዕስ" : "Prayer request title"
                  }
                />
              </div>
              <div>
                <Label>{language === "am" ? "መግለጫ" : "Description"}</Label>
                <Textarea
                  value={prayerForm.description}
                  onChange={(e) =>
                    setPrayerForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder={
                    language === "am"
                      ? "ለምን እንዲጸለዩ እንፈልጋለን?"
                      : "What would you like us to pray for?"
                  }
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={prayerForm.isAnonymous}
                  onCheckedChange={(checked) =>
                    setPrayerForm((prev) => ({ ...prev, isAnonymous: checked }))
                  }
                />
                <Label>
                  {language === "am" ? "በስም ሳይታወቅ" : "Submit anonymously"}
                </Label>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handlePrayerSubmit} className="flex-1">
                  {language === "am" ? "ጸሎት ጥያቄ ላክ" : "Submit Request"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPrayerForm(false)}
                >
                  {language === "am" ? "ይቅር" : "Cancel"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Content Modal */}
      {showContentModal && selectedContent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] overflow-auto">
            <button
              onClick={() => setShowContentModal(false)}
              className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
            >
              ✕
            </button>
            <MediaPlayer
              content={selectedContent}
              currentUser={currentUser}
              onLike={likeContent}
              onComment={addComment}
              onShare={shareContent}
              type={selectedContent.type === "podcast" ? "podcast" : "post"}
            />
          </div>
        </div>
      )}
    </div>
  );
}