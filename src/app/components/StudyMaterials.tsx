import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Book, FileText, Download, Eye, Folder } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface StudyMaterialsProps {
    userRole: 'student' | 'teacher';
}

export default function StudyMaterials({ userRole }: StudyMaterialsProps) {
    const { t } = useLanguage();

    const courses = [
        {
            id: 1,
            title: 'Computer Science 101',
            professor: 'Dr. Sarah Johnson',
            initials: 'SJ',
            books: [
                { title: 'Introduction to Algorithms', size: '15 MB' },
                { title: 'Clean Code', size: '12 MB' },
            ],
            summaries: [
                { title: 'Week 1-4 Summary', date: '2025-09-20' },
                { title: 'Exam Revision Notes', date: '2025-12-10' },
            ],
        },
        {
            id: 2,
            title: 'Data Structures',
            professor: 'Prof. Michael Chen',
            initials: 'MC',
            books: [
                { title: 'Data Structures and Algorithms in Java', size: '18 MB' },
            ],
            summaries: [
                { title: 'Trees and Graphs', date: '2025-10-15' },
                { title: 'Sorting Algorithms Cheat Sheet', date: '2025-11-05' },
            ],
        },
        {
            id: 3,
            title: 'Web Development',
            professor: 'Dr. Emily White',
            initials: 'EW',
            books: [
                { title: 'Learning React', size: '10 MB' },
                { title: 'CSS Mastery', size: '25 MB' },
            ],
            summaries: [
                { title: 'React Hooks Guide', date: '2025-10-30' },
            ],
        },
    ];

    return (
        <Layout userRole={userRole}>
            <div className="space-y-4 sm:space-y-6">
                <div>
                    <h2 className="text-xl sm:text-2xl text-gray-900 mb-1">{t('materials.title')}</h2>
                    <p className="text-sm sm:text-base text-gray-600">{t('materials.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {courses.map((course) => (
                        <Card key={course.id} className="border-0 shadow-sm flex flex-col">
                            <CardHeader className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Folder className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <CardTitle className="text-base font-semibold text-gray-900 truncate" title={course.title}>
                                            {course.title}
                                        </CardTitle>
                                        <p className="text-xs text-gray-500">{t('materials.professor')}: {course.professor}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-5 flex-1 flex flex-col gap-4">

                                {/* Books Section */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                                        <Book className="w-4 h-4 text-blue-500" />
                                        {t('materials.books')}
                                    </h4>
                                    <div className="space-y-2">
                                        {course.books.map((book, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group">
                                                <div className="min-w-0 flex-1 me-2">
                                                    <p className="text-xs font-medium text-gray-700 truncate" title={book.title}>{book.title}</p>
                                                    <p className="text-[10px] text-gray-500">{book.size}</p>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 group-hover:text-blue-600">
                                                    <Download className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Summaries Section */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-orange-500" />
                                        {t('materials.summaries')}
                                    </h4>
                                    <div className="space-y-2">
                                        {course.summaries.map((summary, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group">
                                                <div className="min-w-0 flex-1 me-2">
                                                    <p className="text-xs font-medium text-gray-700 truncate" title={summary.title}>{summary.title}</p>
                                                    <p className="text-[10px] text-gray-500">{summary.date}</p>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 group-hover:text-blue-600">
                                                    <Eye className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
