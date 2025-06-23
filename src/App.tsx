import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CourseProvider } from './contexts/CourseContext';
import Navigation from './components/Navigation';
import AuthForm from './components/AuthForm';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import UserProfile from './components/UserProfile';
import AdminProfile from './components/AdminProfile';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState('courses');
  const { isAuthenticated, isAdmin } = useAuth();

  const handleAuthSuccess = () => {
    setCurrentView('courses');
  };

  const handleCourseCreated = () => {
    setCurrentView('admin');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <AuthForm type="login" onSuccess={handleAuthSuccess} />;
      case 'signup':
        return <AuthForm type="signup" onSuccess={handleAuthSuccess} />;
      case 'profile':
        return <UserProfile />;
      case 'admin':
        return isAdmin ? <AdminProfile /> : <CourseList />;
      case 'create-course':
        return isAdmin ? (
          <CourseForm 
            onBack={() => setCurrentView('admin')} 
            onSuccess={handleCourseCreated}
          />
        ) : <CourseList />;
      case 'courses':
      default:
        return <CourseList />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      {renderContent()}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <AppContent />
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;