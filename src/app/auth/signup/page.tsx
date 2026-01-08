'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from '../auth.module.css';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const { error } = await signUp(email, password, fullName);

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
          We&apos;ve sent a confirmation link to <strong>{email}</strong>.
          Click the link to activate your account and start dancing!
        </p>
        <div className={styles.switchAuth}>
          <Link href="/auth/login">Back to Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authCard}>
      <h1 className={styles.authTitle}>Start Dancing Today</h1>
      <p className={styles.authSubtitle}>Create your free account</p>

      {error && (
        <div className={`${styles.message} ${styles.errorMessage}`}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.authForm}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.formLabel}>
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={styles.formInput}
            placeholder="Your name"
            required
          />
        </div>

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

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.formInput}
            placeholder="At least 6 characters"
            required
            minLength={6}
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Creating account...' : 'Create Free Account'}
        </button>
      </form>

      <div className={styles.switchAuth}>
        Already have an account?{' '}
        <Link href="/auth/login">Sign in</Link>
      </div>
    </div>
  );
}
