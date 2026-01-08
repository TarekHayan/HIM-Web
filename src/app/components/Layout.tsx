import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Home, BookOpen, MessageSquare, FileText, LogOut, GraduationCap, Menu, X, Languages, CreditCard, Library, User, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ChatBot from './ChatBot';

interface LayoutProps {
  children: ReactNode;
  userRole: 'student' | 'teacher';
}

export default function Layout({ children, userRole }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleLogout = () => {
    navigate('/');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('nav.dashboard') },
    { path: '/schedule', icon: Calendar, label: t('nav.schedule') },
    { path: '/lectures', icon: BookOpen, label: t('nav.lectures') },
    ...(userRole === 'student' ? [{ path: '/materials', icon: Library, label: t('nav.materials') }] : []),
    { path: '/communication', icon: MessageSquare, label: t('nav.messages') },
    { path: '/grades', icon: FileText, label: userRole === 'student' ? t('nav.grades') : t('nav.assignments') },
    ...(userRole === 'student' ? [{ path: '/payment', icon: CreditCard, label: t('nav.payment') }] : []),
    { path: '/profile', icon: User, label: t('nav.profile') },
  ];

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 hover:bg-blue-50'
              }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>

              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden p-0.5">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl text-gray-900 font-bold">HIM</h1>
                <p className="text-xs text-gray-500 capitalize hidden sm:block">
                  {userRole === 'student' ? t('header.studentDashboard') : t('header.teacherDashboard')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="text-xs sm:text-sm"
              >
                {language === 'en' ? 'AR' : 'EN'}
              </Button>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4 sm:me-2 rtl:rotate-180" />
                <span className="hidden sm:inline">{t('header.logout')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 start-0 h-full w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'ltr:-translate-x-full rtl:translate-x-full'
          }`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden p-0.5">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-semibold text-gray-900">HIM</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-5 h-5 transform rtl:rotate-180" />
            </Button>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          <NavLinks onClick={() => setIsMobileMenuOpen(false)} />
        </nav>
      </aside>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2 sticky top-20">
              <NavLinks />
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
      <ChatBot />
    </div>
  );
}