import React from 'react';
import { Link } from 'react-router-dom';

const cats = [
  { name: 'Electronics', icon: '⚡', count: 4, color: '#4a7adc', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
  { name: 'Fashion', icon: '👗', count: 3, color: '#dc4a7a', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop' },
  { name: 'Home', icon: '🏡', count: 2, color: '#7adc4a', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop' },
  { name: 'Books', icon: '📚', count: 1, color: '#dc9a4a', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop' },
  { name: 'Sports', icon: '🏃', count: 2, color: '#4adcba', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop' },
];

const CategoriesPage = () => (
  <div style={{ padding: '60px 24px' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ marginBottom: 56 }}>
        <p style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Browse by Type</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, letterSpacing: '-0.02em' }}>Categories</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {cats.map((cat, i) => (
          <Link key={cat.name} to={`/products`} style={{ textDecoration: 'none', animation: `fadeUp 0.5s ease ${i * 0.08}s both`, display: 'block' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative',
              border: '1px solid var(--border)', transition: 'all 0.3s',
              aspectRatio: '4/3',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)` }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{cat.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{cat.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{cat.count} products</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default CategoriesPage;
