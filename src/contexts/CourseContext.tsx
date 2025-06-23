import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  authorId: string;
  authorName: string;
  published: boolean;
  createdAt: string;
  category: string;
  duration: string;
  level: string;
}

interface CourseContextType {
  courses: Course[];
  publishedCourses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'createdAt'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  getCoursesByAuthor: (authorId: string) => Course[];
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      // Initialize with some sample courses
      const sampleCourses: Course[] = [
        {
          id: '1',
          title: 'Complete React Development Course',
          description: 'Master React from fundamentals to advanced concepts including hooks, context, and modern patterns.',
          price: 99.99,
          image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
          authorId: 'admin1',
          authorName: 'Sarah Johnson',
          published: true,
          createdAt: '2024-01-15',
          category: 'Web Development',
          duration: '12 hours',
          level: 'Intermediate'
        },
        {
          id: '2',
          title: 'Modern JavaScript Essentials',
          description: 'Learn ES6+ features, async programming, and modern JavaScript development practices.',
          price: 79.99,
          image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
          authorId: 'admin1',
          authorName: 'Sarah Johnson',
          published: true,
          createdAt: '2024-01-10',
          category: 'Programming',
          duration: '8 hours',
          level: 'Beginner'
        },
        {
          id: '3',
          title: 'UI/UX Design Fundamentals',
          description: 'Create beautiful and intuitive user interfaces with modern design principles.',
          price: 129.99,
          image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
          authorId: 'admin2',
          authorName: 'Michael Chen',
          published: true,
          createdAt: '2024-01-05',
          category: 'Design',
          duration: '15 hours',
          level: 'Beginner'
        }
      ];
      setCourses(sampleCourses);
      localStorage.setItem('courses', JSON.stringify(sampleCourses));
    }
  }, []);

  const addCourse = (courseData: Omit<Course, 'id' | 'createdAt'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    const updatedCourses = courses.map(course => 
      course.id === id ? { ...course, ...updates } : course
    );
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  const deleteCourse = (id: string) => {
    const updatedCourses = courses.filter(course => course.id !== id);
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  const getCoursesByAuthor = (authorId: string) => {
    return courses.filter(course => course.authorId === authorId);
  };

  const publishedCourses = courses.filter(course => course.published);

  const value = {
    courses,
    publishedCourses,
    addCourse,
    updateCourse,
    deleteCourse,
    getCoursesByAuthor
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};