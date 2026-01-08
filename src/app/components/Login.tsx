import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { GraduationCap, User, Mail, Lock, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginProps {
  setUserRole: (role: 'student' | 'teacher') => void;
}

export default function Login({ setUserRole }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate a small network delay for a better UX feel
    await new Promise(resolve => setTimeout(resolve, 800));
    setUserRole(selectedRole);
    navigate('/dashboard');
    setIsLoading(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-[100px]" />

      {/* Language Toggle */}
      <div className="absolute top-6 end-6 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          className="bg-white/50 backdrop-blur-md border border-white/40 hover:bg-white/80 transition-all gap-2"
        >
          <Globe className="w-4 h-4" />
          <span className="font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
        </Button>
      </div>

      <div className="w-full max-w-md p-6 relative z-10 transition-all duration-500 ease-in-out">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-lg shadow-blue-500/10 mb-6 p-3 ring-1 ring-black/5 transform hover:scale-105 transition-transform duration-300">
            <img src="/logo.jpg" alt="HIM Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-500 text-sm">{t('login.subtitle')}</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl ring-1 ring-black/5 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-xl font-semibold text-center">{t('login.heading')}</CardTitle>
            <CardDescription className="text-center text-slate-500">
              {t('login.description')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`relative p-4 rounded-xl border transition-all duration-200 flex flex-col items-center gap-3 group
                    ${selectedRole === 'student' 
                      ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm' 
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-600'
                    }`}
                >
                  <div className={`p-2 rounded-full transition-colors ${selectedRole === 'student' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:text-blue-500'}`}>
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{t('login.student')}</span>
                  {selectedRole === 'student' && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => setSelectedRole('teacher')}
                  className={`relative p-4 rounded-xl border transition-all duration-200 flex flex-col items-center gap-3 group
                    ${selectedRole === 'teacher' 
                      ? 'border-purple-500 bg-purple-50/50 text-purple-700 shadow-sm' 
                      : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50 text-slate-600'
                    }`}
                >
                  <div className={`p-2 rounded-full transition-colors ${selectedRole === 'teacher' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500 group-hover:text-purple-500'}`}>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{t('login.teacher')}</span>
                  {selectedRole === 'teacher' && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500" />
                  )}
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('login.email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={selectedRole === 'student' ? t('login.emailPlaceholder.student') : 'teacher@example.com'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-9 h-11 bg-white/50 border-slate-200 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t('login.password')}</Label>
                    <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-9 h-11 bg-white/50 border-slate-200 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                className={`w-full h-11 text-base font-medium shadow-lg transition-all
                  ${selectedRole === 'student' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-blue-500/25' 
                    : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 shadow-purple-500/25'
                  }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {t('login.button')} {selectedRole === 'student' ? t('login.student') : t('login.teacher')}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center mt-8 text-sm text-slate-500">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Contact Administration
          </a>
        </p>
      </div>
    </div>
  );
}