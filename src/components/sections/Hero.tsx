import Link from 'next/link';
import { Button } from '@/components/ui';
import styles from './Hero.module.css';

// Pre-calculated particle positions to avoid hydration mismatch
const particles = [
  { x: 5, duration: 5.2 },
  { x: 15, duration: 4.8 },
  { x: 25, duration: 6.1 },
  { x: 35, duration: 3.9 },
  { x: 45, duration: 5.5 },
  { x: 55, duration: 4.2 },
  { x: 65, duration: 6.8 },
  { x: 75, duration: 3.5 },
  { x: 85, duration: 5.9 },
  { x: 95, duration: 4.5 },
  { x: 10, duration: 6.3 },
  { x: 20, duration: 3.7 },
  { x: 30, duration: 5.1 },
  { x: 40, duration: 4.9 },
  { x: 50, duration: 6.5 },
  { x: 60, duration: 3.3 },
  { x: 70, duration: 5.7 },
  { x: 80, duration: 4.1 },
  { x: 90, duration: 6.9 },
  { x: 100, duration: 3.8 },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Animated Background */}
      <div className={styles.bgEffects}>
        <div className={styles.gridOverlay}></div>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
        <div className={styles.orb4}></div>
        <div className={styles.particles}>
          {particles.map((p, i) => (
            <span key={i} className={styles.particle} style={{
              '--delay': `${i * 0.5}s`,
              '--x': `${p.x}%`,
              '--duration': `${p.duration}s`
            } as React.CSSProperties}></span>
          ))}
        </div>
      </div>

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          {/* Badge */}
          <div className={styles.badge}>
            <span className={styles.badgePulse}></span>
            <span className={styles.badgeText}>Now Streaming 50+ Courses</span>
          </div>

          {/* Main Headline */}
          <h1 className={styles.title}>
            <span className={styles.titleLine}>Feel The</span>
            <span className={`${styles.titleLine} ${styles.titleGradient}`}>
              Rhythm
            </span>
          </h1>

          {/* Subheadline */}
          <p className={styles.subtitle}>
            Master <strong>Salsa</strong> & <strong>Bachata</strong> with world-class instructors.
            Learn at your own pace, anywhere, anytime.
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctaGroup}>
            <Link href="/courses">
              <Button size="lg">
                Start Dancing Free
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Button>
            </Link>
            <Link href="/courses" className={styles.secondaryCta}>
              <span className={styles.playIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </span>
              Watch Preview
            </Link>
          </div>

          {/* Social Proof */}
          <div className={styles.socialProof}>
            <div className={styles.avatarStack}>
              {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
                <div key={i} className={styles.avatar} style={{ '--i': i } as React.CSSProperties}>
                  {letter}
                </div>
              ))}
            </div>
            <div className={styles.proofText}>
              <div className={styles.proofStars}>★★★★★</div>
              <span>Join <strong>10,000+</strong> dancers worldwide</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className={styles.heroVisual}>
          <div className={styles.visualContainer}>
            {/* Main Video/Image Placeholder */}
            <div className={styles.mainVisual}>
              <div className={styles.visualGlow}></div>
              <div className={styles.visualContent}>
                <div className={styles.dancerSilhouette}>
                  <span className={styles.silhouetteEmoji}>💃</span>
                  <span className={styles.silhouetteEmoji2}>🕺</span>
                </div>
                <div className={styles.playButton}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className={styles.floatingCard} style={{ '--delay': '0s' } as React.CSSProperties}>
              <div className={styles.cardIcon}>🔥</div>
              <div className={styles.cardText}>
                <span className={styles.cardTitle}>Trending Now</span>
                <span className={styles.cardSubtitle}>Bachata Sensual</span>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.floatingCard2}`} style={{ '--delay': '1s' } as React.CSSProperties}>
              <div className={styles.cardIcon}>⚡</div>
              <div className={styles.cardText}>
                <span className={styles.cardTitle}>New Drop</span>
                <span className={styles.cardSubtitle}>Salsa Shines</span>
              </div>
            </div>

            <div className={styles.statsFloat}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Lessons</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className={styles.bottomFade}></div>
    </section>
  );
}
