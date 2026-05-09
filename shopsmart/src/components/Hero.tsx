import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: 'Discover Premium\nTech Essentials',
    subtitle: 'From wireless headphones to smart watches — curated for those who demand quality.',
    cta: 'Shop Electronics',
    link: '/products',
    tag: 'New Arrivals',
    bg: 'radial-gradient(ellipse at 70% 50%, rgba(100,120,200,0.2) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(232,201,122,0.1) 0%, transparent 50%)',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=500&fit=crop',
  },
  {
    title: 'Style That\nSpeaks Volumes',
    subtitle: 'Elevate your wardrobe with timeless fashion and modern athletic wear.',
    cta: 'Shop Fashion',
    link: '/products',
    tag: 'Trending Now',
    bg: 'radial-gradient(ellipse at 70% 50%, rgba(200,100,100,0.15) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(232,201,122,0.1) 0%, transparent 50%)',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=500&fit=crop',
  },
  {
    title: 'Transform Your\nLiving Space',
    subtitle: 'Beautiful home goods that blend function with aesthetic perfection.',
    cta: 'Shop Home',
    link: '/categories',
    tag: 'Best Sellers',
    bg: 'radial-gradient(ellipse at 70% 50%, rgba(100,200,150,0.15) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(232,201,122,0.1) 0%, transparent 50%)',
    img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=500&fit=crop',
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setActive(a => (a + 1) % slides.length); setAnimating(false); }, 300);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[active];

  return (
    <section style={{
      minHeight: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `var(--bg), ${slide.bg}`,
      position: 'relative', overflow: 'hidden',
      padding: '80px 24px',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative' }}>
        {/* Text */}
        <div style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateX(-20px)' : 'translateX(0)', transition: 'all 0.35s ease' }}>
          <span style={{
            display: 'inline-block', padding: '6px 16px', borderRadius: 99,
            background: 'var(--accent-dim)', border: '1px solid rgba(232,201,122,0.3)',
            color: 'var(--accent)', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: 24,
          }}>{slide.tag}</span>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 72px)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em',
            marginBottom: 24, whiteSpace: 'pre-line',
          }}>
            {slide.title}
          </h1>

          <p style={{ fontSize: 18, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 40, maxWidth: 460 }}>
            {slide.subtitle}
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to={slide.link} style={{
              padding: '16px 36px', borderRadius: 12,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              color: '#0a0a0f', fontWeight: 700, fontSize: 15,
              transition: 'all 0.2s', display: 'inline-block',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
            >{slide.cta} →</Link>
            <Link to="/search" style={{
              padding: '16px 36px', borderRadius: 12,
              border: '1px solid var(--border2)', color: 'var(--text2)',
              fontWeight: 600, fontSize: 15, transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)'; (e.currentTarget as HTMLElement).style.color = 'var(--text2)'; }}
            >Browse All</Link>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 8, marginTop: 48 }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: active === i ? 28 : 8, height: 8, borderRadius: 99,
                background: active === i ? 'var(--accent)' : 'var(--border2)',
                transition: 'all 0.3s', border: 'none',
              }} />
            ))}
          </div>
        </div>

        {/* Image */}
        <div style={{ position: 'relative', opacity: animating ? 0 : 1, transform: animating ? 'translateX(20px) scale(0.96)' : 'translateX(0) scale(1)', transition: 'all 0.35s ease' }}>
          <div style={{
            position: 'absolute', inset: -20,
            background: 'radial-gradient(ellipse, rgba(232,201,122,0.12), transparent 70%)',
            filter: 'blur(30px)',
          }} />
          <img src={slide.img} alt="Hero" style={{
            width: '100%', aspectRatio: '5/4', objectFit: 'cover',
            borderRadius: 'var(--radius-lg)', position: 'relative',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
            border: '1px solid var(--border)',
          }} />
          {/* Stats pill */}
          <div style={{
            position: 'absolute', bottom: -20, left: -20,
            background: 'var(--surface2)', border: '1px solid var(--border2)',
            borderRadius: 'var(--radius)', padding: '14px 20px',
            boxShadow: 'var(--shadow)',
          }}>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>Happy Customers</div>
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>50,000+</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
