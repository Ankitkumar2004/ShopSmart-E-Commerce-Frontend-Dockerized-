import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', marginTop: 80 }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          Shop<span style={{ color: 'var(--accent)' }}>Smart</span>
        </div>
        <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7 }}>
          Premium products curated for the discerning buyer. Quality guaranteed.
        </p>
      </div>
      {[
        { title: 'Shop', links: [['Products', '/products'], ['Categories', '/categories'], ['Search', '/search']] },
        { title: 'Account', links: [['Profile', '/profile'], ['Wishlist', '/wishlist'], ['Orders', '/checkout']] },
        { title: 'Support', links: [['Contact', '/contact'], ['FAQ', '/contact'], ['Returns', '/contact']] },
      ].map(section => (
        <div key={section.title}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 16 }}>
            {section.title}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {section.links.map(([label, to]) => (
              <Link key={label} to={to} style={{ color: 'var(--text2)', fontSize: 14, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text2)'}
              >{label}</Link>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div style={{ borderTop: '1px solid var(--border)', padding: '20px 24px', textAlign: 'center', color: 'var(--text3)', fontSize: 13 }}>
      © {new Date().getFullYear()} ShopSmart. All rights reserved.
    </div>
  </footer>
);

export default Footer;
