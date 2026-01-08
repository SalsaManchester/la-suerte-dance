'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  watchedSeconds: number;
}

interface CourseProgress {
  courseId: string;
  lessonsCompleted: number;
  totalLessons: number;
  progressPercentage: number;
}

// Mock progress data (will be replaced with Supabase)
const mockProgress: Record<string, LessonProgress[]> = {};

export function useProgress(courseId?: string) {
  const { user } = useAuth();
  const [lessonProgress, setLessonProgress] = useState<Record<string, LessonProgress>>({});
  const [courseProgress, setCourseProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);

  // Load progress from localStorage (mock) or Supabase
  useEffect(() => {
    if (!user || !courseId) {
      setLoading(false);
      return;
    }

    const loadProgress = async () => {
      try {
        // Try to load from localStorage first (mock data)
        const stored = localStorage.getItem(`progress_${user.id}_${courseId}`);
        if (stored) {
          const data = JSON.parse(stored);
          setLessonProgress(data.lessons || {});
          setCourseProgress(data.course || null);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user, courseId]);

  // Mark lesson as complete
  const markLessonComplete = useCallback(async (lessonId: string, totalLessons: number) => {
    if (!user || !courseId) return;

    const updatedLessons = {
      ...lessonProgress,
      [lessonId]: {
        lessonId,
        completed: true,
        watchedSeconds: 0,
      },
    };

    const completedCount = Object.values(updatedLessons).filter(l => l.completed).length;
    const progressPercentage = Math.round((completedCount / totalLessons) * 100);

    const updatedCourseProgress: CourseProgress = {
      courseId,
      lessonsCompleted: completedCount,
      totalLessons,
      progressPercentage,
    };

    setLessonProgress(updatedLessons);
    setCourseProgress(updatedCourseProgress);

    // Save to localStorage (mock)
    try {
      localStorage.setItem(`progress_${user.id}_${courseId}`, JSON.stringify({
        lessons: updatedLessons,
        course: updatedCourseProgress,
      }));
    } catch (error) {
      console.error('Error saving progress:', error);
    }

    // TODO: Save to Supabase
    // const supabase = createClient();
    // await supabase.from('lesson_progress').upsert({ ... });
  }, [user, courseId, lessonProgress]);

  // Mark lesson as incomplete
  const markLessonIncomplete = useCallback(async (lessonId: string, totalLessons: number) => {
    if (!user || !courseId) return;

    const updatedLessons = {
      ...lessonProgress,
      [lessonId]: {
        lessonId,
        completed: false,
        watchedSeconds: 0,
      },
    };

    const completedCount = Object.values(updatedLessons).filter(l => l.completed).length;
    const progressPercentage = Math.round((completedCount / totalLessons) * 100);

    const updatedCourseProgress: CourseProgress = {
      courseId,
      lessonsCompleted: completedCount,
      totalLessons,
      progressPercentage,
    };

    setLessonProgress(updatedLessons);
    setCourseProgress(updatedCourseProgress);

    // Save to localStorage (mock)
    try {
      localStorage.setItem(`progress_${user.id}_${courseId}`, JSON.stringify({
        lessons: updatedLessons,
        course: updatedCourseProgress,
      }));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [user, courseId, lessonProgress]);

  // Check if lesson is completed
  const isLessonComplete = useCallback((lessonId: string): boolean => {
    return lessonProgress[lessonId]?.completed || false;
  }, [lessonProgress]);

  return {
    lessonProgress,
    courseProgress,
    loading,
    markLessonComplete,
    markLessonIncomplete,
    isLessonComplete,
  };
}
