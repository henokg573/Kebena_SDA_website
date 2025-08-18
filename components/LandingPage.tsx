import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { User, Post, Course, Podcast } from '../types';
import { 
  Calendar, Users, Heart, BookOpen, Video, Headphones, 
  Church, Cross, UserPlus, Play, Menu, X, Eye, ThumbsUp,
  Volume2, ArrowRight, MapPin, Phone, Mail, Pause
} from 'lucide-react';

interface LandingPageProps {
  currentUser: User | null;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  setCurrentView: (view: string) => void;
  posts: Post[];
  courses: Course[];
  podcasts: Podcast[];
  stats: any;
  selectedContent: any;
  showContentModal: boolean;
  setShowContentModal: (show: boolean) => void;
  playingPodcast: string | null;
  handleLogout: () => void;
  viewContent: (contentId: string, content: any) => void;
  likeContent: (contentId: string, type: 'post' | 'podcast') => void;
  playPodcast: (podcastId: string) => void;
  enrollInCourse: (courseId: string) => void;
}

export function LandingPage({
  currentUser,
  isMenuOpen,
  setIsMenuOpen,
  setCurrentView,
  posts,
  courses,
  podcasts,
  stats,
  selectedContent,
  showContentModal,
  setShowContentModal,
  playingPodcast,
  handleLogout,
  viewContent,
  likeContent,
  playPodcast,
  enrollInCourse
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl mr-3">
                <Church className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Grace Church</h1>
                <p className="text-xs text-gray-500">Growing in Grace & Truth</p>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <a href="#home" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md transition-colors font-medium">Home</a>
                <a href="#about" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors">About</a>
                <a href="#services" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors">Services</a>
                <a href="#content" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors">Content</a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors">Contact</a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {currentUser.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
                  </div>
                  <Button 
                    onClick={() => setCurrentView(currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Dashboard
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setCurrentView('login')}>Login</Button>
                  <Button onClick={() => setCurrentView('signup')} className="bg-blue-600 hover:bg-blue-700">Join Us</Button>
                </>
              )}
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md">Home</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md">About</a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md">Services</a>
              <a href="#content" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md">Content</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md">Contact</a>
              <div className="pt-4 border-t">
                {currentUser ? (
                  <>
                    <Button 
                      className="w-full mb-2" 
                      onClick={() => setCurrentView(currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard')}
                    >
                      Dashboard
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleLogout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full mb-2" onClick={() => setCurrentView('login')}>Login</Button>
                    <Button className="w-full" onClick={() => setCurrentView('signup')}>Join Us</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="mb-8">
              <Cross className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Welcome to<br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Grace Church
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
                A vibrant community where faith comes alive, hearts are transformed, and lives are renewed through God's amazing grace.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 text-lg px-8 py-4 h-auto font-semibold"
                onClick={() => currentUser ? setCurrentView('user-dashboard') : setCurrentView('signup')}
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Join Our Family
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-4 h-auto font-semibold"
                onClick={() => document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Online
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Calendar className="h-8 w-8 mx-auto mb-3 text-yellow-300" />
                <h3 className="font-semibold mb-2">Sunday Services</h3>
                <p className="text-sm text-blue-100">9:00 AM & 11:00 AM</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Users className="h-8 w-8 mx-auto mb-3 text-yellow-300" />
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-blue-100">Growing Together</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Heart className="h-8 w-8 mx-auto mb-3 text-yellow-300" />
                <h3 className="font-semibold mb-2">Life Groups</h3>
                <p className="text-sm text-blue-100">Every Wednesday</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Grace Church</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For over 50 years, Grace Church has been a beacon of hope and love in our community, 
              committed to sharing the transformative power of God's grace with all people.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We exist to help people discover God's love, develop authentic relationships, and deploy their gifts 
                to make a difference in the world. Through worship, discipleship, and service, we aim to reflect 
                Christ's love in everything we do.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stats.totalUsers || '500+'}</div>
                  <div className="text-sm text-gray-600">Church Family</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Years Serving</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Core Values</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-gray-900">Love</h5>
                    <p className="text-sm text-gray-600">We love God, love people, and love our community</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BookOpen className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-gray-900">Truth</h5>
                    <p className="text-sm text-gray-600">We believe and teach God's Word with integrity</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-gray-900">Community</h5>
                    <p className="text-sm text-gray-600">We do life together as one family in Christ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ways to Connect</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're new to faith or have been walking with Jesus for years, 
              there's a place for you at Grace Church.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Sunday Worship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Join us for uplifting worship services every Sunday morning.
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  <p>9:00 AM - Traditional Service</p>
                  <p>11:00 AM - Contemporary Service</p>
                </div>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Bible Study</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Dive deeper into God's Word through our online courses and study groups.
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  <p>Online courses available</p>
                  <p>Small groups weekly</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => currentUser ? setCurrentView('user-dashboard') : setCurrentView('signup')}
                >
                  Explore Courses
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Life Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Build meaningful relationships in our small group communities.
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  <p>Wednesday evenings</p>
                  <p>Various locations</p>
                </div>
                <Button variant="outline" className="w-full">Get Connected</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Serve</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Use your gifts to serve our church and community.
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  <p>Multiple ministries</p>
                  <p>Local outreach</p>
                </div>
                <Button variant="outline" className="w-full">Find Opportunities</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Content Section */}
      <section id="content" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest Messages & Content</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay connected with God's Word through our sermons, podcasts, and spiritual resources.
            </p>
          </div>

          <Tabs defaultValue="sermons" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="sermons">Sermons</TabsTrigger>
              <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
            </TabsList>

            <TabsContent value="sermons">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.filter(post => post.type === 'sermon').slice(0, 6).map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => viewContent(post.id, post)}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <Video className="h-3 w-3 mr-1" />
                          Sermon
                        </Badge>
                        <span className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                      <p className="text-sm text-gray-600">by {post.author}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              likeContent(post.id, 'post');
                            }}
                            className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </button>
                        </div>
                      </div>
                      <Button className="w-full" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Sermon
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="podcasts">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {podcasts.slice(0, 6).map((podcast) => (
                  <Card key={podcast.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          <Headphones className="h-3 w-3 mr-1" />
                          Podcast
                        </Badge>
                        <span className="text-xs text-gray-500">{new Date(podcast.created_at).toLocaleDateString()}</span>
                      </div>
                      <CardTitle className="text-lg leading-tight">{podcast.title}</CardTitle>
                      <p className="text-sm text-gray-600">by {podcast.author}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-3">{podcast.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{podcast.duration}</span>
                        <div className="flex items-center space-x-1">
                          <Volume2 className="h-4 w-4" />
                          <span>{podcast.plays} plays</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full" 
                        size="sm"
                        onClick={() => playPodcast(podcast.id)}
                        variant={playingPodcast === podcast.id ? "secondary" : "default"}
                      >
                        {playingPodcast === podcast.id ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Listen Now
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.slice(0, 6).map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          <BookOpen className="h-3 w-3 mr-1" />
                          Course
                        </Badge>
                        <Badge variant="outline">{course.lessons.length} lessons</Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                      <p className="text-sm text-gray-600">by {course.instructor}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-3">{course.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{course.enrolled_users.length} enrolled</span>
                        <span>Self-paced</span>
                      </div>
                      <Button 
                        className="w-full" 
                        size="sm"
                        onClick={() => enrollInCourse(course.id)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Learning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => currentUser ? setCurrentView('user-dashboard') : setCurrentView('signup')}
            >
              View All Content
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
              <p className="text-xl text-gray-300 mb-8">
                We'd love to connect with you! Whether you have questions about our church, 
                need prayer, or want to get involved, we're here for you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-300">123 Church Street<br />Graceville, ST 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-300">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 p-2 rounded-lg">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-300">hello@gracechurch.org</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-800 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Service Times</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Sunday Morning Worship</h4>
                      <p className="text-sm text-gray-300">Traditional & Contemporary</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">9:00 AM</p>
                      <p className="font-semibold">11:00 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Wednesday Life Groups</h4>
                      <p className="text-sm text-gray-300">Bible Study & Fellowship</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">7:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Saturday Youth Group</h4>
                      <p className="text-sm text-gray-300">Ages 13-18</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">6:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-blue-900 rounded-lg">
                  <h4 className="font-semibold mb-2">New Here?</h4>
                  <p className="text-sm text-blue-100 mb-4">
                    We'd love to welcome you personally! Join us this Sunday.
                  </p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => setCurrentView('signup')}
                  >
                    Plan Your Visit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl mr-3">
                  <Church className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Grace Church</h3>
                  <p className="text-sm text-gray-400">Growing in Grace & Truth</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Building authentic community and helping people discover God's love, 
                develop relationships, and deploy their gifts to make a difference.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Ministries</a></li>
                <li><a href="#content" className="hover:text-white transition-colors">Sermons</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Prayer Requests</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Volunteer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Give</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-400">
              &copy; 2025  Grace Church. All rights reserved. Built with ❤️ for God's glory.
            </p>
          </div>
        </div>
      </footer>

      {/* Content Modal */}
      <Dialog open={showContentModal} onOpenChange={setShowContentModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-green-600" />
              <span>{selectedContent?.title}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>by {selectedContent?.author}</span>
              <span>•</span>
              <span>{selectedContent && new Date(selectedContent.created_at).toLocaleDateString()}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{selectedContent?.views} views</span>
              </div>
            </div>
            <p className="text-gray-700">{selectedContent?.description}</p>
            {selectedContent?.content && (
              <div className="prose max-w-none">
                <p>{selectedContent.content}</p>
              </div>
            )}
            <div className="flex items-center space-x-4 pt-4 border-t">
              <Button
                onClick={() => likeContent(selectedContent?.id, 'post')}
                variant="outline"
                size="sm"
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Like ({selectedContent?.likes})
              </Button>
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Comment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}