import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Bot, Send, X, MessageCircle, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useNavigate } from 'react-router-dom';

export default function ChatBot() {
    const { t, language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Initial greeting
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{ text: t('zza.greeting'), isBot: true }]);
        }
    }, [t, messages.length]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue;
        setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
        setInputValue('');

        // Simulate AI delay
        setTimeout(() => {
            let botResponse = '';
            const lowerMsg = userMessage.toLowerCase();

            // Simple mocked logic
            if (lowerMsg.includes('schedule') || lowerMsg.includes('lecture') || lowerMsg.includes('جدول') || lowerMsg.includes('محاضرة')) {
                botResponse = language === 'ar'
                    ? 'يمكنك الاطلاع على جدول المحاضرات في صفحة "المحاضرات". هل تريد مني نقلك إلى هناك؟'
                    : 'You can check your lecture schedule on the "Lectures" page. Would you like me to take you there?';
                // In a real app, we could add action buttons here
            } else if (lowerMsg.includes('grade') || lowerMsg.includes('result') || lowerMsg.includes('درجة') || lowerMsg.includes('نتيجة')) {
                botResponse = language === 'ar'
                    ? 'درجاتك متاحة في صفحة "الدرجات". تذكر أن الاجتهاد هو مفتاح النجاح!'
                    : 'Your grades are available on the "Grades" page. Remember, hard work is the key to success!';
            } else if (lowerMsg.includes('payment') || lowerMsg.includes('fee') || lowerMsg.includes('دفع') || lowerMsg.includes('رسوم')) {
                botResponse = language === 'ar'
                    ? 'للاستعلام عن الرسوم الدراسية ودفعها، يرجى زيارة قسم "المدفوعات".'
                    : 'To inquire about and pay tuition fees, please visit the "Payments" section.';
            } else if (lowerMsg.includes('book') || lowerMsg.includes('material') || lowerMsg.includes('كتاب') || lowerMsg.includes('مرجع')) {
                botResponse = language === 'ar'
                    ? 'المواد الدراسية والكتب متاحة في قسم "المواد الدراسية".'
                    : 'Study materials and books are available in the "Study Materials" section.';
            } else {
                botResponse = language === 'ar'
                    ? 'هذا سؤال مثير للاهتمام! بصفتي مساعدًا ذكيًا خاصًا بالكلية، يمكنني مساعدتك في الأمور الأكاديمية. جرب أن تسألني عن الجداول أو الدرجات.'
                    : 'That\'s an interesting question! As the college AI assistant, I can help you with academic matters. Try asking me about schedules or grades.';
            }

            setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 end-6 z-50 flex flex-col items-end gap-4">
            {isOpen && (
                <Card className="w-80 sm:w-96 shadow-2xl border-blue-100 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-xl flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-bold">Azza</CardTitle>
                                <p className="text-xs text-blue-100 opacity-90">AI Assistant</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20 rounded-full h-8 w-8"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 h-96 flex flex-col bg-white">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex gap-2 ${msg.isBot ? 'flex-row' : 'flex-row-reverse'}`}
                                >
                                    <Avatar className="w-8 h-8 flex-shrink-0">
                                        {msg.isBot ? (
                                            <AvatarFallback className="bg-blue-600 text-white"><Bot className="w-4 h-4" /></AvatarFallback>
                                        ) : (
                                            <AvatarFallback className="bg-gray-200 text-gray-700"><User className="w-4 h-4" /></AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.isBot
                                                ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                                : 'bg-blue-600 text-white rounded-tr-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-3 border-t border-gray-100 bg-white">
                            <div className="flex gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={t('zza.placeholder')}
                                    className="flex-1 border-gray-200 focus:border-blue-500 rounded-full px-4"
                                />
                                <Button
                                    onClick={handleSend}
                                    size="icon"
                                    className="rounded-full bg-blue-600 hover:bg-blue-700 w-10 h-10 shadow-sm"
                                    disabled={!inputValue.trim()}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${isOpen ? 'bg-gray-200 text-gray-600 rotate-90 scale-90' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-8 h-8" />}
            </Button>
        </div>
    );
}
