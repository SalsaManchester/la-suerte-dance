'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from '../auth.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.authCard}>
        <h1 className={styles.authTitle}>Check Your Email</h1>
        <p className={styles.authSubtitle}>
          We&apos;ve sent password reset instructions to <strong>{email}</strong>.
        </p>
        <div className={styles.switchAuth}>
          <Link href="/auth/login">Back to Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authCard}>
      <h1 className={styles.authTitle}>Reset Password</h1>
      <p className={styles.authSubtitle}>
        Enter your email and we&apos;ll send you instructions to reset your password.
      </p>

      {error && (
        <div className={`${styles.message} ${styles.errorMessage}`}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.authForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formInput}
            placeholder="you@example.com"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <div className={styles.switchAuth}>
        Remember your password?{' '}
        <Link href="/auth/login">Sign in</Link>
      </div>
    </div>
  );
}
