import { Header, Footer } from '@/components/layout';
import { Hero, About, FeaturedCourses } from '@/components/sections';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <FeaturedCourses />
      </main>
      <Footer />
    </>
  );
}
