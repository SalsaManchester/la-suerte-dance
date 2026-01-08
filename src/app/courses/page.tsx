import { Suspense } from 'react';
import { Header, Footer } from '@/components/layout';
import CoursesLibrary from '@/components/courses/CoursesLibrary';
import styles from './page.module.css';

export const metadata = {
  title: 'Courses | La Suerte Dance School',
  description: 'Browse our collection of Salsa and Bachata courses for all levels.',
};

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>
              Explore Our <span className="text-gradient">Courses</span>
            </h1>
            <p className={styles.subtitle}>
              From beginner basics to advanced techniques, find the perfect course for your dance journey.
            </p>
          </div>
        </section>

        <section className={styles.library}>
          <div className="container">
            <Suspense fallback={<div>Loading courses...</div>}>
              <CoursesLibrary />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
