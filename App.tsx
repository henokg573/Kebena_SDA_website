import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import { EthiopianLandingPage } from './components/EthiopianLandingPage';
import { AuthPages } from './components/AuthPages';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { MediaPlayer } from './components/MediaPlayer';
import { CommunityChat } from './components/CommunityChat';
import { BibleReader } from './components/BibleReader';
import { LearningPlatform } from './components/LearningPlatform';
import { LanguageProvider } from './contexts/LanguageContext';
import { useAppState } from './hooks/useAppState';

export default function App() {
  const {
    // State
    currentView,
    setCurrentView,
    currentUser,
    isMenuOpen,
    setIsMenuOpen,
    loading,
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
    users,
    stats,
    selectedContent,
    showContentModal,
    setShowContentModal,
    playingPodcast,
    activeChat,
    setActiveChat,
    unreadCount,

    // Forms
    loginForm,
    setLoginForm,
    signupForm,
    setSignupForm,
    postForm,
    setPostForm,
    podcastForm,
    setPodcastForm,
    courseForm,
    setCourseForm,
    messageForm,
    setMessageForm,
    communityForm,
    setCommunityForm,
    submissionForm,
    setSubmissionForm,

    // Handlers
    initializeApp,
    handleLogin,
    handleSignup,
    handleLogout,
    createPost,
    createPodcast,
    createCourse,
    submitPrayerRequest,
    submitUserContent,
    enrollInCourse,
    likeContent,
    addComment,
    shareContent,
    playPodcast,
    viewContent,
    deleteContent,
    createCommunity,
    joinCommunity,
    sendMessage,
    markNotificationAsRead,
    createNotification,
    approveContent,
    rejectContent,
    updateUserProfile,
    uploadProfilePhoto,
    deleteAccount,
    changePassword
  } = useAppState();

  useEffect(() => {
    initializeApp();
  }, []);

  // Enhanced handlers for new features
  const handleLikeContent = (contentId: string, type: 'post' | 'podcast') => {
    likeContent(contentId, type);
  };

  const handleAddComment = (contentId: string, comment: string, type: 'post' | 'podcast') => {
    addComment(contentId, comment, type);
  };

  const handleShareContent = (contentId: string, type: 'post' | 'podcast', platform?: string) => {
    shareContent(contentId, type, platform);
  };

  const handleSelectCommunity = (communityId: string) => {
    setActiveChat(communityId);
  };

  const handleSendMessage = (content: string, communityId?: string, recipientId?: string) => {
    sendMessage(content, communityId, recipientId);
  };

  const handleJoinCommunity = (communityId: string) => {
    joinCommunity(communityId);
  };

  const handleCreateCommunity = (form: any) => {
    createCommunity(form);
  };

  const handleSubmitAssignment = (assignmentId: string, answers: any[]) => {
    console.log('Assignment submitted:', { assignmentId, answers });
  };

  const handleGradeAssignment = (submissionId: string, score: number, feedback: string) => {
    console.log('Assignment graded:', { submissionId, score, feedback });
  };

  const handleIssueCertificate = (userId: string, courseId: string, score: number) => {
    console.log('Certificate issued:', { userId, courseId, score });
  };

  const handleBookmarkVerse = (verse: any) => {
    console.log('Verse bookmarked:', verse);
  };

  const handleApproveContent = (contentId: string, type: string) => {
    approveContent(contentId, type);
  };

  const handleRejectContent = (contentId: string, type: string, reason?: string) => {
    rejectContent(contentId, type, reason);
  };

  const handleUpdateUserProfile = (updatedUser: any) => {
    updateUserProfile(updatedUser);
  };

  const handleUploadProfilePhoto = async (file: File) => {
    return uploadProfilePhoto(file);
  };

  const handleDeleteAccount = () => {
    deleteAccount();
  };

  const handleChangePassword = (currentPassword: string, newPassword: string) => {
    changePassword(currentPassword, newPassword);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen">
        {/* Landing Page */}
        {currentView === 'landing' && (
          <EthiopianLandingPage 
            currentUser={currentUser}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            setCurrentView={setCurrentView}
            handleLogout={handleLogout}
          />
        )}

        {/* Authentication Pages */}
        {(currentView === 'login' || currentView === 'signup') && (
          <AuthPages
            currentView={currentView}
            loading={loading}
            loginForm={loginForm}
            signupForm={signupForm}
            setLoginForm={setLoginForm}
            setSignupForm={setSignupForm}
            setCurrentView={setCurrentView}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
          />
        )}

        {/* User Dashboard */}
        {currentView === 'user-dashboard' && currentUser && (
          <UserDashboard
            currentUser={currentUser}
            setCurrentView={setCurrentView}
            handleLogout={handleLogout}
            posts={posts}
            courses={courses}
            podcasts={podcasts}
            prayerRequests={prayerRequests}
            communities={communities}
            messages={messages}
            notifications={notifications}
            userSubmissions={userSubmissions}
            sabbathLessons={sabbathLessons}
            certificates={certificates}
            bibleVerses={bibleVerses}
            unreadCount={unreadCount}
            enrollInCourse={enrollInCourse}
            viewContent={viewContent}
            likeContent={handleLikeContent}
            addComment={handleAddComment}
            shareContent={handleShareContent}
            playPodcast={playPodcast}
            submitPrayerRequest={submitPrayerRequest}
            submitUserContent={submitUserContent}
            joinCommunity={handleJoinCommunity}
            sendMessage={handleSendMessage}
            markNotificationAsRead={markNotificationAsRead}
            playingPodcast={playingPodcast}
            selectedContent={selectedContent}
            showContentModal={showContentModal}
            setShowContentModal={setShowContentModal}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            updateUserProfile={handleUpdateUserProfile}
            uploadProfilePhoto={handleUploadProfilePhoto}
            deleteAccount={handleDeleteAccount}
            changePassword={handleChangePassword}
          />
        )}

        {/* Admin Dashboard */}
        {currentView === 'admin-dashboard' && currentUser && (
          <AdminDashboard
            currentUser={currentUser}
            setCurrentView={setCurrentView}
            handleLogout={handleLogout}
            posts={posts}
            courses={courses}
            podcasts={podcasts}
            prayerRequests={prayerRequests}
            communities={communities}
            messages={messages}
            notifications={notifications}
            userSubmissions={userSubmissions}
            users={users}
            stats={stats}
            createPost={createPost}
            createPodcast={createPodcast}
            createCourse={createCourse}
            deleteContent={deleteContent}
            createCommunity={handleCreateCommunity}
            createNotification={createNotification}
            approveContent={handleApproveContent}
            rejectContent={handleRejectContent}
            postForm={postForm}
            setPostForm={setPostForm}
            podcastForm={podcastForm}
            setPodcastForm={setPodcastForm}
            courseForm={courseForm}
            setCourseForm={setCourseForm}
            communityForm={communityForm}
            setCommunityForm={setCommunityForm}
            loading={loading}
          />
        )}

        {/* Media Player Modal */}
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
                onLike={handleLikeContent}
                onComment={handleAddComment}
                onShare={handleShareContent}
                type={selectedContent.type === 'podcast' ? 'podcast' : 'post'}
              />
            </div>
          </div>
        )}

        {/* Global Toaster for notifications */}
        <Toaster 
          position="top-right" 
          richColors 
          closeButton
          duration={4000}
          expand={true}
          visibleToasts={5}
        />
      </div>
    </LanguageProvider>
  );
}