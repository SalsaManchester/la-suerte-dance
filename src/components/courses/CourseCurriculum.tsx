'use client';

import { useState } from 'react';
import { ModuleWithLessons } from '@/types/database';
import styles from './CourseCurriculum.module.css';

interface CourseCurriculumProps {
  modules: ModuleWithLessons[];
  isPremium: boolean;
}

export default function CourseCurriculum({ modules, isPremium }: CourseCurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>(
    modules.length > 0 ? [modules[0].id] : []
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const getModuleDuration = (module: ModuleWithLessons) => {
    return module.lessons.reduce((acc, lesson) => acc + lesson.duration, 0);
  };

  return (
    <div className={styles.curriculum}>
      {modules.map((module, moduleIndex) => {
        const isExpanded = expandedModules.includes(module.id);
        const moduleDuration = getModuleDuration(module);

        return (
          <div key={module.id} className={styles.module}>
            {/* Module Header */}
            <button
              className={`${styles.moduleHeader} ${isExpanded ? styles.expanded : ''}`}
              onClick={() => toggleModule(module.id)}
            >
              <div className={styles.moduleInfo}>
                <span className={styles.moduleNumber}>Module {moduleIndex + 1}</span>
                <h3 className={styles.moduleTitle}>{module.title}</h3>
                <div className={styles.moduleMeta}>
                  <span>{module.lessons.length} lessons</span>
                  <span className={styles.metaDot}>•</span>
                  <span>{formatDuration(moduleDuration)}</span>
                </div>
              </div>
              <div className={styles.expandIcon}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>

            {/* Lessons */}
            {isExpanded && (
              <div className={styles.lessons}>
                {module.lessons.map((lesson, lessonIndex) => {
                  const isLocked = isPremium && !lesson.is_free;

                  return (
                    <div
                      key={lesson.id}
                      className={`${styles.lesson} ${isLocked ? styles.locked : ''}`}
                    >
                      <div className={styles.lessonNumber}>
                        {moduleIndex + 1}.{lessonIndex + 1}
                      </div>

                      <div className={styles.lessonContent}>
                        <div className={styles.lessonTitleRow}>
                          <span className={styles.lessonTitle}>{lesson.title}</span>
                          {lesson.is_free && isPremium && (
                            <span className={styles.freeBadge}>Free Preview</span>
                          )}
                        </div>
                        {lesson.description && (
                          <p className={styles.lessonDescription}>{lesson.description}</p>
                        )}
                      </div>

                      <div className={styles.lessonMeta}>
                        <span className={styles.lessonDuration}>
                          {formatDuration(lesson.duration)}
                        </span>
                        {isLocked ? (
                          <div className={styles.lockIcon}>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </div>
                        ) : (
                          <div className={styles.playIcon}>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
