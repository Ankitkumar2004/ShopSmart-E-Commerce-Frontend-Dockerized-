import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Message sent! We\'ll reply within 24h 📧', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 10, color: 'var(--text)', fontSize: 14, outline: 'none',
  };

  return (
    <div style={{ padding: '60px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
        <div>
          <p style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>Get In Touch</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, marginBottom: 20, lineHeight: 1.1 }}>We'd love to hear from you</h1>
          <p style={{ color: 'var(--text2)', lineHeight: 1.7, marginBottom: 48 }}>Have a question, feedback, or need support? Our team is ready to help. We typically respond within 24 hours.</p>

          {[
            { icon: '📧', label: 'Email', value: 'contact@shopsmart.com' },
            { icon: '📱', label: 'Phone', value: '+91 8279680144' },
            { icon: '📍', label: 'Location', value: 'Delhi, India' },
            { icon: '⏰', label: 'Hours', value: 'Mon–Fri, 9am–6pm IST' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{item.label}</p>
                <p style={{ fontSize: 15 }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: 36 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 28 }}>Send a Message</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <input style={inputStyle} placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              <input style={inputStyle} placeholder="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <input style={inputStyle} placeholder="Subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
            <textarea style={{ ...inputStyle, minHeight: 140, resize: 'vertical' } as React.CSSProperties}
              placeholder="Your message..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
            <button type="submit" style={{
              padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 15,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              color: '#0a0a0f',
            }}>Send Message →</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
