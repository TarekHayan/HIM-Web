import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Calendar, Clock, MapPin, GraduationCap, AlertCircle, Coffee, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SchedulePageProps {
    userRole: 'student' | 'teacher';
}

export default function SchedulePage({ userRole }: SchedulePageProps) {
    const { t } = useLanguage();

    const lectures = [
        { day: 'Monday', time: '09:00 AM - 11:00 AM', subject: 'Computer Science 101', location: 'Hall A', type: 'Lecture', instructor: 'Dr. Sarah Johnson' },
        { day: 'Monday', time: '12:00 PM - 02:00 PM', subject: 'Web Development', location: 'Lab 3', type: 'Lecture', instructor: 'Dr. Emily White' },
        { day: 'Tuesday', time: '10:00 AM - 12:00 PM', subject: 'Data Structures', location: 'Hall B', type: 'Lecture', instructor: 'Prof. Michael Chen' },
        { day: 'Wednesday', time: '09:00 AM - 11:00 AM', subject: 'Computer Science 101', location: 'Hall A', type: 'Lecture', instructor: 'Dr. Sarah Johnson' },
        { day: 'Thursday', time: '11:00 AM - 01:00 PM', subject: 'Database Systems', location: 'Hall C', type: 'Lecture', instructor: 'Prof. David Brown' },
    ];

    const sections = [
        { day: 'Tuesday', time: '01:00 PM - 03:00 PM', subject: 'Data Structures (Section)', location: 'Lab 1', type: 'Section', instructor: 'Eng. Ahmed Ali' },
        { day: 'Wednesday', time: '11:00 AM - 01:00 PM', subject: 'Web Development (Lab)', location: 'Lab 3', type: 'Lab', instructor: 'Eng. Mary Sameh' },
        { day: 'Thursday', time: '02:00 PM - 04:00 PM', subject: 'Database Systems (Lab)', location: 'Lab 2', type: 'Lab', instructor: 'Eng. Karim Omar' },
    ];

    const exams = [
        { date: '2025-11-15', time: '10:00 AM', subject: 'Midterm: Data Structures', location: 'Examination Hall 1', type: 'Midterm' },
        { date: '2025-11-20', time: '09:00 AM', subject: 'Midterm: Web Development', location: 'Lab 3', type: 'Practical' },
        { date: '2026-01-10', time: '09:00 AM', subject: 'Final: Computer Science 101', location: 'Main Hall', type: 'Final' },
    ];

    const holidays = [
        { date: '2025-10-06', name: 'Armed Forces Day', type: 'National Holiday' },
        { date: '2026-01-07', name: 'Coptic Christmas', type: 'Religious Holiday' },
        { date: '2026-01-25', name: 'Revolution Day', type: 'National Holiday' },
    ];

    const getDayBadgeColor = (day: string) => {
        switch (day) {
            case 'Monday': return 'bg-blue-100 text-blue-700';
            case 'Tuesday': return 'bg-green-100 text-green-700';
            case 'Wednesday': return 'bg-purple-100 text-purple-700';
            case 'Thursday': return 'bg-orange-100 text-orange-700';
            case 'Friday': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <Layout userRole={userRole}>
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl text-gray-900 mb-1">{t('schedule.title')}</h2>
                    <p className="text-gray-600">{t('schedule.subtitle')}</p>
                </div>

                <Tabs defaultValue="lectures" className="w-full">
                    <TabsList className="w-full sm:w-auto grid grid-cols-2 md:grid-cols-4 mb-4">
                        <TabsTrigger value="lectures" className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            {t('schedule.tabs.lectures')}
                        </TabsTrigger>
                        <TabsTrigger value="sections" className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {t('schedule.tabs.sections')}
                        </TabsTrigger>
                        <TabsTrigger value="exams" className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {t('schedule.tabs.exams')}
                        </TabsTrigger>
                        <TabsTrigger value="holidays" className="flex items-center gap-2">
                            <Coffee className="w-4 h-4" />
                            {t('schedule.tabs.holidays')}
                        </TabsTrigger>
                    </TabsList>

                    {/* Lectures Tab */}
                    <TabsContent value="lectures">
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[150px] text-start">{t('schedule.day')}</TableHead>
                                            <TableHead className="text-start">{t('schedule.time')}</TableHead>
                                            <TableHead className="text-start">{t('schedule.subject')}</TableHead>
                                            <TableHead className="text-start">{t('schedule.location')}</TableHead>
                                            {userRole === 'student' && <TableHead className="text-start">{t('schedule.instructor')}</TableHead>}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {lectures.map((item, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>
                                                    <Badge className={getDayBadgeColor(item.day)}>{item.day}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-gray-400" />
                                                        {item.time}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">{item.subject}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <MapPin className="w-4 h-4" />
                                                        {item.location}
                                                    </div>
                                                </TableCell>
                                                {userRole === 'student' && <TableCell>{item.instructor}</TableCell>}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Sections Tab */}
                    <TabsContent value="sections">
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[150px] text-start">{t('schedule.day')}</TableHead>
                                            <TableHead className="text-start">{t('schedule.time')}</TableHead>
                                            <TableHead className="text-start">{t('schedule.subject')}</TableHead>
                                            <TableHead className="text-start">{t('schedule.location')}</TableHead>
                                            {userRole === 'student' && <TableHead className="text-start">{t('schedule.instructor')}</TableHead>}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sections.map((item, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>
                                                    <Badge className={getDayBadgeColor(item.day)}>{item.day}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-gray-400" />
                                                        {item.time}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">{item.subject}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <MapPin className="w-4 h-4" />
                                                        {item.location}
                                                    </div>
                                                </TableCell>
                                                {userRole === 'student' && <TableCell>{item.instructor}</TableCell>}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Exams Tab */}
                    <TabsContent value="exams">
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[150px] text-start">{t('schedule.date')}</TableHead>
                                            <TableHead className="text-start">{t('schedule.time')}</TableHead>
                                            <TableHead className="text-start">{t('schedule.subject')}</TableHead>
                                            <TableHead className="text-start">{t('schedule.location')}</TableHead>
                                            <TableHead className="text-start">{t('schedule.type')}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {exams.map((item, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        {item.date}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-gray-400" />
                                                        {item.time}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">{item.subject}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <MapPin className="w-4 h-4" />
                                                        {item.location}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{item.type}</Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Holidays Tab */}
                    <TabsContent value="holidays">
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[150px] text-start">{t('schedule.date')}</TableHead>
                                            <TableHead className="text-start">{t('schedule.occasion')}</TableHead>
                                            <TableHead className="text-start">{t('schedule.type')}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {holidays.map((item, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        {item.date}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium text-lg">{item.name}</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">{item.type}</Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>
            </div>
        </Layout>
    );
}
