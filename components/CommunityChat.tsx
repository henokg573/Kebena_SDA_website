import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Send, 
  Smile, 
  Paperclip, 
  Phone, 
  Video, 
  Users, 
  Settings,
  Search,
  MoreVertical,
  UserPlus,
  Shield
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

interface CommunityChatProps {
  currentUser: any;
  communities: any[];
  messages: any[];
  selectedCommunity: string | null;
  onSelectCommunity: (communityId: string) => void;
  onSendMessage: (content: string, communityId?: string, recipientId?: string) => void;
  onJoinCommunity: (communityId: string) => void;
  onCreateCommunity?: (form: any) => void;
}

export function CommunityChat({
  currentUser,
  communities,
  messages,
  selectedCommunity,
  onSelectCommunity,
  onSendMessage,
  onJoinCommunity,
  onCreateCommunity
}: CommunityChatProps) {
  const { language } = useLanguage();
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCommunityForm, setNewCommunityForm] = useState({
    name: '',
    description: '',
    type: 'public',
    rules: []
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedCommunityData = communities.find(c => c.id === selectedCommunity);
  const communityMessages = messages.filter(m => m.communityId === selectedCommunity);

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [communityMessages]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedCommunity) return;
    
    onSendMessage(messageText, selectedCommunity);
    setMessageText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCreateCommunity = () => {
    if (!currentUser || currentUser.role !== 'super_admin') {
      toast.error(language === 'am' ? 'ፈቃድ የለዎትም' : 'Permission denied');
      return;
    }
    
    if (!newCommunityForm.name.trim() || !newCommunityForm.description.trim()) {
      toast.error(language === 'am' ? 'ሁሉም ክፍሎችን ይሙሉ' : 'Fill all fields');
      return;
    }

    onCreateCommunity?.(newCommunityForm);
    setNewCommunityForm({ name: '', description: '', type: 'public', rules: [] });
    setShowCreateForm(false);
  };

  const isMember = (community: any) => {
    return community.members?.includes(currentUser?.id);
  };

  const isModerator = (community: any) => {
    return community.moderators?.includes(currentUser?.id);
  };

  return (
    <div className="flex h-[600px] bg-white border rounded-lg overflow-hidden">
      {/* Communities Sidebar */}
      <div className="w-80 border-r bg-gray-50">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">
              {language === 'am' ? 'ማህበረሰቦች' : 'Communities'}
            </h3>
            {currentUser?.role === 'super_admin' && (
              <Button
                size="sm"
                onClick={() => setShowCreateForm(true)}
                className="h-8"
              >
                <UserPlus className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder={language === 'am' ? 'ማህበረሰብ ፈልግ...' : 'Search communities...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredCommunities.map((community) => (
              <div
                key={community.id}
                className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                  selectedCommunity === community.id 
                    ? 'bg-blue-100 border-blue-200' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => onSelectCommunity(community.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-medium">
                    {community.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-sm truncate">{community.name}</h4>
                      {community.type === 'private' && (
                        <Shield className="w-3 h-3 text-gray-400" />
                      )}
                      {isModerator(community) && (
                        <Badge variant="outline" className="text-xs">Mod</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{community.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        <Users className="w-3 h-3 inline mr-1" />
                        {community.members?.length || 0} members
                      </span>
                      {!isMember(community) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onJoinCommunity(community.id);
                          }}
                          className="h-6 text-xs"
                        >
                          {language === 'am' ? 'ተቀላቀል' : 'Join'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedCommunityData ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-medium">
                  {selectedCommunityData.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium">{selectedCommunityData.name}</h4>
                  <p className="text-sm text-gray-500">
                    {selectedCommunityData.members?.length || 0} members • 
                    {selectedCommunityData.messageCount || 0} messages
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Video className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {communityMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${message.senderName}`} />
                      <AvatarFallback className="text-xs">
                        {message.senderName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{message.senderName}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {/* Message reactions */}
                      {Object.keys(message.reactions || {}).length > 0 && (
                        <div className="flex items-center space-x-1 mt-2">
                          {Object.entries(message.reactions).map(([emoji, users]) => (
                            <Badge key={emoji} variant="secondary" className="text-xs">
                              {emoji} {(users as string[]).length}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-end space-x-2">
                <Button size="sm" variant="ghost">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Smile className="w-4 h-4" />
                </Button>
                <Textarea
                  placeholder={language === 'am' ? 'መልእክት ይፃፉ...' : 'Type a message...'}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows={1}
                  className="flex-1 resize-none"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!messageText.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="font-medium mb-2">
                {language === 'am' ? 'ማህበረሰብ ይምረጡ' : 'Select a Community'}
              </h3>
              <p className="text-sm">
                {language === 'am' 
                  ? 'ውይይት ለመጀመር ማህበረሰብ ይምረጡ' 
                  : 'Choose a community to start chatting'
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Create Community Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                {language === 'am' ? 'አዲስ ማህበረሰብ ፍጠር' : 'Create New Community'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder={language === 'am' ? 'የማህበረሰብ ስም' : 'Community name'}
                value={newCommunityForm.name}
                onChange={(e) => setNewCommunityForm({
                  ...newCommunityForm,
                  name: e.target.value
                })}
              />
              <Textarea
                placeholder={language === 'am' ? 'መግለጫ' : 'Description'}
                value={newCommunityForm.description}
                onChange={(e) => setNewCommunityForm({
                  ...newCommunityForm,
                  description: e.target.value
                })}
                rows={3}
              />
              <div className="flex space-x-2">
                <Button onClick={handleCreateCommunity} className="flex-1">
                  {language === 'am' ? 'ፍጠር' : 'Create'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1"
                >
                  {language === 'am' ? 'ይቅር' : 'Cancel'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}