import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { getCourseBySlug, courses } from '@/data/mock-data';
import CourseHero from '@/components/courses/CourseHero';
import CourseCurriculum from '@/components/courses/CourseCurriculum';
import styles from './page.module.css';

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courses
    .filter((c) => c.is_published)
    .map((course) => ({
      slug: course.slug,
    }));
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: `${course.title} | La Suerte Dance School`,
    description: course.short_description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <CourseHero course={course} />

        <section className={styles.content}>
          <div className="container">
            <div className={styles.layout}>
              {/* Main Content */}
              <div className={styles.mainContent}>
                {/* About */}
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>About This Course</h2>
                  <p className={styles.description}>{course.description}</p>
                </div>

                {/* Curriculum */}
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>
                    Course Curriculum
                    <span className={styles.lessonCount}>
                      {course.lessons_count} lessons
                    </span>
                  </h2>
                  <CourseCurriculum modules={course.modules} isPremium={course.is_premium} courseSlug={slug} />
                </div>
              </div>

              {/* Sidebar */}
              <aside className={styles.sidebar}>
                <div className={styles.stickyCard}>
                  {/* Instructor */}
                  <div className={styles.instructorCard}>
                    <h3 className={styles.cardTitle}>Your Instructor</h3>
                    <div className={styles.instructorInfo}>
                      <div className={styles.instructorAvatar}>
                        {course.instructor.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className={styles.instructorName}>{course.instructor.name}</h4>
                        <p className={styles.instructorSpecialty}>
                          {course.instructor.specialties.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' & ')} Specialist
                        </p>
                      </div>
                    </div>
                    <p className={styles.instructorBio}>{course.instructor.bio}</p>
                  </div>

                  {/* What You'll Learn */}
                  <div className={styles.benefitsCard}>
                    <h3 className={styles.cardTitle}>What You&apos;ll Learn</h3>
                    <ul className={styles.benefitsList}>
                      <li>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Master the fundamental techniques
                      </li>
                      <li>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Build confidence on the dance floor
                      </li>
                      <li>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Learn at your own pace
                      </li>
                      <li>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Practice with detailed breakdowns
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
