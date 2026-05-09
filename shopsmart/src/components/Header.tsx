import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { state, dispatch, count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/categories', label: 'Categories' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(10,10,15,0.95)' : 'rgba(10,10,15,0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 24, height: 70 }}>
        {/* Logo */}
        <Link to="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #e8c97a, #f5a623)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 900, color: '#0a0a0f',
          }}>S</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Shop<span style={{ color: 'var(--accent)' }}>Smart</span>
          </span>
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 4, flex: 1 }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
              color: location.pathname === link.to ? 'var(--accent)' : 'var(--text2)',
              background: location.pathname === link.to ? 'var(--accent-dim)' : 'transparent',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { if (location.pathname !== link.to) (e.target as HTMLElement).style.color = 'var(--text)'; }}
              onMouseLeave={e => { if (location.pathname !== link.to) (e.target as HTMLElement).style.color = 'var(--text2)'; }}
            >{link.label}</Link>
          ))}
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 320, position: 'relative' }}>
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Search products..."
            style={{
              width: '100%', padding: '9px 16px 9px 40px',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 99, color: 'var(--text)', fontSize: 13, outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target as HTMLElement).parentElement!.querySelector('input')!.style.borderColor = 'var(--accent)'}
            onBlur={e => (e.target as HTMLElement).parentElement!.querySelector('input')!.style.borderColor = 'var(--border)'}
          />
          <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </form>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link to="/profile" style={{ padding: 10, borderRadius: 8, color: 'var(--text2)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text2)'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </Link>
          <Link to="/wishlist" style={{ padding: 10, borderRadius: 8, color: 'var(--text2)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--danger)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text2)'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </Link>
          <button onClick={() => dispatch({ type: 'TOGGLE_CART' })} style={{
            position: 'relative', padding: 10, borderRadius: 8,
            color: state.isOpen ? 'var(--accent)' : 'var(--text2)',
            display: 'flex', alignItems: 'center', transition: 'color 0.2s',
            background: state.isOpen ? 'var(--accent-dim)' : 'transparent',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {count > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4,
                background: 'var(--accent)', color: '#0a0a0f',
                fontSize: 10, fontWeight: 700, borderRadius: 99,
                minWidth: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 4px',
              }}>{count}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
