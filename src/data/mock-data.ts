import {
  Instructor,
  Course,
  Module,
  Lesson,
  CourseWithInstructor,
  CourseWithDetails,
  ModuleWithLessons,
} from '@/types/database';

// Mock Instructors
export const instructors: Instructor[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    bio: 'World champion Salsa dancer with 15+ years of teaching experience. Maria has trained thousands of students across the globe.',
    avatar_url: null,
    specialties: ['salsa'],
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Carlos Martinez',
    bio: 'Bachata Sensual specialist and certified instructor. Carlos brings passion and precision to every lesson.',
    avatar_url: null,
    specialties: ['bachata'],
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Sofia & Diego',
    bio: 'Award-winning dance duo specializing in both Salsa and Bachata. Known for their unique partner work techniques.',
    avatar_url: null,
    specialties: ['salsa', 'bachata'],
    created_at: '2024-01-01T00:00:00Z',
  },
];

// Mock Courses
export const courses: Course[] = [
  {
    id: '1',
    title: 'Salsa Fundamentals',
    slug: 'salsa-fundamentals',
    description: 'Master the essential building blocks of Salsa dancing. This comprehensive course covers basic steps, timing, rhythm, and partner connection. Perfect for absolute beginners who want to start their Salsa journey with a solid foundation.',
    short_description: 'Master the basic steps, timing, and partner connection that form the foundation of all Salsa dancing.',
    thumbnail_url: null,
    style: 'salsa',
    level: 'beginner',
    is_premium: false,
    is_published: true,
    instructor_id: '1',
    video_source: 'youtube',
    total_duration: 270,
    lessons_count: 24,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Bachata Sensual Mastery',
    slug: 'bachata-sensual-mastery',
    description: 'Dive deep into the world of Bachata Sensual. Learn smooth body waves, intricate partner work, and the musicality that makes this style so captivating. This course builds on basic Bachata knowledge.',
    short_description: 'Learn the smooth, flowing movements of Bachata Sensual with body waves and intimate partner work.',
    thumbnail_url: null,
    style: 'bachata',
    level: 'intermediate',
    is_premium: true,
    is_published: true,
    instructor_id: '2',
    video_source: 'vimeo',
    total_duration: 375,
    lessons_count: 32,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'Salsa Shines & Footwork',
    slug: 'salsa-shines-footwork',
    description: 'Develop impressive solo footwork patterns that will make you stand out on the dance floor. Learn shines for social dancing, performances, and personal expression.',
    short_description: 'Develop impressive solo footwork patterns to shine on the dance floor during breaks.',
    thumbnail_url: null,
    style: 'salsa',
    level: 'intermediate',
    is_premium: true,
    is_published: true,
    instructor_id: '1',
    video_source: 'vimeo',
    total_duration: 225,
    lessons_count: 18,
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z',
  },
  {
    id: '4',
    title: 'Bachata Basics',
    slug: 'bachata-basics',
    description: 'Start your Bachata journey with this beginner-friendly course. Learn the basic step, turns, and simple combinations that will get you dancing at any social event.',
    short_description: 'Start your Bachata journey with essential steps, rhythm, and basic partner patterns.',
    thumbnail_url: null,
    style: 'bachata',
    level: 'beginner',
    is_premium: false,
    is_published: true,
    instructor_id: '2',
    video_source: 'youtube',
    total_duration: 230,
    lessons_count: 20,
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z',
  },
  {
    id: '5',
    title: 'Advanced Salsa Partnerwork',
    slug: 'advanced-salsa-partnerwork',
    description: 'Take your Salsa to the next level with complex turn patterns, dips, and advanced lead/follow techniques. This course is for experienced dancers ready to challenge themselves.',
    short_description: 'Complex turn patterns, dips, and advanced lead/follow techniques for experienced dancers.',
    thumbnail_url: null,
    style: 'salsa',
    level: 'advanced',
    is_premium: true,
    is_published: true,
    instructor_id: '3',
    video_source: 'vimeo',
    total_duration: 420,
    lessons_count: 28,
    created_at: '2024-03-15T00:00:00Z',
    updated_at: '2024-03-15T00:00:00Z',
  },
  {
    id: '6',
    title: 'Bachata Moderna',
    slug: 'bachata-moderna',
    description: 'Explore the modern evolution of Bachata with contemporary moves, urban influences, and creative musicality. Perfect for dancers who want to develop their own style.',
    short_description: 'Contemporary Bachata moves with urban influences and creative musicality.',
    thumbnail_url: null,
    style: 'bachata',
    level: 'advanced',
    is_premium: true,
    is_published: true,
    instructor_id: '3',
    video_source: 'vimeo',
    total_duration: 350,
    lessons_count: 25,
    created_at: '2024-04-01T00:00:00Z',
    updated_at: '2024-04-01T00:00:00Z',
  },
  {
    id: '7',
    title: 'Salsa Musicality',
    slug: 'salsa-musicality',
    description: 'Learn to truly hear and interpret Salsa music. Understand the instruments, rhythm patterns, and how to express the music through your dancing.',
    short_description: 'Understand Salsa music structure and express it through your dancing.',
    thumbnail_url: null,
    style: 'salsa',
    level: 'intermediate',
    is_premium: true,
    is_published: true,
    instructor_id: '1',
    video_source: 'vimeo',
    total_duration: 180,
    lessons_count: 15,
    created_at: '2024-04-15T00:00:00Z',
    updated_at: '2024-04-15T00:00:00Z',
  },
  {
    id: '8',
    title: 'Bachata Footwork Fundamentals',
    slug: 'bachata-footwork-fundamentals',
    description: 'Build a solid foundation of Bachata footwork. Learn the techniques that will support all your future Bachata dancing.',
    short_description: 'Essential footwork techniques to support all your Bachata dancing.',
    thumbnail_url: null,
    style: 'bachata',
    level: 'beginner',
    is_premium: false,
    is_published: true,
    instructor_id: '2',
    video_source: 'youtube',
    total_duration: 150,
    lessons_count: 12,
    created_at: '2024-05-01T00:00:00Z',
    updated_at: '2024-05-01T00:00:00Z',
  },
];

// Mock Modules for Course 1 (Salsa Fundamentals)
export const modules: Module[] = [
  {
    id: 'm1',
    course_id: '1',
    title: 'Getting Started',
    description: 'Introduction to Salsa and basic concepts',
    order_index: 0,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'm2',
    course_id: '1',
    title: 'Basic Steps',
    description: 'Learn the fundamental Salsa steps',
    order_index: 1,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'm3',
    course_id: '1',
    title: 'Partner Connection',
    description: 'Understanding lead and follow',
    order_index: 2,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'm4',
    course_id: '1',
    title: 'Basic Turns',
    description: 'Simple turn patterns for beginners',
    order_index: 3,
    created_at: '2024-01-15T00:00:00Z',
  },
];

// Mock Lessons
export const lessons: Lesson[] = [
  // Module 1: Getting Started
  {
    id: 'l1',
    module_id: 'm1',
    course_id: '1',
    title: 'Welcome to Salsa',
    description: 'An introduction to the course and what you will learn',
    video_id: 'dQw4w9WgXcQ',
    duration: 5,
    order_index: 0,
    is_free: true,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'l2',
    module_id: 'm1',
    course_id: '1',
    title: 'History of Salsa',
    description: 'Learn about the origins and evolution of Salsa dance',
    video_id: 'dQw4w9WgXcQ',
    duration: 8,
    order_index: 1,
    is_free: true,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'l3',
    module_id: 'm1',
    course_id: '1',
    title: 'Understanding Salsa Music',
    description: 'Basic music theory for Salsa dancers',
    video_id: 'dQw4w9WgXcQ',
    duration: 12,
    order_index: 2,
    is_free: false,
    created_at: '2024-01-15T00:00:00Z',
  },
  // Module 2: Basic Steps
  {
    id: 'l4',
    module_id: 'm2',
    course_id: '1',
    title: 'The Basic Step - On1',
    description: 'Learn the fundamental Salsa basic step',
    video_id: 'dQw4w9WgXcQ',
    duration: 15,
    order_index: 0,
    is_free: true,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'l5',
    module_id: 'm2',
    course_id: '1',
    title: 'Side Steps',
    description: 'Adding side steps to your repertoire',
    video_id: 'dQw4w9WgXcQ',
    duration: 10,
    order_index: 1,
    is_free: false,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'l6',
    module_id: 'm2',
    course_id: '1',
    title: 'Back Breaks',
    description: 'Master the back break movement',
    video_id: 'dQw4w9WgXcQ',
    duration: 12,
    order_index: 2,
    is_free: false,
    created_at: '2024-01-15T00:00:00Z',
  },
  // Module 3: Partner Connection
  {
    id: 'l7',
    module_id: 'm3',
    course_id: '1',
    title: 'Frame and Posture',
    description: 'Proper dance frame and body posture',
    video_id: 'dQw4w9WgXcQ',
    duration: 10,
    order_index: 0,
    is_free: false,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'l8',
    module_id: 'm3',
    course_id: '1',
    title: 'Hand Holds',
    description: 'Different hand positions and grips',
    video_id: 'dQw4w9WgXcQ',
    duration: 8,
    order_index: 1,
    is_free: false,
    created_at: '2024-01-15T00:00:00Z',
  },
  // Module 4: Basic Turns
  {
    id: 'l9',
    module_id: 'm4',
    course_id: '1',
    title: 'Right Turn',
    description: 'The basic right turn for followers',
    video_id: 'dQw4w9WgXcQ',
    duration: 15,
    order_index: 0,
    is_free: false,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'l10',
    module_id: 'm4',
    course_id: '1',
    title: 'Cross Body Lead',
    description: 'The essential cross body lead pattern',
    video_id: 'dQw4w9WgXcQ',
    duration: 18,
    order_index: 1,
    is_free: false,
    created_at: '2024-01-15T00:00:00Z',
  },
];

// Helper functions to get data with relations
export function getInstructor(id: string): Instructor | undefined {
  return instructors.find((i) => i.id === id);
}

export function getCoursesWithInstructors(): CourseWithInstructor[] {
  return courses
    .filter((c) => c.is_published)
    .map((course) => ({
      ...course,
      instructor: getInstructor(course.instructor_id)!,
    }));
}

export function getCourseBySlug(slug: string): CourseWithDetails | undefined {
  const course = courses.find((c) => c.slug === slug && c.is_published);
  if (!course) return undefined;

  const instructor = getInstructor(course.instructor_id)!;
  const courseModules = modules
    .filter((m) => m.course_id === course.id)
    .sort((a, b) => a.order_index - b.order_index);

  const modulesWithLessons: ModuleWithLessons[] = courseModules.map((module) => ({
    ...module,
    lessons: lessons
      .filter((l) => l.module_id === module.id)
      .sort((a, b) => a.order_index - b.order_index),
  }));

  return {
    ...course,
    instructor,
    modules: modulesWithLessons,
  };
}

export function getCourseById(id: string): CourseWithDetails | undefined {
  const course = courses.find((c) => c.id === id && c.is_published);
  if (!course) return undefined;
  return getCourseBySlug(course.slug);
}

// Filter functions
export function filterCourses(
  style?: string | null,
  level?: string | null
): CourseWithInstructor[] {
  let filtered = getCoursesWithInstructors();

  if (style && style !== 'all') {
    filtered = filtered.filter((c) => c.style === style);
  }

  if (level && level !== 'all') {
    filtered = filtered.filter((c) => c.level === level);
  }

  return filtered;
}
