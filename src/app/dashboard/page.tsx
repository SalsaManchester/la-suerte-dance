'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Header, Footer } from '@/components/layout';
import { courses, getCoursesWithInstructors } from '@/data/mock-data';
import { CourseWithInstructor, levelConfig, styleConfig } from '@/types/database';
import styles from './dashboard.module.css';

// Mock enrolled courses for demo
const mockEnrolledCourseIds = ['1', '4']; // Salsa Fundamentals and Bachata Basics

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<CourseWithInstructor[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Get enrolled courses (mock data for now)
    const allCourses = getCoursesWithInstructors();
    const enrolled = allCourses.filter(c => mockEnrolledCourseIds.includes(c.id));
    setEnrolledCourses(enrolled);
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Dancer';

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Welcome Section */}
        <section className={styles.welcomeSection}>
          <div className="container">
            <div className={styles.welcomeContent}>
              <div className={styles.welcomeText}>
                <h1 className={styles.welcomeTitle}>
                  Welcome back, <span className={styles.userName}>{userName}</span>!
                </h1>
                <p className={styles.welcomeSubtitle}>
                  Ready to continue your dance journey?
                </p>
              </div>
              <div className={styles.welcomeActions}>
                <Link href="/courses" className={styles.browseButton}>
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* My Courses Section */}
        <section className={styles.coursesSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>My Courses</h2>
              <Link href="/courses" className={styles.viewAllLink}>
                View All Courses
              </Link>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className={styles.coursesGrid}>
                {enrolledCourses.map((course) => (
                  <EnrolledCourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📚</div>
                <h3 className={styles.emptyTitle}>No courses yet</h3>
                <p className={styles.emptyText}>
                  Start your dance journey by enrolling in a course!
                </p>
                <Link href="/courses" className={styles.enrollButton}>
                  Browse Courses
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Quick Stats */}
        <section className={styles.statsSection}>
          <div className="container">
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📖</div>
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>{enrolledCourses.length}</span>
                  <span className={styles.statLabel}>Enrolled Courses</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>✅</div>
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>0</span>
                  <span className={styles.statLabel}>Completed Lessons</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>⏱️</div>
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>0h</span>
                  <span className={styles.statLabel}>Total Watch Time</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function EnrolledCourseCard({ course }: { course: CourseWithInstructor }) {
  const levelInfo = levelConfig[course.level];
  const styleInfo = styleConfig[course.style];

  // Mock progress for demo
  const progress = course.id === '1' ? 35 : 10;

  return (
    <Link href={`/courses/${course.slug}`} className={styles.enrolledCard}>
      <div className={styles.cardThumbnail}>
        <div className={styles.thumbnailPlaceholder}>
          <span className={styles.styleEmoji}>{styleInfo.emoji}</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span
            className={styles.levelBadge}
            style={{
              backgroundColor: levelInfo.solidBg,
              color: levelInfo.color
            }}
          >
            {levelInfo.label}
          </span>
          <span className={styles.progressText}>{progress}% complete</span>
        </div>
        <h3 className={styles.cardTitle}>{course.title}</h3>
        <p className={styles.cardInstructor}>{course.instructor.name}</p>
        <button className={styles.resumeButton}>
          Resume Learning
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
    </Link>
  );
}
