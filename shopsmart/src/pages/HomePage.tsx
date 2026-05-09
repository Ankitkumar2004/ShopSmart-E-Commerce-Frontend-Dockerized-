import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';

const stats = [
  { label: 'Products', value: '500+' },
  { label: 'Happy Customers', value: '50K+' },
  { label: 'Countries', value: '40+' },
  { label: 'Reviews', value: '99K+' },
];

const features = [
  { icon: '🚀', title: 'Fast Delivery', desc: 'Free shipping on orders over $50. Delivered in 2-3 days.' },
  { icon: '🔒', title: 'Secure Payments', desc: 'SSL encrypted checkout. Your data is always protected.' },
  { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free returns. No questions asked.' },
  { icon: '⭐', title: 'Top Quality', desc: 'Curated products from trusted brands worldwide.' },
];

const HomePage = () => (
  <div>
    <Hero />

    {/* Stats */}
    <section style={{ background: 'var(--bg2)', padding: '60px 24px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, color: 'var(--accent)', marginBottom: 4 }}>{s.value}</div>
            <div style={{ color: 'var(--text2)', fontSize: 14 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Featured Products */}
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Handpicked For You</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em' }}>Featured Products</h2>
          </div>
          <Link to="/products" style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            View all →
          </Link>
        </div>
        <ProductGrid limit={8} />
      </div>
    </section>

    {/* Features */}
    <section style={{ background: 'var(--bg2)', padding: '80px 24px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
        {features.map(f => (
          <div key={f.title} style={{ textAlign: 'center', padding: 32, background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
            <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA Banner */}
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(232,201,122,0.15) 0%, rgba(245,166,35,0.08) 100%)',
          border: '1px solid rgba(232,201,122,0.25)',
          padding: '60px 48px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(232,201,122,0.06)', filter: 'blur(40px)' }} />
          <p style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Limited Time Offer</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 900, marginBottom: 16, letterSpacing: '-0.03em' }}>Up to 40% Off Sale Items</h2>
          <p style={{ color: 'var(--text2)', fontSize: 18, marginBottom: 36 }}>Don't miss out on our biggest deals of the season.</p>
          <Link to="/products" style={{
            padding: '16px 48px', borderRadius: 12,
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            color: '#0a0a0f', fontWeight: 700, fontSize: 16, display: 'inline-block',
          }}>Shop the Sale</Link>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
