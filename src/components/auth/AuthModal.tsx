'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './AuthModal.module.css';

type AuthMode = 'login' | 'signup' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, resetPassword } = useAuth();
  const router = useRouter();

  // Reset form and sync mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
      setSuccess('');
      setPassword('');
    }
  }, [isOpen, initialMode]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      onClose();
      router.push('/dashboard');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
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
      setSuccess('Check your email for a confirmation link!');
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess('Check your email for reset instructions!');
      setLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    setSuccess('');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoText}>La Suerte</span>
          <span className={styles.logoSubtext}>DANCE SCHOOL</span>
        </div>

        {/* Login Form */}
        {mode === 'login' && (
          <>
            <h2 className={styles.title}>Welcome Back!</h2>
            <p className={styles.subtitle}>Sign in to continue your dance journey</p>

            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="button"
                className={styles.forgotLink}
                onClick={() => switchMode('forgot')}
              >
                Forgot password?
              </button>

              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className={styles.switchText}>
              Don&apos;t have an account?{' '}
              <button onClick={() => switchMode('signup')}>Sign up free</button>
            </p>
          </>
        )}

        {/* Signup Form */}
        {mode === 'signup' && (
          <>
            <h2 className={styles.title}>Start Dancing Today</h2>
            <p className={styles.subtitle}>Create your free account</p>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            {!success && (
              <form onSubmit={handleSignup} className={styles.form}>
                <div className={styles.field}>
                  <label htmlFor="signup-name">Full Name</label>
                  <input
                    id="signup-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="signup-email">Email Address</label>
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                  />
                </div>

                <button type="submit" className={styles.submitButton} disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Free Account'}
                </button>
              </form>
            )}

            <p className={styles.switchText}>
              Already have an account?{' '}
              <button onClick={() => switchMode('login')}>Sign in</button>
            </p>
          </>
        )}

        {/* Forgot Password Form */}
        {mode === 'forgot' && (
          <>
            <h2 className={styles.title}>Reset Password</h2>
            <p className={styles.subtitle}>Enter your email for reset instructions</p>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            {!success && (
              <form onSubmit={handleForgotPassword} className={styles.form}>
                <div className={styles.field}>
                  <label htmlFor="forgot-email">Email Address</label>
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <button type="submit" className={styles.submitButton} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            )}

            <p className={styles.switchText}>
              Remember your password?{' '}
              <button onClick={() => switchMode('login')}>Sign in</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
