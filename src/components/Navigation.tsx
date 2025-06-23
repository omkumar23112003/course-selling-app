import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, User, LogOut, Settings, Plus } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    onViewChange('courses');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-purple-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">EduCourse</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => onViewChange('courses')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'courses'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Courses
            </button>

            {user && (
              <>
                <button
                  onClick={() => onViewChange('profile')}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'profile'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </button>

                {isAdmin && (
                  <>
                    <button
                      onClick={() => onViewChange('admin')}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentView === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:text-purple-600'
                      }`}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Panel
                    </button>
                    <button
                      onClick={() => onViewChange('create-course')}
                      className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Course
                    </button>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            )}

            {!user && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onViewChange('login')}
                  className="px-4 py-2 text-gray-600 hover:text-purple-600 font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onViewChange('signup')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;