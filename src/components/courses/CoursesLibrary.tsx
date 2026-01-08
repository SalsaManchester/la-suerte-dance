'use client';

import { useState, useMemo } from 'react';
import { filterCourses } from '@/data/mock-data';
import { DanceStyle, CourseLevel, levelConfig, styleConfig } from '@/types/database';
import CourseCard from './CourseCard';
import styles from './CoursesLibrary.module.css';

type StyleFilter = DanceStyle | 'all';
type LevelFilter = CourseLevel | 'all';

const styleOptions: { value: StyleFilter; label: string; emoji?: string }[] = [
  { value: 'all', label: 'All Styles' },
  { value: 'salsa', label: 'Salsa', emoji: styleConfig.salsa.emoji },
  { value: 'bachata', label: 'Bachata', emoji: styleConfig.bachata.emoji },
];

const levelOptions: { value: LevelFilter; label: string; color?: string }[] = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner', color: levelConfig.beginner.color },
  { value: 'intermediate', label: 'Intermediate', color: levelConfig.intermediate.color },
  { value: 'advanced', label: 'Advanced', color: levelConfig.advanced.color },
];

export default function CoursesLibrary() {
  const [styleFilter, setStyleFilter] = useState<StyleFilter>('all');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');

  const courses = useMemo(() => {
    return filterCourses(
      styleFilter === 'all' ? null : styleFilter,
      levelFilter === 'all' ? null : levelFilter
    );
  }, [styleFilter, levelFilter]);

  const handleStyleChange = (value: StyleFilter) => {
    setStyleFilter(value);
  };

  const handleLevelChange = (value: LevelFilter) => {
    setLevelFilter(value);
  };

  return (
    <div className={styles.library}>
      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Style</label>
          <div className={styles.filterButtons}>
            {styleOptions.map((option) => (
              <button
                key={option.value}
                className={`${styles.filterButton} ${styleFilter === option.value ? styles.active : ''}`}
                onClick={() => handleStyleChange(option.value)}
              >
                {option.emoji && <span className={styles.filterEmoji}>{option.emoji}</span>}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Level</label>
          <div className={styles.filterButtons}>
            {levelOptions.map((option) => (
              <button
                key={option.value}
                className={`${styles.filterButton} ${levelFilter === option.value ? styles.active : ''}`}
                onClick={() => handleLevelChange(option.value)}
                style={
                  levelFilter === option.value && option.color
                    ? {
                        '--level-color': option.color,
                        '--level-bg': `${option.color}15`
                      } as React.CSSProperties
                    : option.color
                    ? { '--level-color': option.color } as React.CSSProperties
                    : undefined
                }
                data-level={option.value !== 'all' ? option.value : undefined}
              >
                {option.color && (
                  <span
                    className={styles.levelDot}
                    style={{ backgroundColor: option.color }}
                  />
                )}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className={styles.resultsInfo}>
        <span className={styles.resultsCount}>
          {courses.length} {courses.length === 1 ? 'course' : 'courses'} found
        </span>
        {(styleFilter !== 'all' || levelFilter !== 'all') && (
          <button
            className={styles.clearFilters}
            onClick={() => {
              setStyleFilter('all');
              setLevelFilter('all');
            }}
          >
            Clear filters
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {/* Course Grid */}
      {courses.length > 0 ? (
        <div className={styles.grid}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3 className={styles.emptyTitle}>No courses found</h3>
          <p className={styles.emptyText}>
            Try adjusting your filters to find what you&apos;re looking for.
          </p>
          <button
            className={styles.resetButton}
            onClick={() => {
              setStyleFilter('all');
              setLevelFilter('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
