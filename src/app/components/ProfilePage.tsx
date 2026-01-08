import { useState } from 'react';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Lock, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProfilePageProps {
    userRole: 'student' | 'teacher';
}

export default function ProfilePage({ userRole }: ProfilePageProps) {
    const { t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);

    // Mock initial data
    const [profile, setProfile] = useState({
        name: userRole === 'student' ? 'Ahmed Mohamed' : 'Dr. Sarah Johnson',
        email: userRole === 'student' ? 'student@university.edu' : 'teacher@university.edu',
        phone: '+20 123 456 7890',
        address: 'Cairo, Egypt',
        role: userRole === 'student' ? 'Student' : 'Professor',
    });

    return (
        <Layout userRole={userRole}>
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl text-gray-900 mb-1">{t('profile.title')}</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Profile Card */}
                    <Card className="border-0 shadow-sm md:w-1/3 h-fit">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white shadow-lg">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="bg-blue-600 text-white text-4xl">
                                        {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="absolute bottom-0 end-0 rounded-full shadow-md w-8 h-8 sm:w-10 sm:h-10"
                                >
                                    <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                                </Button>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-1">{profile.name}</h3>
                            <p className="text-gray-500 text-sm mb-4">{profile.role}</p>

                            <div className="w-full space-y-3 text-start">
                                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <Mail className="w-4 h-4 text-blue-500" />
                                    <span className="truncate">{profile.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <Phone className="w-4 h-4 text-green-500" />
                                    <span>{profile.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <MapPin className="w-4 h-4 text-orange-500" />
                                    <span>{profile.address}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Edit Forms */}
                    <div className="flex-1">
                        <Tabs defaultValue="personal" className="w-full">
                            <TabsList className="w-full sm:w-auto grid grid-cols-2 mb-4">
                                <TabsTrigger value="personal" className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {t('profile.personalInfo')}
                                </TabsTrigger>
                                <TabsTrigger value="security" className="flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    {t('profile.security')}
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="personal">
                                <Card className="border-0 shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{t('profile.editProfile')}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">{t('profile.fullName')}</label>
                                                <Input
                                                    value={profile.name}
                                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">{t('profile.email')}</label>
                                                <Input
                                                    value={profile.email}
                                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">{t('profile.phone')}</label>
                                                <Input
                                                    value={profile.phone}
                                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">{t('profile.address')}</label>
                                                <Input
                                                    value={profile.address}
                                                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end pt-4">
                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                                <Save className="w-4 h-4 me-2" />
                                                {t('profile.saveChanges')}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="security">
                                <Card className="border-0 shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{t('profile.changePassword')}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-4 max-w-lg">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">{t('profile.currentPassword')}</label>
                                                <Input type="password" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">{t('profile.newPassword')}</label>
                                                <Input type="password" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">{t('profile.confirmPassword')}</label>
                                                <Input type="password" />
                                            </div>
                                        </div>
                                        <div className="flex justify-end pt-4">
                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                                <Save className="w-4 h-4 me-2" />
                                                {t('profile.updatePassword')}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
