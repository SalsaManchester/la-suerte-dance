'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/hooks/useProgress';
import { getCourseBySlug } from '@/data/mock-data';
import { CourseWithDetails, Lesson, levelConfig } from '@/types/database';
import styles from './lesson.module.css';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const slug = params.slug as string;
  const lessonId = params.lessonId as string;

  const [course, setCourse] = useState<CourseWithDetails | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { isLessonComplete, markLessonComplete, markLessonIncomplete, courseProgress } = useProgress(course?.id);

  useEffect(() => {
    const courseData = getCourseBySlug(slug);
    if (courseData) {
      setCourse(courseData);

      // Flatten all lessons
      const lessons = courseData.modules.flatMap(m => m.lessons);
      setAllLessons(lessons);

      // Find current lesson
      const lesson = lessons.find(l => l.id === lessonId);
      if (lesson) {
        setCurrentLesson(lesson);
        setCurrentIndex(lessons.findIndex(l => l.id === lessonId));
      }
    }
  }, [slug, lessonId]);

  if (authLoading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className={styles.errorPage}>
        <h1>Lesson not found</h1>
        <Link href={`/courses/${slug}`}>Back to course</Link>
      </div>
    );
  }

  const isComplete = isLessonComplete(lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const levelInfo = levelConfig[course.level];

  const handleMarkComplete = () => {
    if (isComplete) {
      markLessonIncomplete(lessonId, allLessons.length);
    } else {
      markLessonComplete(lessonId, allLessons.length);
    }
  };

  const handleNextLesson = () => {
    if (!isComplete) {
      markLessonComplete(lessonId, allLessons.length);
    }
    if (nextLesson) {
      router.push(`/courses/${slug}/lesson/${nextLesson.id}`);
    }
  };

  return (
    <div className={styles.lessonPage}>
      {/* Top Bar */}
      <header className={styles.topBar}>
        <Link href={`/courses/${slug}`} className={styles.backLink}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Course
        </Link>

        <div className={styles.courseInfo}>
          <span
            className={styles.levelBadge}
            style={{ backgroundColor: levelInfo.solidBg, color: levelInfo.color }}
          >
            {levelInfo.label}
          </span>
          <span className={styles.courseName}>{course.title}</span>
        </div>

        <div className={styles.progress}>
          <span className={styles.progressText}>
            {courseProgress?.lessonsCompleted || 0} / {allLessons.length} completed
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${courseProgress?.progressPercentage || 0}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Video Section */}
        <div className={styles.videoSection}>
          <div className={styles.videoContainer}>
            {/* YouTube Embed */}
            <iframe
              src={`https://www.youtube.com/embed/${currentLesson.video_id}?rel=0&modestbranding=1`}
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.videoPlayer}
            />
          </div>

          {/* Lesson Info */}
          <div className={styles.lessonInfo}>
            <div className={styles.lessonHeader}>
              <div>
                <span className={styles.lessonNumber}>
                  Lesson {currentIndex + 1} of {allLessons.length}
                </span>
                <h1 className={styles.lessonTitle}>{currentLesson.title}</h1>
              </div>
              <button
                className={`${styles.completeButton} ${isComplete ? styles.completed : ''}`}
                onClick={handleMarkComplete}
              >
                {isComplete ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Completed
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    Mark Complete
                  </>
                )}
              </button>
            </div>

            {currentLesson.description && (
              <p className={styles.lessonDescription}>{currentLesson.description}</p>
            )}

            {/* Navigation */}
            <div className={styles.lessonNav}>
              {prevLesson ? (
                <Link
                  href={`/courses/${slug}/lesson/${prevLesson.id}`}
                  className={styles.navButton}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Previous
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <button onClick={handleNextLesson} className={`${styles.navButton} ${styles.nextButton}`}>
                  {isComplete ? 'Next Lesson' : 'Complete & Continue'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              ) : (
                <Link
                  href={`/courses/${slug}`}
                  className={`${styles.navButton} ${styles.nextButton}`}
                >
                  Finish Course
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Lesson List */}
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Course Content</h2>
          <div className={styles.lessonList}>
            {course.modules.map((module, moduleIndex) => (
              <div key={module.id} className={styles.moduleGroup}>
                <div className={styles.moduleName}>
                  <span className={styles.moduleNumber}>Module {moduleIndex + 1}</span>
                  {module.title}
                </div>
                {module.lessons.map((lesson, lessonIndex) => {
                  const isCurrentLesson = lesson.id === lessonId;
                  const isLessonDone = isLessonComplete(lesson.id);

                  return (
                    <Link
                      key={lesson.id}
                      href={`/courses/${slug}/lesson/${lesson.id}`}
                      className={`${styles.lessonItem} ${isCurrentLesson ? styles.active : ''} ${isLessonDone ? styles.done : ''}`}
                    >
                      <span className={styles.lessonStatus}>
                        {isLessonDone ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01" fill="none" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        ) : isCurrentLesson ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        ) : (
                          <span className={styles.lessonDot} />
                        )}
                      </span>
                      <span className={styles.lessonItemTitle}>{lesson.title}</span>
                      <span className={styles.lessonDuration}>{lesson.duration}m</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
