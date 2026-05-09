import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../utils/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Stars from '../components/Stars';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { dispatch, state } = useCart();
  const { toast } = useToast();
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [tab, setTab] = useState<'desc' | 'reviews'>('desc');

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '120px 24px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, marginBottom: 16 }}>Product Not Found</h1>
      <Link to="/products" style={{ color: 'var(--accent)' }}>← Back to Products</Link>
    </div>
  );

  const isWished = state.wishlist.includes(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const addToCart = () => {
    dispatch({ type: 'ADD', product, qty });
    toast(`${product.name} added to cart ✓`, 'success');
  };

  return (
    <div style={{ padding: '60px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 40, fontSize: 13, color: 'var(--text3)' }}>
          <Link to="/" style={{ color: 'var(--text3)' }}>Home</Link>
          <span>/</span>
          <Link to="/products" style={{ color: 'var(--text3)' }}>Products</Link>
          <span>/</span>
          <span style={{ color: 'var(--text)' }}>{product.name}</span>
        </div>

        {/* Main */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 80 }}>
          {/* Image */}
          <div style={{ position: 'relative' }}>
            <img src={product.image} alt={product.name} style={{
              width: '100%', aspectRatio: '1', objectFit: 'cover',
              borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)',
            }} />
            {product.badge && (
              <span style={{
                position: 'absolute', top: 20, left: 20,
                padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 700,
                background: product.badge === 'Sale' ? 'var(--danger)' : 'var(--success)',
                color: '#fff',
              }}>{product.badge}</span>
            )}
          </div>

          {/* Details */}
          <div>
            <p style={{ fontSize: 12, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 12 }}>
              {product.category}
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <Stars rating={product.rating} size={18} />
              <span style={{ color: 'var(--text2)', fontSize: 14 }}>{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 32 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 900, color: 'var(--accent)' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span style={{ fontSize: 20, color: 'var(--text3)', textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>
                  <span style={{ background: 'var(--danger)', color: '#fff', padding: '3px 10px', borderRadius: 99, fontSize: 13, fontWeight: 700 }}>-{discount}%</span>
                </>
              )}
            </div>

            <p style={{ color: 'var(--text2)', lineHeight: 1.7, marginBottom: 28 }}>{product.description}</p>

            {/* Colors */}
            {product.colors && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Color</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {product.colors.map(c => (
                    <button key={c} onClick={() => setSelectedColor(c)} style={{
                      width: 32, height: 32, borderRadius: '50%', background: c, border: 'none',
                      outline: selectedColor === c ? `3px solid var(--accent)` : '2px solid var(--border)',
                      outlineOffset: 2,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--surface)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 44, height: 44, fontSize: 20, color: 'var(--text2)' }}>−</button>
                <span style={{ width: 44, textAlign: 'center', fontWeight: 700, fontSize: 16 }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ width: 44, height: 44, fontSize: 20, color: 'var(--text2)' }}>+</button>
              </div>
              <span style={{ fontSize: 13, color: product.stock < 10 ? 'var(--danger)' : 'var(--success)', fontWeight: 600 }}>
                {product.stock < 10 ? `Only ${product.stock} left!` : `${product.stock} in stock`}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={addToCart} style={{
                flex: 1, padding: '16px', borderRadius: 12, fontWeight: 700, fontSize: 15,
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                color: '#0a0a0f', transition: 'transform 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
              >Add to Cart</button>
              <button onClick={() => dispatch({ type: 'TOGGLE_WISH', id: product.id })} style={{
                padding: '16px', borderRadius: 12, border: '1px solid var(--border2)',
                color: isWished ? 'var(--danger)' : 'var(--text2)', background: 'var(--surface)',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 32 }}>
            {(['desc', 'reviews'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '14px 28px', fontWeight: 600, fontSize: 14,
                color: tab === t ? 'var(--accent)' : 'var(--text2)',
                borderBottom: `2px solid ${tab === t ? 'var(--accent)' : 'transparent'}`,
                marginBottom: -1, transition: 'all 0.2s', background: 'none',
              }}>{t === 'desc' ? 'Description' : 'Reviews'}</button>
            ))}
          </div>
          {tab === 'desc' ? (
            <p style={{ color: 'var(--text2)', lineHeight: 1.8, maxWidth: 640 }}>{product.description}<br /><br />
              This product comes with a 1-year manufacturer warranty and 30-day return policy. Free shipping on this item.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
              {['Great product!', 'Exactly as described', 'Would buy again'].map((comment, i) => (
                <div key={i} style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', padding: 20, border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontWeight: 600 }}>Customer {i + 1}</span>
                    <Stars rating={5 - i * 0.5} />
                  </div>
                  <p style={{ color: 'var(--text2)', fontSize: 14 }}>{comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Related Products</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
