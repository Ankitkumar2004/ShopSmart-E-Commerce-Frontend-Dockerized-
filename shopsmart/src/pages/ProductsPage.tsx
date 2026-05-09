import React from 'react';
import ProductGrid from '../components/ProductGrid';

const ProductsPage = () => (
  <div style={{ padding: '60px 24px' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ marginBottom: 48 }}>
        <p style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Browse Our Collection</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, letterSpacing: '-0.02em' }}>All Products</h1>
      </div>
      <ProductGrid showFilters />
    </div>
  </div>
);

export default ProductsPage;
