import Link from 'next/link';
import styles from './auth.module.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.authPage}>
      <div className={styles.authBackground}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
      </div>

      <div className={styles.authContainer}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>La Suerte</span>
          <span className={styles.logoSubtext}>DANCE SCHOOL</span>
        </Link>

        {children}

        <p className={styles.footerText}>
          By continuing, you agree to our{' '}
          <Link href="/terms">Terms of Service</Link> and{' '}
          <Link href="/privacy">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
