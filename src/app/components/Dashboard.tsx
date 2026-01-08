import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BookOpen, Calendar, MessageSquare, Award, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardProps {
  userRole: 'student' | 'teacher';
}

export default function Dashboard({ userRole }: DashboardProps) {
  const { t } = useLanguage();

  const studentStats = [
    { icon: BookOpen, label: t('dashboard.enrolledCourses'), value: '6', color: 'bg-blue-500' },
    { icon: Calendar, label: t('dashboard.upcomingClasses'), value: '4', color: 'bg-green-500' },
    { icon: MessageSquare, label: t('dashboard.unreadMessages'), value: '3', color: 'bg-purple-500' },
    { icon: Award, label: t('dashboard.averageGrade'), value: '85%', color: 'bg-yellow-500' },
  ];

  const teacherStats = [
    { icon: BookOpen, label: t('dashboard.activeCourses'), value: '4', color: 'bg-blue-500' },
    { icon: Users, label: t('dashboard.totalStudents'), value: '120', color: 'bg-green-500' },
    { icon: MessageSquare, label: t('dashboard.pendingMessages'), value: '8', color: 'bg-purple-500' },
    { icon: TrendingUp, label: t('dashboard.assignmentsToGrade'), value: '15', color: 'bg-orange-500' },
  ];

  const stats = userRole === 'student' ? studentStats : teacherStats;

  const upcomingClasses = [
    { course: 'Computer Science 101', time: 'Today, 10:00 AM', room: 'Room A-205' },
    { course: 'Data Structures', time: 'Today, 2:00 PM', room: 'Lab B-103' },
    { course: 'Web Development', time: 'Tomorrow, 9:00 AM', room: 'Room C-301' },
  ];

  const recentActivities = userRole === 'student'
    ? [
      { text: 'New assignment posted in Web Development', time: '2 hours ago' },
      { text: 'Grade updated for Computer Science Quiz', time: '5 hours ago' },
      { text: 'New announcement in Data Structures', time: '1 day ago' },
    ]
    : [
      { text: 'Student submitted assignment in Web Dev', time: '1 hour ago' },
      { text: 'New message from John Doe', time: '3 hours ago' },
      { text: 'Attendance marked for CS101', time: '5 hours ago' },
    ];

  return (
    <Layout userRole={userRole}>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl text-gray-900 mb-1">
            {t('dashboard.welcome')}, {userRole === 'student' ? t('dashboard.student') : t('dashboard.professor')}!
          </h2>
          <p className="text-sm sm:text-base text-gray-600">{t('dashboard.subtitle')}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl sm:text-3xl text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Upcoming Classes */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                {t('dashboard.upcomingClassesTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {upcomingClasses.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-blue-50 rounded-lg gap-2 sm:gap-0">
                    <div>
                      <p className="text-sm sm:text-base text-gray-900">{item.course}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{item.time}</p>
                    </div>
                    <div className="text-xs sm:text-sm text-blue-600">{item.room}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                {t('dashboard.recentActivity')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 sm:mt-2"></div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-xs sm:text-sm">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}