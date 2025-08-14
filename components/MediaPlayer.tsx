import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize,
  MoreVertical,
  Send,
  Facebook,
  Twitter,
  Link,
  Download
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

interface MediaPlayerProps {
  content: any;
  currentUser: any;
  onLike: (contentId: string, type: 'post' | 'podcast') => void;
  onComment: (contentId: string, comment: string, type: 'post' | 'podcast') => void;
  onShare: (contentId: string, type: 'post' | 'podcast', platform?: string) => void;
  type: 'post' | 'podcast';
}

export function MediaPlayer({ 
  content, 
  currentUser, 
  onLike, 
  onComment, 
  onShare, 
  type 
}: MediaPlayerProps) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [mediaType, setMediaType] = useState(content.mediaType || 'video');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const isLiked = content.likes?.includes(currentUser?.id);
  const likesCount = content.likes?.length || 0;
  const commentsCount = content.comments?.length || 0;
  const sharesCount = content.shares || 0;

  const handlePlayPause = () => {
    const media = mediaType === 'video' ? videoRef.current : audioRef.current;
    if (media) {
      if (isPlaying) {
        media.pause();
      } else {
        media.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    const media = mediaType === 'video' ? videoRef.current : audioRef.current;
    if (media) {
      media.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    const media = mediaType === 'video' ? videoRef.current : audioRef.current;
    if (media) {
      media.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleTimeUpdate = () => {
    const media = mediaType === 'video' ? videoRef.current : audioRef.current;
    if (media) {
      setCurrentTime(media.currentTime);
      setDuration(media.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    const media = mediaType === 'video' ? videoRef.current : audioRef.current;
    if (media) {
      media.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleLike = () => {
    if (!currentUser) {
      toast.error(language === 'am' ? 'እባክዎ ይግቡ' : 'Please login first');
      return;
    }
    onLike(content.id, type);
  };

  const handleAddComment = () => {
    if (!currentUser) {
      toast.error(language === 'am' ? 'እባክዎ ይግቡ' : 'Please login first');
      return;
    }
    if (!commentText.trim()) return;
    
    onComment(content.id, commentText, type);
    setCommentText('');
    toast.success(language === 'am' ? 'አስተያየት ተጨመረ' : 'Comment added');
  };

  const handleShare = (platform?: string) => {
    onShare(content.id, type, platform);
    setShowShareOptions(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-0">
        {/* Media Display */}
        <div className="relative bg-black rounded-t-lg overflow-hidden">
          {/* Video/Audio Toggle Buttons */}
          {content.videoUrl && content.audioUrl && (
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <Button
                size="sm"
                variant={mediaType === 'video' ? 'default' : 'secondary'}
                onClick={() => setMediaType('video')}
                className="bg-black/50 hover:bg-black/70"
              >
                Video
              </Button>
              <Button
                size="sm"
                variant={mediaType === 'audio' ? 'default' : 'secondary'}
                onClick={() => setMediaType('audio')}
                className="bg-black/50 hover:bg-black/70"
              >
                Audio
              </Button>
            </div>
          )}

          {/* Video Player */}
          {mediaType === 'video' && content.videoUrl && (
            <video
              ref={videoRef}
              src={content.videoUrl}
              poster={content.thumbnailUrl}
              className="w-full aspect-video"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
            />
          )}

          {/* Audio Player Visualization */}
          {mediaType === 'audio' && content.audioUrl && (
            <div className="w-full aspect-video bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Volume2 className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-white text-xl mb-2">{content.title}</h3>
                <p className="text-white/80">{content.author}</p>
              </div>
              <audio
                ref={audioRef}
                src={content.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
              />
            </div>
          )}

          {/* Media Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center space-x-4 mb-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handlePlayPause}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={handleMute}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20"
              />
              
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              
              <div className="flex-1" />
              
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Progress Bar */}
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none slider"
            />
          </div>
        </div>

        {/* Content Info */}
        <div className="p-6">
          <div className="flex items-start space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${content.author}`} />
              <AvatarFallback>{content.author?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{content.title}</h3>
              <p className="text-muted-foreground text-sm mb-2">
                {content.author} • {new Date(content.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm mb-4">{content.description}</p>
              
              {/* Tags */}
              {content.tags && content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {content.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Engagement Buttons */}
          <div className="flex items-center space-x-6 py-4 border-y">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : ''}`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
              <span className="hidden sm:inline">
                {language === 'am' ? 'ወደድኩ' : 'Like'}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{commentsCount}</span>
              <span className="hidden sm:inline">
                {language === 'am' ? 'አስተያየት' : 'Comment'}
              </span>
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="flex items-center space-x-2"
              >
                <Share2 className="w-5 h-5" />
                <span>{sharesCount}</span>
                <span className="hidden sm:inline">
                  {language === 'am' ? 'አጋራ' : 'Share'}
                </span>
              </Button>

              {/* Share Options */}
              {showShareOptions && (
                <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-10 min-w-48">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare('facebook')}
                      className="flex items-center space-x-2"
                    >
                      <Facebook className="w-4 h-4" />
                      <span>Facebook</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare('twitter')}
                      className="flex items-center space-x-2"
                    >
                      <Twitter className="w-4 h-4" />
                      <span>Twitter</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare('copy')}
                      className="flex items-center space-x-2"
                    >
                      <Link className="w-4 h-4" />
                      <span>Copy Link</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare('download')}
                      className="flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mt-6">
              <h4 className="font-semibold mb-4">
                {language === 'am' ? 'አስተያየቶች' : 'Comments'} ({commentsCount})
              </h4>

              {/* Add Comment */}
              {currentUser && (
                <div className="flex space-x-3 mb-6">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`} />
                    <AvatarFallback>{currentUser.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder={language === 'am' ? 'አስተያየትዎን ይፃፉ...' : 'Write your comment...'}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows={2}
                    />
                    <Button size="sm" onClick={handleAddComment} disabled={!commentText.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      {language === 'am' ? 'ላክ' : 'Post'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Comments List */}
              <ScrollArea className="max-h-64">
                <div className="space-y-4">
                  {content.comments?.map((comment: any) => (
                    <div key={comment.id} className="flex space-x-3">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.author}`} />
                        <AvatarFallback>{comment.author?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium text-sm mb-1">{comment.author}</p>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                          <span>{new Date(comment.created_at).toLocaleString()}</span>
                          <Button variant="ghost" size="sm" className="h-auto p-0">
                            <Heart className="w-3 h-3 mr-1" />
                            {comment.likes?.length || 0}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-auto p-0">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}