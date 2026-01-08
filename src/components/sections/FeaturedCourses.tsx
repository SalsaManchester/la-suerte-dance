'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import styles from './FeaturedCourses.module.css';

const courses = [
  {
    id: 1,
    title: 'Salsa Fundamentals',
    description: 'Master the basic steps, timing, and partner connection that form the foundation of all Salsa dancing.',
    level: 'Beginner',
    style: 'Salsa',
    lessons: 24,
    duration: '4h 30m',
    isPremium: false,
    color: 'primary',
  },
  {
    id: 2,
    title: 'Bachata Sensual',
    description: 'Learn the smooth, flowing movements of Bachata Sensual with body waves and intimate partner work.',
    level: 'Intermediate',
    style: 'Bachata',
    lessons: 32,
    duration: '6h 15m',
    isPremium: true,
    color: 'secondary',
  },
  {
    id: 3,
    title: 'Salsa Shines & Footwork',
    description: 'Develop impressive solo footwork patterns to shine on the dance floor during breaks.',
    level: 'Intermediate',
    style: 'Salsa',
    lessons: 18,
    duration: '3h 45m',
    isPremium: true,
    color: 'accent',
  },
  {
    id: 4,
    title: 'Bachata Basics',
    description: 'Start your Bachata journey with essential steps, rhythm, and basic partner patterns.',
    level: 'Beginner',
    style: 'Bachata',
    lessons: 20,
    duration: '3h 50m',
    isPremium: false,
    color: 'tertiary',
  },
];

export default function FeaturedCourses() {
  return (
    <section className={styles.featuredCourses}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.headerText}>
            <span className={styles.sectionLabel}>Featured Courses</span>
            <h2 className={styles.sectionTitle}>
              Start Your <span className="text-gradient">Journey</span>
            </h2>
            <p className={styles.sectionDescription}>
              Hand-picked courses to get you dancing in no time
            </p>
          </div>
          <Link href="/courses" className={styles.viewAllLink}>
            <Button variant="outline">
              View All Courses
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Button>
          </Link>
        </div>

        <div className={styles.coursesGrid}>
          {courses.map((course, index) => (
            <Link
              href={`/courses/${course.id}`}
              key={course.id}
              className={`${styles.courseCard} ${styles[course.color]}`}
              style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              {/* Card Glow */}
              <div className={styles.cardGlow}></div>

              {/* Thumbnail */}
              <div className={styles.courseThumbnail}>
                <div className={styles.thumbnailContent}>
                  <span className={styles.styleEmoji}>
                    {course.style === 'Salsa' ? '💃' : '🕺'}
                  </span>
                </div>
                <div className={styles.thumbnailOverlay}></div>

                {/* Badges */}
                {course.isPremium && (
                  <span className={styles.premiumBadge}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
                    </svg>
                    Premium
                  </span>
                )}
                <span className={styles.levelBadge}>{course.level}</span>
              </div>

              {/* Content */}
              <div className={styles.courseContent}>
                <div className={styles.courseStyle}>{course.style}</div>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseDescription}>{course.description}</p>

                <div className={styles.courseMeta}>
                  <div className={styles.metaItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                    {course.lessons} lessons
                  </div>
                  <div className={styles.metaItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {course.duration}
                  </div>
                </div>

                <div className={styles.cardAction}>
                  <span>Start Learning</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
