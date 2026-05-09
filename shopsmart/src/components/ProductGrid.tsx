import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { products, categories } from '../utils/products';

interface Props { filterCategory?: string; limit?: number; showFilters?: boolean; }

const ProductGrid = ({ filterCategory, limit, showFilters = false }: Props) => {
  const [selectedCat, setSelectedCat] = useState(filterCategory || 'All');
  const [sort, setSort] = useState('featured');
  const [priceMax, setPriceMax] = useState(300);

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      (selectedCat === 'All' ? true : p.category === selectedCat) &&
      p.price <= priceMax
    );
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    if (limit) list = list.slice(0, limit);
    return list;
  }, [selectedCat, sort, priceMax, limit]);

  return (
    <div>
      {showFilters && (
        <div style={{ marginBottom: 32 }}>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCat(cat)} style={{
                padding: '8px 20px', borderRadius: 99, fontSize: 13, fontWeight: 500,
                background: selectedCat === cat ? 'var(--accent)' : 'var(--surface)',
                color: selectedCat === cat ? '#0a0a0f' : 'var(--text2)',
                border: `1px solid ${selectedCat === cat ? 'var(--accent)' : 'var(--border)'}`,
                transition: 'all 0.2s',
              }}>{cat}</button>
            ))}
          </div>
          {/* Sort + Price */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{
              padding: '8px 16px', borderRadius: 8, background: 'var(--surface)',
              border: '1px solid var(--border)', color: 'var(--text)', fontSize: 13, outline: 'none',
            }}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>Max: ${priceMax}</span>
              <input type="range" min={20} max={300} value={priceMax}
                onChange={e => setPriceMax(Number(e.target.value))}
                style={{ accentColor: 'var(--accent)', width: 120 }}
              />
            </div>
            <span style={{ fontSize: 13, color: 'var(--text3)' }}>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text2)' }}>
          <p style={{ fontSize: 18, marginBottom: 8 }}>No products found</p>
          <p style={{ fontSize: 14 }}>Try adjusting your filters</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {filtered.map((product, i) => (
            <div key={product.id} style={{ animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
