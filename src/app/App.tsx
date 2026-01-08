import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LecturesPage from './components/LecturesPage';
import TeacherCommunication from './components/TeacherCommunication';
import GradesAssignments from './components/GradesAssignments';
import PaymentPage from './components/PaymentPage';
import StudyMaterials from './components/StudyMaterials';
import ProfilePage from './components/ProfilePage';
import SchedulePage from './components/SchedulePage';

export default function App() {
  const [userRole, setUserRole] = useState<'student' | 'teacher' | null>(null);

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login setUserRole={setUserRole} />} />
          <Route
            path="/dashboard"
            element={userRole ? <Dashboard userRole={userRole} /> : <Navigate to="/" />}
          />
          <Route
            path="/schedule"
            element={userRole ? <SchedulePage userRole={userRole} /> : <Navigate to="/" />}
          />
          <Route
            path="/lectures"
            element={userRole ? <LecturesPage userRole={userRole} /> : <Navigate to="/" />}
          />
          <Route
            path="/materials"
            element={userRole ? <StudyMaterials userRole={userRole} /> : <Navigate to="/" />}
          />
          <Route
            path="/communication"
            element={userRole ? <TeacherCommunication userRole={userRole} /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={userRole ? <ProfilePage userRole={userRole} /> : <Navigate to="/" />}
          />
          <Route
            path="/grades"
            element={userRole ? <GradesAssignments userRole={userRole} /> : <Navigate to="/" />}
          />
          <Route
            path="/payment"
            element={userRole ? <PaymentPage userRole={userRole} /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}