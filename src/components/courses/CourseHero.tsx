'use client';

import Link from 'next/link';
import { CourseWithDetails, levelConfig, styleConfig } from '@/types/database';
import { Button } from '@/components/ui';
import styles from './CourseHero.module.css';

interface CourseHeroProps {
  course: CourseWithDetails;
}

export default function CourseHero({ course }: CourseHeroProps) {
  const levelInfo = levelConfig[course.level];
  const styleInfo = styleConfig[course.style];

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours} hr`;
    return `${hours} hr ${mins} min`;
  };

  return (
    <section className={styles.hero}>
      <div className={styles.bgEffects}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
      </div>

      <div className={`container ${styles.heroContainer}`}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/courses">Courses</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span>{course.title}</span>
        </nav>

        <div className={styles.heroContent}>
          {/* Left Content */}
          <div className={styles.heroText}>
            {/* Badges */}
            <div className={styles.badges}>
              <span className={styles.styleBadge}>
                {styleInfo.emoji} {styleInfo.label}
              </span>
              <span
                className={styles.levelBadge}
                style={{
                  backgroundColor: levelInfo.bgColor,
                  color: levelInfo.color,
                  borderColor: levelInfo.color
                }}
              >
                {levelInfo.label}
              </span>
              {course.is_premium && (
                <span className={styles.premiumBadge}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  Premium
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className={styles.title}>{course.title}</h1>

            {/* Description */}
            <p className={styles.description}>{course.short_description}</p>

            {/* Stats */}
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>{course.lessons_count} Lessons</span>
              </div>
              <div className={styles.statItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{formatDuration(course.total_duration)}</span>
              </div>
              <div className={styles.statItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>{course.modules.length} Modules</span>
              </div>
            </div>

            {/* CTA */}
            <div className={styles.ctaGroup}>
              <Button size="lg">
                {course.is_premium ? 'Enroll Now' : 'Start Learning'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Button>
              {!course.is_premium && (
                <span className={styles.freeLabel}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  Free Course
                </span>
              )}
            </div>
          </div>

          {/* Preview Card */}
          <div className={styles.previewCard}>
            <div className={styles.previewThumbnail}>
              <div className={styles.thumbnailPlaceholder}>
                <span className={styles.styleEmoji}>{styleInfo.emoji}</span>
              </div>
              <div className={styles.playOverlay}>
                <div className={styles.playButton}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <span className={styles.previewText}>Watch Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
