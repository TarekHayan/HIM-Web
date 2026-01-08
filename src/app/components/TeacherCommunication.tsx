import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Search, Send, Paperclip } from 'lucide-react';
import { X, Megaphone } from 'lucide-react';

interface TeacherCommunicationProps {
  userRole: 'student' | 'teacher';
}

export default function TeacherCommunication({ userRole }: TeacherCommunicationProps) {
  const { t } = useLanguage();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(0);
  const [messageText, setMessageText] = useState('');

  const conversations = userRole === 'student'
    ? [
      {
        id: 0,
        name: 'Dr. Sarah Johnson',
        course: 'Computer Science 101',
        lastMessage: 'I reviewed your assignment. Great work!',
        time: '2h ago',
        unread: 2,
        initials: 'SJ',
      },
      {
        id: 1,
        name: 'Prof. Michael Chen',
        course: 'Data Structures',
        lastMessage: 'Office hours tomorrow at 3 PM',
        time: '5h ago',
        unread: 0,
        initials: 'MC',
      },
      {
        id: 2,
        name: 'Dr. Emily White',
        course: 'Web Development',
        lastMessage: 'The project deadline has been extended',
        time: '1d ago',
        unread: 1,
        initials: 'EW',
      },
    ]
    : [
      {
        id: 0,
        name: 'John Doe',
        course: 'Computer Science 101',
        lastMessage: 'Could you clarify the assignment requirements?',
        time: '1h ago',
        unread: 1,
        initials: 'JD',
      },
      {
        id: 1,
        name: 'Jane Smith',
        course: 'Web Development',
        lastMessage: 'Thank you for the feedback!',
        time: '3h ago',
        unread: 0,
        initials: 'JS',
      },
      {
        id: 2,
        name: 'Mike Wilson',
        course: 'Data Structures',
        lastMessage: 'Will there be a makeup exam?',
        time: '6h ago',
        unread: 2,
        initials: 'MW',
      },
    ];

  const BROADCAST_ID = -1;

  const messages = selectedConversation === BROADCAST_ID ? [] : [
    {
      sender: conversations[selectedConversation as number]?.name,
      text: conversations[selectedConversation as number]?.lastMessage,
      time: conversations[selectedConversation as number]?.time,
      isMe: false,
    },
    {
      sender: t('comm.you'),
      text: 'Thank you! I appreciate your feedback.',
      isMe: true,
    },
    {
      sender: conversations[selectedConversation as number].name,
      text: 'Keep up the good work! Let me know if you have any questions.',
      time: '30m ago',
      isMe: false,
    },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, send the message
      setMessageText('');
    }
  };

  return (
    <Layout userRole={userRole}>
      <Card className="border-0 shadow-sm h-[calc(100vh-10rem)] sm:h-[calc(100vh-12rem)]">
        <div className="flex h-full flex-col sm:flex-row">
          {/* Conversations List */}
          <div className={`w-full sm:w-80 border-b sm:border-b-0 sm:border-e border-gray-200 ${selectedConversation !== null && 'hidden sm:block'}`}>
            <CardHeader className="border-b border-gray-200 p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">{t('comm.messages')}</CardTitle>
              <div className="relative mt-3 sm:mt-4">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                <Input
                  placeholder={t('comm.searchPlaceholder')}
                  className="px-9 sm:px-10 text-sm"
                />
              </div>
            </CardHeader>
            <div className="overflow-y-auto h-[calc(100%-7rem)] sm:h-[calc(100%-8rem)]">
              {userRole === 'teacher' && (
                <div
                  onClick={() => setSelectedConversation(BROADCAST_ID)}
                  className={`p-3 sm:p-4 border-b border-gray-100 cursor-pointer hover:bg-orange-50 transition-colors ${selectedConversation === BROADCAST_ID ? 'bg-orange-50' : ''
                    }`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                      <AvatarFallback className="bg-orange-500 text-white text-xs sm:text-sm">
                        📢
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs sm:text-sm text-gray-900 truncate font-semibold">{t('comm.broadcast')}</p>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{t('comm.sendToAll')}</p>
                    </div>
                  </div>
                </div>
              )}
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`p-3 sm:p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation === conv.id ? 'bg-blue-50' : ''
                    }`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                      <AvatarFallback className="bg-blue-500 text-white text-xs sm:text-sm">
                        {conv.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs sm:text-sm text-gray-900 truncate">{conv.name}</p>
                        <span className="text-xs text-gray-500">{conv.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1 truncate">{conv.course}</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="bg-blue-500 text-white text-xs">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${selectedConversation === null && 'hidden sm:flex'}`}>
            <CardHeader className="border-b border-gray-200 p-3 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="sm:hidden"
                  onClick={() => setSelectedConversation(null as any)}
                >
                  <X className="w-4 h-4" />
                </Button>
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                  <AvatarFallback className={`${selectedConversation === BROADCAST_ID ? 'bg-orange-500' : 'bg-blue-500'} text-white text-xs sm:text-sm`}>
                    {selectedConversation === BROADCAST_ID ? '📢' : (selectedConversation !== null ? conversations[selectedConversation].initials : '')}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-sm sm:text-lg truncate">
                    {selectedConversation === BROADCAST_ID
                      ? t('comm.broadcast')
                      : (selectedConversation !== null ? conversations[selectedConversation].name : '')}
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {selectedConversation === BROADCAST_ID
                      ? t('comm.announcementTitle')
                      : (selectedConversation !== null ? conversations[selectedConversation].course : '')}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-3 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-md rounded-lg p-3 sm:p-4 ${message.isMe
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                        }`}
                    >
                      <p className="text-xs sm:text-sm mb-1">{message.text}</p>
                      <p className={`text-xs ${message.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
                {selectedConversation === BROADCAST_ID && messages.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <p>{t('comm.announcementTitle')}</p>
                  </div>
                )}
              </div>
            </CardContent>

            <div className="border-t border-gray-200 p-3 sm:p-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="shrink-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Textarea
                  placeholder={selectedConversation === BROADCAST_ID ? t('comm.sendToAll') : t('comm.typePlaceholder')}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="resize-none text-sm"
                  rows={1}
                />
                <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600 shrink-0" size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
}