import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../utils/products';
import ProductCard from '../components/ProductCard';

const SearchPage = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: '60px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, marginBottom: 8 }}>
            {query ? `Results for "${query}"` : 'Search Products'}
          </h1>
          <p style={{ color: 'var(--text2)' }}>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
        </div>

        {/* Search bar */}
        <div style={{ position: 'relative', maxWidth: 500, marginBottom: 48 }}>
          <input
            defaultValue={query}
            placeholder="Search products..."
            onChange={e => {
              const v = e.target.value;
              if (v) setParams({ q: v }); else setParams({});
            }}
            style={{
              width: '100%', padding: '14px 20px 14px 48px',
              background: 'var(--surface)', border: '1px solid var(--border2)',
              borderRadius: 99, color: 'var(--text)', fontSize: 15, outline: 'none',
            }}
          />
          <svg style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }}
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text2)' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>No results found</p>
            <p>Try a different search term</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
