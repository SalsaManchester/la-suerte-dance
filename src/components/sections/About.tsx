'use client';

import styles from './About.module.css';

const features = [
  {
    icon: '🎯',
    title: 'Structured Learning',
    description: 'Follow a clear path from beginner to advanced with courses designed by professional dancers.',
    gradient: 'primary',
  },
  {
    icon: '🪞',
    title: 'Mirror Mode',
    description: 'Flip videos horizontally to follow along as if looking in a mirror - perfect for practice.',
    gradient: 'secondary',
  },
  {
    icon: '⏱️',
    title: 'Speed Control',
    description: 'Slow down complex moves to 0.5x or 0.75x speed to master every detail at your pace.',
    gradient: 'accent',
  },
  {
    icon: '📱',
    title: 'Dance Anywhere',
    description: 'Access courses on any device. Practice in your living room, studio, or wherever you are.',
    gradient: 'tertiary',
  },
];

export default function About() {
  return (
    <section className={styles.about}>
      {/* Background Elements */}
      <div className={styles.bgElements}>
        <div className={styles.glowOrb1}></div>
        <div className={styles.glowOrb2}></div>
      </div>

      <div className="container">
        <div className={styles.aboutHeader}>
          <span className={styles.sectionLabel}>Why Choose Us</span>
          <h2 className={styles.sectionTitle}>
            Built for <span className="text-gradient">Dancers</span>
          </h2>
          <p className={styles.sectionDescription}>
            Every feature is designed to make your online learning experience feel as natural as being in a real dance studio.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={styles.featureCard}
              style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className={`${styles.featureIconWrapper} ${styles[feature.gradient]}`}>
                <span className={styles.featureIcon}>{feature.icon}</span>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <div className={`${styles.featureGlow} ${styles[feature.gradient]}`}></div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Courses</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Video Lessons</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>10k+</span>
            <span className={styles.statLabel}>Happy Students</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>4.9</span>
            <span className={styles.statLabel}>Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
