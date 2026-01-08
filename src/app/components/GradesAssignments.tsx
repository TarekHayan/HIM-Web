import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, Download, Upload, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface GradesAssignmentsProps {
  userRole: 'student' | 'teacher';
}

export default function GradesAssignments({ userRole }: GradesAssignmentsProps) {
  const { t } = useLanguage();
  const studentGrades = [
    { course: 'Computer Science 101', assignment: 'Midterm Exam', grade: 92, maxGrade: 100, date: '2025-12-15' },
    { course: 'Data Structures', assignment: 'Project 1', grade: 88, maxGrade: 100, date: '2025-12-20' },
    { course: 'Web Development', assignment: 'React Assignment', grade: 95, maxGrade: 100, date: '2026-01-05' },
    { course: 'Database Systems', assignment: 'SQL Quiz', grade: 85, maxGrade: 100, date: '2025-12-28' },
  ];

  const studentAssignments = [
    {
      course: 'Computer Science 101',
      title: 'Algorithm Analysis',
      dueDate: '2026-01-10',
      status: 'pending',
      points: 100
    },
    {
      course: 'Web Development',
      title: 'Final Project',
      dueDate: '2026-01-15',
      status: 'pending',
      points: 200
    },
    {
      course: 'Data Structures',
      title: 'Binary Tree Implementation',
      dueDate: '2026-01-08',
      status: 'submitted',
      points: 150
    },
  ];

  const teacherAssignments = [
    {
      course: 'Computer Science 101',
      title: 'Algorithm Analysis',
      submissions: 35,
      totalStudents: 45,
      dueDate: '2026-01-10',
      graded: 20,
    },
    {
      course: 'Web Development',
      title: 'React Component Project',
      submissions: 48,
      totalStudents: 52,
      dueDate: '2026-01-12',
      graded: 30,
    },
    {
      course: 'Data Structures',
      title: 'Binary Search Tree',
      submissions: 38,
      totalStudents: 38,
      dueDate: '2026-01-08',
      graded: 38,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100"><Clock className="w-3 h-3 me-1" /> {t('grades.pending')}</Badge>;
      case 'submitted':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100"><Upload className="w-3 h-3 me-1" /> {t('grades.submitted')}</Badge>;
      case 'graded':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100"><CheckCircle className="w-3 h-3 me-1" /> {t('grades.graded')}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const calculateGPA = () => {
    const total = studentGrades.reduce((sum, g) => sum + (g.grade / g.maxGrade), 0);
    return ((total / studentGrades.length) * 4).toFixed(2);
  };

  return (
    <Layout userRole={userRole}>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl text-gray-900 mb-1">
            {userRole === 'student' ? t('grades.title.student') : t('grades.title.teacher')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {userRole === 'student'
              ? t('grades.subtitle.student')
              : t('grades.subtitle.teacher')}
          </p>
        </div>

        {userRole === 'student' ? (
          <>
            {/* Student Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('grades.currentGPA')}</p>
                      <p className="text-2xl sm:text-3xl text-gray-900">{calculateGPA()}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('grades.assignmentsDue')}</p>
                      <p className="text-2xl sm:text-3xl text-gray-900">
                        {studentAssignments.filter(a => a.status === 'pending').length}
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('grades.avgScore')}</p>
                      <p className="text-2xl sm:text-3xl text-gray-900">
                        {Math.round(studentGrades.reduce((sum, g) => sum + (g.grade / g.maxGrade) * 100, 0) / studentGrades.length)}%
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="grades" className="space-y-3 sm:space-y-4">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="grades" className="flex-1 sm:flex-none text-sm">{t('grades.gradesTab')}</TabsTrigger>
                <TabsTrigger value="assignments" className="flex-1 sm:flex-none text-sm">{t('grades.assignmentsTab')}</TabsTrigger>
              </TabsList>

              <TabsContent value="grades">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">{t('grades.recentGrades')}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 sm:p-6 sm:pt-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm">{t('grades.course')}</TableHead>
                            <TableHead className="text-xs sm:text-sm">{t('grades.assignment')}</TableHead>
                            <TableHead className="text-xs sm:text-sm">{t('grades.grade')}</TableHead>
                            <TableHead className="text-xs sm:text-sm">{t('grades.percentage')}</TableHead>
                            <TableHead className="text-xs sm:text-sm">{t('grades.date')}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentGrades.map((grade, index) => (
                            <TableRow key={index}>
                              <TableCell className="text-xs sm:text-sm">{grade.course}</TableCell>
                              <TableCell className="text-xs sm:text-sm">{grade.assignment}</TableCell>
                              <TableCell className="text-xs sm:text-sm">{grade.grade}/{grade.maxGrade}</TableCell>
                              <TableCell>
                                <Badge className={
                                  (grade.grade / grade.maxGrade) >= 0.9 ? 'bg-green-100 text-green-700 text-xs' :
                                    (grade.grade / grade.maxGrade) >= 0.8 ? 'bg-blue-100 text-blue-700 text-xs' :
                                      'bg-yellow-100 text-yellow-700 text-xs'
                                }>
                                  {Math.round((grade.grade / grade.maxGrade) * 100)}%
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs sm:text-sm">{grade.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignments">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">{t('grades.upcomingAssignments')}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="space-y-3 sm:space-y-4">
                      {studentAssignments.map((assignment, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 rounded-lg gap-3 sm:gap-0">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                              <h4 className="text-sm sm:text-base text-gray-900">{assignment.title}</h4>
                              {getStatusBadge(assignment.status)}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">{assignment.course}</p>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">{t('grades.due')}: {assignment.dueDate} • {assignment.points} {t('grades.points')}</p>
                          </div>
                          <div className="flex gap-2">
                            {assignment.status === 'pending' ? (
                              <Button className="bg-blue-500 hover:bg-blue-600 text-xs sm:text-sm flex-1 sm:flex-none">
                                <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2" />
                                {t('grades.submit')}
                              </Button>
                            ) : (
                              <Button variant="outline" className="text-xs sm:text-sm flex-1 sm:flex-none">
                                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2" />
                                {t('grades.view')}
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <>
            {/* Teacher View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('grades.totalAssignments')}</p>
                      <p className="text-2xl sm:text-3xl text-gray-900">{teacherAssignments.length}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('grades.toGrade')}</p>
                      <p className="text-2xl sm:text-3xl text-gray-900">
                        {teacherAssignments.reduce((sum, a) => sum + (a.submissions - a.graded), 0)}
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('grades.graded')}</p>
                      <p className="text-2xl sm:text-3xl text-gray-900">
                        {teacherAssignments.reduce((sum, a) => sum + a.graded, 0)}
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 gap-3 sm:gap-0">
                <CardTitle className="text-base sm:text-lg">{t('grades.assignmentOverview')}</CardTitle>
                <Button className="bg-blue-500 hover:bg-blue-600 text-xs sm:text-sm w-full sm:w-auto">
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2" />
                  {t('grades.createAssignment')}
                </Button>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">{t('grades.course')}</TableHead>
                        <TableHead className="text-xs sm:text-sm">{t('grades.assignment')}</TableHead>
                        <TableHead className="text-xs sm:text-sm">{t('grades.submissions')}</TableHead>
                        <TableHead className="text-xs sm:text-sm">{t('grades.dueDate')}</TableHead>
                        <TableHead className="text-xs sm:text-sm min-w-[150px]">{t('grades.gradingProgress')}</TableHead>
                        <TableHead className="text-xs sm:text-sm">{t('grades.action')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teacherAssignments.map((assignment, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-xs sm:text-sm">{assignment.course}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{assignment.title}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{assignment.submissions}/{assignment.totalStudents}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{assignment.dueDate}</TableCell>
                          <TableCell>
                            <div className="space-y-1 min-w-[120px]">
                              <div className="flex items-center justify-between text-xs sm:text-sm">
                                <span className="text-gray-600">{assignment.graded}/{assignment.submissions}</span>
                                <span className="text-gray-900">{Math.round((assignment.graded / assignment.submissions) * 100)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${(assignment.graded / assignment.submissions) * 100}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                              {t('grades.gradeButton')}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
}