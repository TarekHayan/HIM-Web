import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BookOpen, Clock, Users, Video, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LecturesPageProps {
  userRole: 'student' | 'teacher';
}

export default function LecturesPage({ userRole }: LecturesPageProps) {
  const { t } = useLanguage();
  const courses = [
    {
      id: 1,
      title: 'Computer Science 101',
      instructor: 'Dr. Sarah Johnson',
      students: 45,
      schedule: 'Mon, Wed, Fri 10:00 AM',
      progress: 65,
      nextClass: 'Introduction to Algorithms',
      status: 'active',
    },
    {
      id: 2,
      title: 'Data Structures',
      instructor: 'Prof. Michael Chen',
      students: 38,
      schedule: 'Tue, Thu 2:00 PM',
      progress: 42,
      nextClass: 'Binary Search Trees',
      status: 'active',
    },
    {
      id: 3,
      title: 'Web Development',
      instructor: 'Dr. Emily White',
      students: 52,
      schedule: 'Mon, Wed 9:00 AM',
      progress: 78,
      nextClass: 'React Hooks Deep Dive',
      status: 'active',
    },
    {
      id: 4,
      title: 'Database Systems',
      instructor: 'Prof. David Brown',
      students: 41,
      schedule: 'Tue, Thu 11:00 AM',
      progress: 30,
      nextClass: 'SQL Joins and Relationships',
      status: 'active',
    },
  ];

  return (
    <Layout userRole={userRole}>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div>
            <h2 className="text-xl sm:text-2xl text-gray-900 mb-1">
              {userRole === 'student' ? t('lectures.myCourses') : t('lectures.teachingCourses')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {userRole === 'student' 
                ? t('lectures.subtitle.student')
                : t('lectures.subtitle.teacher')}
            </p>
          </div>
          {userRole === 'teacher' && (
            <Button className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto text-sm sm:text-base">
              <BookOpen className="w-4 h-4 mr-2" />
              {t('lectures.createCourse')}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg mb-2 truncate">{course.title}</CardTitle>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{course.instructor}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs sm:text-sm shrink-0">
                    {t('lectures.active')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>{course.students} {userRole === 'student' ? t('lectures.studentsEnrolled') : t('lectures.students')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">{t('lectures.next')}: {course.nextClass}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm text-gray-600">{t('lectures.courseProgress')}</span>
                    <span className="text-xs sm:text-sm text-gray-900">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button variant="outline" className="flex-1 text-xs sm:text-sm">
                    <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                    {t('lectures.joinClass')}
                  </Button>
                  <Button variant="outline" className="flex-1 text-xs sm:text-sm">
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                    {t('lectures.materials')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}