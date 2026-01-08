'use client';

import Link from 'next/link';
import { CourseWithInstructor, levelConfig, styleConfig } from '@/types/database';
import styles from './CourseCard.module.css';

interface CourseCardProps {
  course: CourseWithInstructor;
}

export default function CourseCard({ course }: CourseCardProps) {
  const levelInfo = levelConfig[course.level];
  const styleInfo = styleConfig[course.style];

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  return (
    <Link href={`/courses/${course.slug}`} className={styles.card}>
      {/* Thumbnail */}
      <div className={styles.thumbnail}>
        <div className={styles.thumbnailPlaceholder}>
          <span className={styles.styleEmoji}>{styleInfo.emoji}</span>
        </div>

        {/* Premium Badge */}
        {course.is_premium && (
          <div className={styles.premiumBadge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            Premium
          </div>
        )}

        {/* Level Badge */}
        <div
          className={styles.levelBadge}
          style={{
            backgroundColor: levelInfo.solidBg,
            color: levelInfo.color,
            borderColor: levelInfo.color
          }}
        >
          {levelInfo.label}
        </div>

        {/* Hover Overlay */}
        <div className={styles.hoverOverlay}>
          <div className={styles.playButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Style Tag */}
        <div className={styles.styleTag}>
          {styleInfo.emoji} {styleInfo.label}
        </div>

        {/* Title */}
        <h3 className={styles.title}>{course.title}</h3>

        {/* Description */}
        <p className={styles.description}>{course.short_description}</p>

        {/* Instructor */}
        <div className={styles.instructor}>
          <div className={styles.instructorAvatar}>
            {course.instructor.name.charAt(0)}
          </div>
          <span className={styles.instructorName}>{course.instructor.name}</span>
        </div>

        {/* Meta */}
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {course.lessons_count} lessons
          </div>
          <div className={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {formatDuration(course.total_duration)}
          </div>
        </div>
      </div>
    </Link>
  );
}
