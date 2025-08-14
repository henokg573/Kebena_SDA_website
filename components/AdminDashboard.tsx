import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useLanguage } from '../contexts/LanguageContext';
import { User, Post, Course, Podcast, PrayerRequest } from '../types';
import { toast } from 'sonner';
import newLogo from "../constants/logo.png";
import { 
  Shield, Crown, Users, FileText, Headphones, BookOpen, 
  Heart, Plus, Edit, Trash2, Eye, ThumbsUp, Play, Volume2,
  BarChart3, TrendingUp, Calendar, Settings, Home, LogOut,
  Globe, Clock, Award, Target, MessageSquare, Filter,
  Search, Download, Upload, Loader2, AlertCircle, CheckCircle,
  Star
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  setCurrentView: (view: string) => void;
  handleLogout: () => void;
  posts: Post[];
  courses: Course[];
  podcasts: Podcast[];
  prayerRequests: PrayerRequest[];
  stats: any;
  createPost: (e: React.FormEvent) => void;
  createPodcast: (e: React.FormEvent) => void;
  createCourse: (e: React.FormEvent) => void;
  deleteContent: (contentId: string, type: 'post' | 'podcast' | 'course' | 'prayer') => void;
  postForm: any;
  setPostForm: (form: any) => void;
  podcastForm: any;
  setPodcastForm: (form: any) => void;
  courseForm: any;
  setCourseForm: (form: any) => void;
  loading: boolean;
}

export function AdminDashboard({
  currentUser,
  setCurrentView,
  handleLogout,
  posts,
  courses,
  podcasts,
  prayerRequests,
  stats,
  createPost,
  createPodcast,
  createCourse,
  deleteContent,
  postForm,
  setPostForm,
  podcastForm,
  setPodcastForm,
  courseForm,
  setCourseForm,
  loading
}: AdminDashboardProps) {
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock analytics data
  const [analytics, setAnalytics] = useState({
    totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
    totalLikes: posts.reduce((sum, post) => sum + (post.likes || 0), 0),
    totalPlays: podcasts.reduce((sum, podcast) => sum + (podcast.plays || 0), 0),
    engagementRate: 75,
    growthRate: 12,
    activeUsers: 89
  });

  // Update analytics when data changes
  useEffect(() => {
    setAnalytics({
      totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
      totalLikes: posts.reduce((sum, post) => sum + (post.likes || 0), 0),
      totalPlays: podcasts.reduce((sum, podcast) => sum + (podcast.plays || 0), 0),
      engagementRate: 75,
      growthRate: 12,
      activeUsers: 89
    });
  }, [posts, podcasts]);

  const filteredContent = () => {
    let content: any[] = [];
    
    if (filterType === 'all' || filterType === 'posts') {
      content = [...content, ...posts.map((p, index) => ({ ...p, contentType: 'post', uniqueKey: `post-${p.id || index}` }))];
    }
    if (filterType === 'all' || filterType === 'podcasts') {
      content = [...content, ...podcasts.map((p, index) => ({ ...p, contentType: 'podcast', uniqueKey: `podcast-${p.id || index}` }))];
    }
    if (filterType === 'all' || filterType === 'courses') {
      content = [...content, ...courses.map((c, index) => ({ ...c, contentType: 'course', uniqueKey: `course-${c.id || index}` }))];
    }

    if (searchTerm) {
      content = content.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return content.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  };

  const exportData = () => {
    const data = {
      posts,
      courses,
      podcasts,
      prayerRequests,
      stats: analytics,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kebena-sda-church-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(language === 'am' ? 'ውሂብ በተሳካ ሁኔታ ወደ ውጭ ተላከ!' : 'Data exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-slate-800 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
               {/* Logo */}
                                    <div className="flex items-center space-x-3">
                                      <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img
                                          src={newLogo}
                                          alt="Kebena SDA Church Logo"
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      
                                    </div>
              <div>
                <h1 className="text-xl font-bold">
                  {language === 'am' ? 'የአስተዳደር ዳሽቦርድ' : 'Admin Dashboard'}
                </h1>
                <p className="text-xs text-gray-300">Kebena SDA Church</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="flex items-center space-x-1 bg-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('am')}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    language === 'am' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  አማ
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    language === 'en' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-red-500 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  {language === 'am' ? 'አስተዳዳሪ' : 'Admin'}
                </Badge>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-slate-600 text-white">
                    {currentUser.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-gray-300">{currentUser.email}</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('user-dashboard')}
                className="hidden md:flex border-slate-600 text-black hover:bg-slate-700"
              >
                <Users className="h-4 w-4 mr-1" />
                {language === 'am' ? 'የተጠቃሚ እይታ' : 'User View'}
              </Button>

              

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('landing')}
                className="border-slate-600 text-black hover:bg-slate-700"
              >
                <Home className="h-4 w-4 mr-1" />
                {language === 'am' ? 'Home' : 'Home'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-slate-600 text-black hover:bg-slate-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                {language === 'am' ? 'ውጣ' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-700 min-h-screen text-white">
          <div className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-300 mb-4 font-semibold">
                {language === 'am' ? 'የይዘት አስተዳደር' : 'Content Management'}
              </div>
              
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left p-3 rounded flex items-center justify-between transition-colors ${
                  activeTab === 'overview' ? 'bg-slate-600' : 'hover:bg-slate-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>{language === 'am' ? 'አጠቃላይ እይታ' : 'OVERVIEW'}</span>
                </div>
              </button>
              
              <button 
                onClick={() => setActiveTab('create-content')}
                className={`w-full text-left p-3 rounded flex items-center justify-between transition-colors ${
                  activeTab === 'create-content' ? 'bg-slate-600' : 'hover:bg-slate-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>{language === 'am' ? 'ይዘት ይፍጠሩ' : 'CREATE'}</span>
                </div>
              </button>
              
              <button 
                onClick={() => setActiveTab('manage-content')}
                className={`w-full text-left p-3 rounded flex items-center justify-between transition-colors ${
                  activeTab === 'manage-content' ? 'bg-slate-600' : 'hover:bg-slate-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>{language === 'am' ? 'ይዘት ያስተዳድሩ' : 'MANAGE'}</span>
                </div>
                <Badge variant="secondary">{posts.length + podcasts.length + courses.length}</Badge>
              </button>
              
              <button 
                onClick={() => setActiveTab('prayer-requests')}
                className={`w-full text-left p-3 rounded flex items-center justify-between transition-colors ${
                  activeTab === 'prayer-requests' ? 'bg-slate-600' : 'hover:bg-slate-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>{language === 'am' ? 'ጸሎት ጥያቄዎች' : 'PRAYERS'}</span>
                </div>
                <Badge variant="secondary">{prayerRequests.length}</Badge>
              </button>

              <button 
                onClick={() => setActiveTab('analytics')}
                className={`w-full text-left p-3 rounded flex items-center justify-between transition-colors ${
                  activeTab === 'analytics' ? 'bg-slate-600' : 'hover:bg-slate-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>{language === 'am' ? 'ትንታኔዎች' : 'ANALYTICS'}</span>
                </div>
              </button>
            </div>
            
            <div className="mt-8 pt-4 border-t border-slate-600">
              <div className="text-sm text-gray-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span>{language === 'am' ? 'ጠቅላላ ይዘት' : 'Total Content'}</span>
                  <span>{posts.length + podcasts.length + courses.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{language === 'am' ? 'ንቁ ተጠቃሚዎች' : 'Active Users'}</span>
                  <span>{analytics.activeUsers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{language === 'am' ? 'ዛሬ እይታዎች' : 'Views Today'}</span>
                  <span>{Math.floor(analytics.totalViews * 0.1)}</span>
                </div>
              </div>
              
              <Button 
                onClick={exportData}
                className="w-full mt-4 bg-slate-600 hover:bg-slate-500"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                {language === 'am' ? 'ውሂብ ወደ ውጭ ላክ' : 'Export Data'}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="overview" className="mt-0">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">
                          {language === 'am' ? 'ጠቅላላ ይዘት' : 'Total Content'}
                        </p>
                        <p className="text-3xl font-bold">{posts.length + podcasts.length + courses.length}</p>
                        <p className="text-xs text-blue-200 mt-1">
                          +{Math.floor(Math.random() * 5) + 1} {language === 'am' ? 'ዛሬ' : 'today'}
                        </p>
                      </div>
                      <FileText className="h-8 w-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">
                          {language === 'am' ? 'ጠቅላላ እይታዎች' : 'Total Views'}
                        </p>
                        <p className="text-3xl font-bold">{analytics.totalViews}</p>
                        <p className="text-xs text-green-200 mt-1">
                          +{analytics.growthRate}% {language === 'am' ? 'እድገት' : 'growth'}
                        </p>
                      </div>
                      <Eye className="h-8 w-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">
                          {language === 'am' ? 'ንቁ ተጠቃሚዎች' : 'Active Users'}
                        </p>
                        <p className="text-3xl font-bold">{analytics.activeUsers}</p>
                        <p className="text-xs text-purple-200 mt-1">
                          {analytics.engagementRate}% {language === 'am' ? 'ተሳትፎ' : 'engagement'}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">
                          {language === 'am' ? 'ጸሎት ጥያቄዎች' : 'Prayer Requests'}
                        </p>
                        <p className="text-3xl font-bold">{prayerRequests.length}</p>
                        <p className="text-xs text-orange-200 mt-1">
                          {language === 'am' ? 'ይህ ሳምንት' : 'this week'}
                        </p>
                      </div>
                      <Heart className="h-8 w-8 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>{language === 'am' ? 'የቅርብ ጊዜ ይዘት' : 'Recent Content'}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredContent().slice(0, 5).map((item) => (
                        <div key={item.uniqueKey || item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {item.contentType === 'post' && (language === 'am' ? 'ስብከት' : 'Post')}
                                {item.contentType === 'podcast' && (language === 'am' ? 'ፖድካስት' : 'Podcast')}
                                {item.contentType === 'course' && (language === 'am' ? 'ኮርስ' : 'Course')}
                              </Badge>
                            </div>
                            <p className="font-medium text-sm truncate">{item.title}</p>
                            <p className="text-xs text-gray-600">
                              {language === 'am' ? 'በ' : 'by'} {item.author || item.instructor}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            {item.views && (
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Eye className="h-3 w-3" />
                                <span>{item.views}</span>
                              </div>
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => deleteContent(item.id, item.contentType)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>{language === 'am' ? 'የቁልፍ መመዘኛዎች' : 'Key Metrics'}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{language === 'am' ? 'የይዘት ተሳትፎ' : 'Content Engagement'}</span>
                          <span>{analytics.engagementRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${analytics.engagementRate}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{language === 'am' ? 'የሳምንት እድገት' : 'Weekly Growth'}</span>
                          <span>+{analytics.growthRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${analytics.growthRate * 5}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{analytics.totalLikes}</p>
                          <p className="text-xs text-blue-600">{language === 'am' ? 'ጠቅላላ ወደድኩ' : 'Total Likes'}</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{analytics.totalPlays}</p>
                          <p className="text-xs text-green-600">{language === 'am' ? 'ጠቅላላ ማጫወት' : 'Total Plays'}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="create-content" className="mt-0">
              <Tabs defaultValue="post" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="post">
                    {language === 'am' ? 'ስብከት/ማስታወቂያ ይፍጠሩ' : 'Create Post/Sermon'}
                  </TabsTrigger>
                  <TabsTrigger value="podcast">
                    {language === 'am' ? 'ፖድካስት ይፍጠሩ' : 'Create Podcast'}
                  </TabsTrigger>
                  <TabsTrigger value="course">
                    {language === 'am' ? 'ኮርስ ይፍጠሩ' : 'Create Course'}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="post">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Plus className="h-5 w-5" />
                        <span>{language === 'am' ? 'አዲስ ይዘት ይፍጠሩ' : 'Create New Content'}</span>
                      </CardTitle>
                      <p className="text-gray-600">
                        {language === 'am' 
                          ? 'ስብከቶች፣ ማስታወቂያዎች እና ትምህርቶች ከጉባኤዎ ጋር ያካፍሉ'
                          : 'Share sermons, announcements, and teachings with your congregation'
                        }
                      </p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={createPost} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="post-title">
                                {language === 'am' ? 'ርዕስ' : 'Title'}
                              </Label>
                              <Input 
                                id="post-title"
                                value={postForm.title}
                                onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                                placeholder={language === 'am' ? 'አነሳሽ ርዕስ ያስገቡ...' : 'Enter an inspiring title...'}
                                required
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="post-type">
                                {language === 'am' ? 'የይዘት አይነት' : 'Content Type'}
                              </Label>
                              <select 
                                id="post-type"
                                className="w-full p-2 border rounded-md mt-1"
                                value={postForm.type}
                                onChange={(e) => setPostForm({ ...postForm, type: e.target.value })}
                              >
                                <option value="sermon">{language === 'am' ? 'ስብከት' : 'Sermon'}</option>
                                <option value="announcement">{language === 'am' ? 'ማስታወቂያ' : 'Announcement'}</option>
                                <option value="event">{language === 'am' ? 'ዝግጅት' : 'Event'}</option>
                                <option value="teaching">{language === 'am' ? 'Learning' : 'Teaching'}</option>
                                <option value="devotional">{language === 'am' ? 'የጸሎት ጊዜ' : 'Devotional'}</option>
                              </select>
                            </div>
                            
                            <div>
                              <Label htmlFor="post-description">
                                {language === 'am' ? 'መግለጫ' : 'Description'}
                              </Label>
                              <Textarea 
                                id="post-description"
                                value={postForm.description}
                                onChange={(e) => setPostForm({ ...postForm, description: e.target.value })}
                                placeholder={language === 'am' ? 'አጭር መግለጫ ወይም ማጠቃለያ...' : 'Brief description or summary...'} 
                                className="min-h-32 mt-1"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <Label>{language === 'am' ? 'ደራሲ' : 'Author'}</Label>
                              <div className="flex items-center space-x-2 mt-2 p-3 border rounded-md bg-gray-50">
                                <Shield className="h-4 w-4 text-gray-600" />
                                <span className="text-sm text-gray-600">{currentUser.name}</span>
                                <Badge variant="secondary" className="ml-auto">
                                  {language === 'am' ? 'አስተዳዳሪ' : 'Admin'}
                                </Badge>
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="post-content">
                                {language === 'am' ? 'ሙሉ ይዘት (አማራጭ)' : 'Full Content (Optional)'}
                              </Label>
                              <Textarea 
                                id="post-content"
                                value={postForm.content}
                                onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                                placeholder={language === 'am' 
                                  ? 'ሙሉውን የስብከት ጽሑፍ፣ የመጽሐፍ ቅዱስ ጥቅሶች ወይም ዝርዝር ይዘት ያስገቡ...'
                                  : 'Enter the complete sermon text, scripture references, or detailed content...'
                                } 
                                className="min-h-48 mt-1"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center space-x-4 pt-6 border-t">
                          <Button 
                            type="button" 
                            variant="destructive" 
                            onClick={() => setPostForm({ title: '', description: '', content: '', type: 'sermon' })}
                          >
                            {language === 'am' ? 'ቅጥያውን አጽዳ' : 'Clear Form'}
                          </Button>
                          <Button 
                            type="submit" 
                            className="bg-green-500 hover:bg-green-600" 
                            disabled={loading}
                          >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <FileText className="mr-2 h-4 w-4" />
                            {language === 'am' ? 'ይዘት አትሞ' : 'Publish Content'}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="podcast">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Plus className="h-5 w-5" />
                        <span>{language === 'am' ? 'አዲስ ፖድካስት ይፍጠሩ' : 'Create New Podcast'}</span>
                      </CardTitle>
                      <p className="text-gray-600">
                        {language === 'am' 
                          ? 'የድምጽ ይዘት፣ ጸሎታዊ ማሰላሰያዎች እና ትምህርቶች ያካፍሉ'
                          : 'Share audio content, devotionals, and teachings'
                        }
                      </p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={createPodcast} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="podcast-title">
                                {language === 'am' ? 'የፖድካስት ርዕስ' : 'Podcast Title'}
                              </Label>
                              <Input 
                                id="podcast-title"
                                value={podcastForm.title}
                                onChange={(e) => setPodcastForm({ ...podcastForm, title: e.target.value })}
                                placeholder={language === 'am' ? 'የፖድካስት ርዕስ ያስገቡ...' : 'Enter podcast title...'}
                                required
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="podcast-duration">
                                {language === 'am' ? 'ርዝመት' : 'Duration'}
                              </Label>
                              <Input 
                                id="podcast-duration"
                                value={podcastForm.duration}
                                onChange={(e) => setPodcastForm({ ...podcastForm, duration: e.target.value })}
                                placeholder={language === 'am' ? 'ለምሳሌ፣ 25 ደቂቃ፣ 1 ሰዓት 15 ደቂቃ' : 'e.g., 25 min, 1 hour 15 min'}
                                required
                                className="mt-1"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="podcast-description">
                                {language === 'am' ? 'መግለጫ' : 'Description'}
                              </Label>
                              <Textarea 
                                id="podcast-description"
                                value={podcastForm.description}
                                onChange={(e) => setPodcastForm({ ...podcastForm, description: e.target.value })}
                                placeholder={language === 'am' 
                                  ? 'የፖድካስቱን ይዘት ይግለጹ እና አዳማጮች ምን እንደሚማሩ...'
                                  : 'Describe the podcast content and what listeners will learn...'
                                } 
                                className="min-h-32 mt-1"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center space-x-4 pt-6 border-t">
                          <Button 
                            type="button" 
                            variant="destructive" 
                            onClick={() => setPodcastForm({ title: '', description: '', duration: '' })}
                          >
                            {language === 'am' ? 'ቅጥያውን አጽዳ' : 'Clear Form'}
                          </Button>
                          <Button 
                            type="submit" 
                            className="bg-blue-500 hover:bg-blue-600" 
                            disabled={loading}
                          >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Headphones className="mr-2 h-4 w-4" />
                            {language === 'am' ? 'ፖድካስት ይፍጠሩ' : 'Create Podcast'}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="course">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Plus className="h-5 w-5" />
                        <span>{language === 'am' ? 'አዲስ ኮርስ ይፍጠሩ' : 'Create New Course'}</span>
                      </CardTitle>
                      <p className="text-gray-600">
                        {language === 'am' 
                          ? 'ለጉባኤዎ የተዋቀሩ የመማሪያ ልምዶች ይገንቡ'
                          : 'Build structured learning experiences for your congregation'
                        }
                      </p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={createCourse} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="course-title">
                                {language === 'am' ? 'የኮርስ ርዕስ' : 'Course Title'}
                              </Label>
                              <Input 
                                id="course-title"
                                value={courseForm.title}
                                onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                                placeholder={language === 'am' ? 'የኮርስ ርዕስ ያስገቡ...' : 'Enter course title...'}
                                required
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="course-instructor">
                                {language === 'am' ? 'መምህር' : 'Instructor'}
                              </Label>
                              <Input 
                                id="course-instructor"
                                value={courseForm.instructor}
                                onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                                placeholder={language === 'am' ? 'የመምህር ስም...' : 'Instructor name...'}
                                required
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="course-lessons">
                                {language === 'am' ? 'የትምህርቶች ቁጥር' : 'Number of Lessons'}
                              </Label>
                              <Input 
                                id="course-lessons"
                                type="number"
                                min="1"
                                max="50"
                                value={courseForm.lessons}
                                onChange={(e) => setCourseForm({ ...courseForm, lessons: parseInt(e.target.value) || 1 })}
                                required
                                className="mt-1"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="course-description">
                                {language === 'am' ? 'የኰርስ መግለጫ' : 'Course Description'}
                              </Label>
                              <Textarea 
                                id="course-description"
                                value={courseForm.description}
                                onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                                placeholder={language === 'am' 
                                  ? 'ተማሪዎች ምን እንደሚማሩ እና የኮርሱን አላማዎች ይግለጹ...'
                                  : 'Describe what students will learn and the course objectives...'
                                } 
                                className="min-h-32 mt-1"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center space-x-4 pt-6 border-t">
                          <Button 
                            type="button" 
                            variant="destructive" 
                            onClick={() => setCourseForm({ title: '', description: '', instructor: '', lessons: 5 })}
                          >
                            {language === 'am' ? 'ቅጥያውን አጽዳ' : 'Clear Form'}
                          </Button>
                          <Button 
                            type="submit" 
                            className="bg-purple-500 hover:bg-purple-600"
                            disabled={loading}
                          >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <BookOpen className="mr-2 h-4 w-4" />
                            {language === 'am' ? 'ኮርስ ይፍጠሩ' : 'Create Course'}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="manage-content" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>{language === 'am' ? 'ይዘት አስተዳድር' : 'Content Management'}</span>
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder={language === 'am' ? 'ይዘት ይፈልጉ...' : 'Search content...'}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                    >
                      <option value="all">{language === 'am' ? 'ሁሉም' : 'All Content'}</option>
                      <option value="posts">{language === 'am' ? 'ስብከቶች' : 'Posts'}</option>
                      <option value="podcasts">{language === 'am' ? 'ፖድካስቶች' : 'Podcasts'}</option>
                      <option value="courses">{language === 'am' ? 'ኰርሶች' : 'Courses'}</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredContent().map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge variant="outline">
                              {item.contentType === 'post' && (
                                <>
                                  <FileText className="h-3 w-3 mr-1" />
                                  {language === 'am' ? 'ስብከት' : 'Post'}
                                </>
                              )}
                              {item.contentType === 'podcast' && (
                                <>
                                  <Headphones className="h-3 w-3 mr-1" />
                                  {language === 'am' ? 'ፖድካስት' : 'Podcast'}
                                </>
                              )}
                              {item.contentType === 'course' && (
                                <>
                                  <BookOpen className="h-3 w-3 mr-1" />
                                  {language === 'am' ? 'ኰርስ' : 'Course'}
                                </>
                              )}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(item.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {language === 'am' ? 'በ' : 'by'} {item.author || item.instructor}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-4 ml-4">
                          {item.views && (
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Eye className="h-4 w-4" />
                              <span>{item.views}</span>
                            </div>
                          )}
                          {item.likes && (
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{item.likes}</span>
                            </div>
                          )}
                          {item.plays && (
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Volume2 className="h-4 w-4" />
                              <span>{item.plays}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => deleteContent(item.id, item.contentType)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {filteredContent().length === 0 && (
                      <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          {language === 'am' ? 'ምንም ይዘት አልተገኘም' : 'No content found'}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prayer-requests" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>{language === 'am' ? 'የጸሎት ጥያቄዎች አስተዳድር' : 'Prayer Requests Management'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prayerRequests.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          {language === 'am' ? 'ምንም የጸሎት ጥያቄ የለም' : 'No prayer requests yet'}
                        </p>
                      </div>
                    ) : (
                      prayerRequests.map((request) => (
                        <div key={request.id} className="p-6 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-3">
                                <h3 className="font-semibold text-lg">{request.title}</h3>
                                {request.isAnonymous && (
                                  <Badge variant="secondary" className="bg-gray-100">
                                    {language === 'am' ? 'ማይታወቅ' : 'Anonymous'}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-700 mb-4 leading-relaxed">{request.description}</p>
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>
                                  {language === 'am' ? 'በ' : 'by'} {request.author} • {' '}
                                  {new Date(request.created_at).toLocaleDateString()}
                                </span>
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-1">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    <span>{request.prayers_count || 0} {language === 'am' ? 'ጸሎቶች' : 'prayers'}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-4">
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                {language === 'am' ? 'አስተያየት' : 'Respond'}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => deleteContent(request.id, 'prayer')}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>{language === 'am' ? 'የይዘት አፈጻጸም' : 'Content Performance'}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{language === 'am' ? 'ሳምንታዊ እይታዎች' : 'Weekly Views'}</span>
                          <span className="text-green-600">+{analytics.growthRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-green-600 h-3 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{Math.floor(analytics.totalViews * 0.7)} {language === 'am' ? 'ይህ ሳምንት' : 'this week'}</p>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{language === 'am' ? 'ተሳትፎ ደረጃ' : 'Engagement Rate'}</span>
                          <span className="text-blue-600">{analytics.engagementRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${analytics.engagementRate}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{language === 'am' ? 'በተመሳሳይ ሁኔታ' : 'Above average'}</p>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{language === 'am' ? 'የመመለሻ ተጠቃሚዎች' : 'Returning Users'}</span>
                          <span className="text-purple-600">68%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-purple-600 h-3 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{Math.floor(analytics.activeUsers * 0.68)} {language === 'am' ? 'ተመልሰው መጥተዋል' : 'users returned'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5" />
                      <span>{language === 'am' ? 'ተወዳጅ ይዘት' : 'Top Performing Content'}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...posts, ...podcasts]
                        .sort((a, b) => (b.views || 0) + (b.plays || 0) - (a.views || 0) - (a.plays || 0))
                        .slice(0, 5)
                        .map((item, index) => (
                          <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? 'bg-yellow-100 text-yellow-600' :
                              index === 1 ? 'bg-gray-100 text-gray-600' :
                              index === 2 ? 'bg-orange-100 text-orange-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.title}</p>
                              <p className="text-xs text-gray-500">
                                {item.views ? `${item.views} views` : `${item.plays} plays`}
                              </p>
                            </div>
                            {index === 0 && <Star className="h-4 w-4 text-yellow-500" />}
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}