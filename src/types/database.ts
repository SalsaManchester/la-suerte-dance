// Database types matching Supabase schema

export type DanceStyle = 'salsa' | 'bachata';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type VideoSource = 'youtube' | 'vimeo';
export type SubscriptionTier = 'free' | 'basic' | 'premium';

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  avatar_url: string | null;
  specialties: DanceStyle[];
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  thumbnail_url: string | null;
  style: DanceStyle;
  level: CourseLevel;
  is_premium: boolean;
  is_published: boolean;
  instructor_id: string;
  video_source: VideoSource;
  total_duration: number; // in minutes
  lessons_count: number;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  course_id: string;
  title: string;
  description: string | null;
  video_id: string; // YouTube or Vimeo ID
  duration: number; // in minutes
  order_index: number;
  is_free: boolean; // Some lessons can be free previews
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  subscription_tier: SubscriptionTier;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: 'active' | 'completed';
  progress: number; // 0-100
  enrolled_at: string;
  completed_at: string | null;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  watched_seconds: number;
  completed_at: string | null;
}

// Extended types with relations
export interface CourseWithInstructor extends Course {
  instructor: Instructor;
}

export interface CourseWithDetails extends CourseWithInstructor {
  modules: ModuleWithLessons[];
}

export interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

// Level configuration with colors
export const levelConfig: Record<CourseLevel, { label: string; color: string; bgColor: string; solidBg: string }> = {
  beginner: {
    label: 'Beginner',
    color: '#059669', // Darker Green for better contrast
    bgColor: 'rgba(16, 185, 129, 0.15)',
    solidBg: '#D1FAE5', // Solid light green
  },
  intermediate: {
    label: 'Intermediate',
    color: '#D97706', // Darker Amber for better contrast
    bgColor: 'rgba(245, 158, 11, 0.15)',
    solidBg: '#FEF3C7', // Solid light amber
  },
  advanced: {
    label: 'Advanced',
    color: '#DC2626', // Darker Red for better contrast
    bgColor: 'rgba(239, 68, 68, 0.15)',
    solidBg: '#FEE2E2', // Solid light red
  },
};

export const styleConfig: Record<DanceStyle, { label: string; emoji: string }> = {
  salsa: {
    label: 'Salsa',
    emoji: '💃',
  },
  bachata: {
    label: 'Bachata',
    emoji: '🕺',
  },
};
