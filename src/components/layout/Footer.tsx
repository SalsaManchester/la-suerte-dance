import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoText}>La Suerte</span>
              <span className={styles.logoSubtext}>Dance School</span>
            </Link>
            <p className={styles.brandDescription}>
              Master Salsa and Bachata with world-class instructors. Join thousands of dancers learning online.
            </p>
            <div className={styles.newsletter}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterButton}>Subscribe</button>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkGroupTitle}>Learn</h4>
              <Link href="/courses" className={styles.footerLink}>All Courses</Link>
              <Link href="/courses?style=salsa" className={styles.footerLink}>Salsa Courses</Link>
              <Link href="/courses?style=bachata" className={styles.footerLink}>Bachata Courses</Link>
              <Link href="/instructors" className={styles.footerLink}>Instructors</Link>
              <Link href="/free" className={styles.footerLink}>Free Lessons</Link>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkGroupTitle}>Company</h4>
              <Link href="/about" className={styles.footerLink}>About Us</Link>
              <Link href="/pricing" className={styles.footerLink}>Pricing</Link>
              <Link href="/blog" className={styles.footerLink}>Blog</Link>
              <Link href="/careers" className={styles.footerLink}>Careers</Link>
              <Link href="/contact" className={styles.footerLink}>Contact</Link>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkGroupTitle}>Support</h4>
              <Link href="/help" className={styles.footerLink}>Help Center</Link>
              <Link href="/faq" className={styles.footerLink}>FAQ</Link>
              <Link href="/community" className={styles.footerLink}>Community</Link>
              <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
              <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} La Suerte Dance School. All rights reserved.
          </p>
          <div className={styles.socialLinks}>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
              YT
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
              IG
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="TikTok">
              TT
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
              FB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
