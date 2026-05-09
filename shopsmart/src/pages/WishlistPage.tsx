import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../utils/products';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const { state } = useCart();
  const wished = products.filter(p => state.wishlist.includes(p.id));

  return (
    <div style={{ padding: '60px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, marginBottom: 8 }}>Wishlist</h1>
          <p style={{ color: 'var(--text2)' }}>{wished.length} saved item{wished.length !== 1 ? 's' : ''}</p>
        </div>
        {wished.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 72, marginBottom: 20 }}>❤️</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, marginBottom: 12 }}>Your wishlist is empty</h2>
            <p style={{ color: 'var(--text2)', marginBottom: 32 }}>Save your favorite items here</p>
            <Link to="/products" style={{ padding: '14px 32px', borderRadius: 12, background: 'linear-gradient(135deg, var(--accent), var(--accent2))', color: '#0a0a0f', fontWeight: 700 }}>Browse Products</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {wished.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
