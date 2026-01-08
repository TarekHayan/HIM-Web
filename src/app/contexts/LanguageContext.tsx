import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.title': 'University Portal',
    'header.studentDashboard': 'Student Dashboard',
    'header.teacherDashboard': 'Teacher Dashboard',
    'header.logout': 'Logout',

    // Login
    'login.title': 'University Portal',
    'login.subtitle': 'Welcome back! Please login to continue',
    'login.heading': 'Login',
    'login.description': 'Select your role and enter credentials',
    'login.student': 'Student',
    'login.teacher': 'Teacher',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.emailPlaceholder.student': 'student@university.edu',
    'login.emailPlaceholder.teacher': 'teacher@university.edu',
    'login.passwordPlaceholder': 'Enter your password',
    'login.button': 'Login as',

    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.lectures': 'Lectures',
    'nav.materials': 'Study Materials',
    'nav.messages': 'Messages',
    'nav.profile': 'Profile',
    'nav.grades': 'Grades',
    'nav.assignments': 'Assignments',
    'nav.payment': 'Payments',
    'nav.menu': 'Menu',

    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.student': 'Student',
    'dashboard.professor': 'Professor',
    'dashboard.subtitle': "Here's what's happening in your courses today.",
    'dashboard.enrolledCourses': 'Enrolled Courses',
    'dashboard.upcomingClasses': 'Upcoming Classes',
    'dashboard.unreadMessages': 'Unread Messages',
    'dashboard.averageGrade': 'Average Grade',
    'dashboard.activeCourses': 'Active Courses',
    'dashboard.totalStudents': 'Total Students',
    'dashboard.pendingMessages': 'Pending Messages',
    'dashboard.assignmentsToGrade': 'Assignments to Grade',
    'dashboard.upcomingClassesTitle': 'Upcoming Classes',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.today': 'Today',
    'dashboard.tomorrow': 'Tomorrow',
    'dashboard.hoursAgo': 'hours ago',
    'dashboard.dayAgo': 'day ago',

    // Lectures
    'lectures.myCourses': 'My Courses',
    'lectures.teachingCourses': 'Teaching Courses',
    'lectures.subtitle.student': 'View and manage your enrolled courses',
    'lectures.subtitle.teacher': 'Manage your teaching schedule and materials',
    'lectures.createCourse': 'Create New Course',
    'lectures.active': 'active',
    'lectures.studentsEnrolled': 'students enrolled',
    'lectures.students': 'students',
    'lectures.next': 'Next',
    'lectures.courseProgress': 'Course Progress',
    'lectures.joinClass': 'Join Class',
    'lectures.materials': 'Materials',

    // Communication
    'comm.messages': 'Messages',
    'comm.searchPlaceholder': 'Search messages...',
    'comm.typePlaceholder': 'Type your message...',
    'comm.you': 'You',
    'comm.broadcast': 'Broadcast',
    'comm.announcementTitle': 'New Announcement',
    'comm.sendToAll': 'Send to all students',

    // Grades
    'grades.title.student': 'Grades & Assignments',
    'grades.title.teacher': 'Assignment Management',
    'grades.subtitle.student': 'Track your academic performance and upcoming assignments',
    'grades.subtitle.teacher': 'Review and grade student submissions',
    'grades.currentGPA': 'Current GPA',
    'grades.assignmentsDue': 'Assignments Due',
    'grades.avgScore': 'Avg. Score',
    'grades.totalAssignments': 'Total Assignments',
    'grades.toGrade': 'To Grade',
    'grades.graded': 'Graded',
    'grades.gradesTab': 'Grades',
    'grades.assignmentsTab': 'Assignments',
    'grades.recentGrades': 'Recent Grades',
    'grades.upcomingAssignments': 'Upcoming Assignments',
    'grades.assignmentOverview': 'Assignment Overview',
    'grades.createAssignment': 'Create Assignment',
    'grades.course': 'Course',
    'grades.assignment': 'Assignment',
    'grades.grade': 'Grade',
    'grades.percentage': 'Percentage',
    'grades.date': 'Date',
    'grades.submissions': 'Submissions',
    'grades.dueDate': 'Due Date',
    'grades.gradingProgress': 'Grading Progress',
    'grades.action': 'Action',
    'grades.gradeButton': 'Grade',
    'grades.submit': 'Submit',
    'grades.view': 'View',
    'grades.pending': 'Pending',
    'grades.submitted': 'Submitted',
    'grades.due': 'Due',
    'grades.points': 'points',

    // Payment
    'payment.title': 'Tuition & Payments',
    'payment.subtitle': 'Manage your tuition fees and payment history',
    'payment.totalDue': 'Total Due',
    'payment.due': 'Due',
    'payment.payNow': 'Pay Now',
    'payment.paymentMethods': 'Payment Methods',
    'payment.addMethod': 'Add Payment Method',
    'payment.expires': 'Expires',
    'payment.history': 'Transaction History',
    'payment.downloadStatement': 'Download Statement',
    'payment.invoice': 'Invoice',
    'payment.date': 'Date',
    'payment.description': 'Description',
    'payment.amount': 'Amount',
    'payment.status': 'Status',
    'payment.action': 'Action',
    'payment.status.paid': 'Paid',
    'payment.status.pending': 'Pending',
    'payment.status.overdue': 'Overdue',

    // Materials
    'materials.title': 'Course Materials',
    'materials.subtitle': 'Access books, notes, and summaries',
    'materials.professor': 'Professor',
    'materials.books': 'Books',
    'materials.summaries': 'Summaries',
    'materials.view': 'View',
    'materials.download': 'Download',

    // Profile
    'profile.title': 'My Profile',
    'profile.editProfile': 'Edit Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.security': 'Security',
    'profile.changePassword': 'Change Password',
    'profile.updatePassword': 'Update Password',
    'profile.fullName': 'Full Name',
    'profile.email': 'Email Address',
    'profile.phone': 'Phone Number',
    'profile.address': 'Address',
    'profile.currentPassword': 'Current Password',
    'profile.newPassword': 'New Password',
    'profile.confirmPassword': 'Confirm Password',
    'profile.saveChanges': 'Save Changes',

    // Azza AI
    'zza.greeting': 'Hello! I am Azza, your AI assistant. How can I help you today?',
    'zza.placeholder': 'Ask me anything...',
    'zza.send': 'Send',

    // Schedule
    'nav.schedule': 'Schedule',
    'schedule.title': 'Academic Schedule',
    'schedule.subtitle': 'View your lectures, sections, exams, and holidays',
    'schedule.tabs.lectures': 'Lectures',
    'schedule.tabs.sections': 'Sections',
    'schedule.tabs.exams': 'Exams',
    'schedule.tabs.holidays': 'Holidays',
    'schedule.day': 'Day',
    'schedule.time': 'Time',
    'schedule.subject': 'Subject',
    'schedule.location': 'Location',
    'schedule.date': 'Date',
    'schedule.type': 'Type',
    'schedule.occasion': 'Occasion',
    'schedule.instructor': 'Instructor',
  },
  ar: {
    // Header
    'header.title': 'بوابة الجامعة',
    'header.studentDashboard': 'لوحة تحكم الطالب',
    'header.teacherDashboard': 'لوحة تحكم الأستاذ',
    'header.logout': 'تسجيل الخروج',

    // Login
    'login.title': 'بوابة الجامعة',
    'login.subtitle': 'مرحباً بعودتك! يرجى تسجيل الدخول للمتابعة',
    'login.heading': 'تسجيل الدخول',
    'login.description': 'اختر دورك وأدخل بيانات الاعتماد',
    'login.student': 'طالب',
    'login.teacher': 'أستاذ',
    'login.email': 'البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.emailPlaceholder.student': 'student@university.edu',
    'login.emailPlaceholder.teacher': 'teacher@university.edu',
    'login.passwordPlaceholder': 'أدخل كلمة المرور',
    'login.button': 'تسجيل الدخول كـ',

    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.lectures': 'المحاضرات',
    'nav.materials': 'المواد الدراسية',
    'nav.messages': 'الرسائل',
    'nav.grades': 'الدرجات',
    'nav.profile': 'الملف الشخصي',
    'nav.assignments': 'الواجبات',
    'nav.payment': 'المدفوعات',
    'nav.menu': 'القائمة',

    // Dashboard
    'dashboard.welcome': 'مرحباً بعودتك',
    'dashboard.student': 'طالب',
    'dashboard.professor': 'أستاذ',
    'dashboard.subtitle': 'إليك ما يحدث في دوراتك اليوم.',
    'dashboard.enrolledCourses': 'الدورات المسجلة',
    'dashboard.upcomingClasses': 'الفصول القادمة',
    'dashboard.unreadMessages': 'الرسائل غير المقروءة',
    'dashboard.averageGrade': 'متوسط الدرجات',
    'dashboard.activeCourses': 'الدورات النشطة',
    'dashboard.totalStudents': 'إجمالي الطلاب',
    'dashboard.pendingMessages': 'الرسائل المعلقة',
    'dashboard.assignmentsToGrade': 'واجبات للتصحيح',
    'dashboard.upcomingClassesTitle': 'الفصول القادمة',
    'dashboard.recentActivity': 'النشاط الأخير',
    'dashboard.today': 'اليوم',
    'dashboard.tomorrow': 'غداً',
    'dashboard.hoursAgo': 'منذ ساعات',
    'dashboard.dayAgo': 'منذ يوم',

    // Lectures
    'lectures.myCourses': 'دوراتي',
    'lectures.teachingCourses': 'دورات التدريس',
    'lectures.subtitle.student': 'عرض وإدارة الدورات المسجلة',
    'lectures.subtitle.teacher': 'إدارة جدول التدريس والمواد',
    'lectures.createCourse': 'إنشاء دورة جديدة',
    'lectures.active': 'نشط',
    'lectures.studentsEnrolled': 'طالب مسجل',
    'lectures.students': 'طلاب',
    'lectures.next': 'التالي',
    'lectures.courseProgress': 'تقدم الدورة',
    'lectures.joinClass': 'الانضمام للفصل',
    'lectures.materials': 'المواد',

    // Communication
    'comm.messages': 'الرسائل',
    'comm.searchPlaceholder': 'بحث في الرسائل...',
    'comm.typePlaceholder': 'اكتب رسالتك...',
    'comm.you': 'أنت',
    'comm.broadcast': 'إرسال للجميع',
    'comm.announcementTitle': 'إعلان جديد',
    'comm.sendToAll': 'إرسال لجميع الطلاب',

    // Grades
    'grades.title.student': 'الدرجات والواجبات',
    'grades.title.teacher': 'إدارة الواجبات',
    'grades.subtitle.student': 'تتبع أدائك الأكاديمي والواجبات القادمة',
    'grades.subtitle.teacher': 'مراجعة وتصحيح تقديمات الطلاب',
    'grades.currentGPA': 'المعدل التراكمي الحالي',
    'grades.assignmentsDue': 'واجبات مستحقة',
    'grades.avgScore': 'متوسط الدرجة',
    'grades.totalAssignments': 'إجمالي الواجبات',
    'grades.toGrade': 'للتصحيح',
    'grades.graded': 'مصحح',
    'grades.gradesTab': 'الدرجات',
    'grades.assignmentsTab': 'الواجبات',
    'grades.recentGrades': 'الدرجات الأخيرة',
    'grades.upcomingAssignments': 'الواجبات القادمة',
    'grades.assignmentOverview': 'نظرة عامة على الواجبات',
    'grades.createAssignment': 'إنشاء واجب',
    'grades.course': 'الدورة',
    'grades.assignment': 'الواجب',
    'grades.grade': 'الدرجة',
    'grades.percentage': 'النسبة المئوية',
    'grades.date': 'التاريخ',
    'grades.submissions': 'التقديمات',
    'grades.dueDate': 'تاريخ الاستحقاق',
    'grades.gradingProgress': 'تقدم التصحيح',
    'grades.action': 'الإجراء',
    'grades.gradeButton': 'تصحيح',
    'grades.submit': 'تقديم',
    'grades.view': 'عرض',
    'grades.pending': 'معلق',
    'grades.submitted': 'مقدم',
    'grades.due': 'مستحق',
    'grades.points': 'نقاط',

    // Payment
    'payment.title': 'الرسوم والمدفوعات',
    'payment.subtitle': 'إدارة الرسوم الدراسية وسجل المدفوعات',
    'payment.totalDue': 'إجمالي المستحق',
    'payment.due': 'مستحق',
    'payment.payNow': 'ادفع الآن',
    'payment.paymentMethods': 'طرق الدفع',
    'payment.addMethod': 'إضافة طريقة دفع',
    'payment.expires': 'ينتهي في',
    'payment.history': 'سجل المعاملات',
    'payment.downloadStatement': 'تحميل كشف الحساب',
    'payment.invoice': 'الفاتورة',
    'payment.date': 'التاريخ',
    'payment.description': 'الوصف',
    'payment.amount': 'المبلغ',
    'payment.status': 'الحالة',
    'payment.action': 'الإجراء',
    'payment.status.paid': 'مدفوع',
    'payment.status.pending': 'معلق',
    'payment.status.overdue': 'متأخر',

    // Materials
    'materials.title': 'المواد والمراجع',
    'materials.subtitle': 'الكتب والمراجع والملخصات',
    'materials.professor': 'الدكتور',
    'materials.books': 'الكتب',
    'materials.summaries': 'الملخصات',
    'materials.view': 'عرض',
    'materials.download': 'تحميل',

    // Profile
    'profile.title': 'ملفي الشخصي',
    'profile.editProfile': 'تعديل الملف الشخصي',
    'profile.personalInfo': 'المعلومات الشخصية',
    'profile.security': 'الأمان',
    'profile.changePassword': 'تغيير كلمة المرور',
    'profile.updatePassword': 'تحديث كلمة المرور',
    'profile.fullName': 'الاسم الكامل',
    'profile.email': 'البريد الإلكتروني',
    'profile.phone': 'رقم الهاتف',
    'profile.address': 'العنوان',
    'profile.currentPassword': 'كلمة المرور الحالية',
    'profile.newPassword': 'كلمة المرور الجديدة',
    'profile.confirmPassword': 'تأكيد كلمة المرور',
    'profile.saveChanges': 'حفظ التغييرات',

    // Azza AI
    'zza.greeting': 'أهلاً! أنا عزة، مساعدتك الذكية. كيف يمكنني مساعدتك في المناهج أو الكلية اليوم؟',
    'zza.placeholder': 'اسألني عن أي شيء...',
    'zza.send': 'إرسال',

    // Schedule
    'nav.schedule': 'الجدول الدراسي',
    'schedule.title': 'جدول المحاضرات والامتحانات',
    'schedule.subtitle': 'تابع محاضراتك، السكاشن، الامتحانات، والإجازات',
    'schedule.tabs.lectures': 'المحاضرات',
    'schedule.tabs.sections': 'السكاشن',
    'schedule.tabs.exams': 'الامتحانات',
    'schedule.tabs.holidays': 'الإجازات',
    'schedule.day': 'اليوم',
    'schedule.time': 'الوقت',
    'schedule.subject': 'المادة',
    'schedule.location': 'المكان',
    'schedule.date': 'التاريخ',
    'schedule.type': 'النوع',
    'schedule.occasion': 'المناسبة',
    'schedule.instructor': 'الدكتور',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Update document direction and language attribute
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
