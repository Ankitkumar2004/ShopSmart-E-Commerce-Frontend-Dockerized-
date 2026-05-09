import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const LoginPage = () => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast(tab === 'login' ? 'Welcome back! 👋' : 'Account created! Welcome 🎉', 'success');
    setTimeout(() => navigate('/'), 1500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px',
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 10, color: 'var(--text)', fontSize: 15, outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
            Shop<span style={{ color: 'var(--accent)' }}>Smart</span>
          </div>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>
            {tab === 'login' ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: 36 }}>
          {/* Tab toggle */}
          <div style={{ display: 'flex', background: 'var(--bg2)', borderRadius: 10, padding: 4, marginBottom: 28 }}>
            {(['login', 'signup'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: '10px', borderRadius: 8, fontWeight: 600, fontSize: 14,
                background: tab === t ? 'var(--surface2)' : 'transparent',
                color: tab === t ? 'var(--text)' : 'var(--text3)',
                border: 'none', transition: 'all 0.2s',
              }}>{t === 'login' ? 'Sign In' : 'Sign Up'}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {tab === 'signup' && (
              <input style={inputStyle} placeholder="Full Name" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            )}
            <input style={inputStyle} placeholder="Email address" type="email" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            <input style={inputStyle} placeholder="Password" type="password" value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />

            {tab === 'login' && (
              <div style={{ textAlign: 'right' }}>
                <a href="#" style={{ fontSize: 13, color: 'var(--accent)' }}>Forgot password?</a>
              </div>
            )}

            <button type="submit" style={{
              padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 15,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              color: '#0a0a0f', marginTop: 8, transition: 'transform 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
            >{tab === 'login' ? 'Sign In →' : 'Create Account →'}</button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text2)', fontSize: 14 }}>
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setTab(tab === 'login' ? 'signup' : 'login')} style={{ color: 'var(--accent)', fontWeight: 600, background: 'none', border: 'none' }}>
            {tab === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
