import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../utils/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Stars from './Stars';

const ProductCard = ({ product }: { product: Product }) => {
  const { dispatch, state } = useCart();
  const { toast } = useToast();
  const [hovered, setHovered] = useState(false);
  const isWished = state.wishlist.includes(product.id);

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD', product });
    toast(`${product.name} added to cart`, 'success');
  };

  const toggleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_WISH', id: product.id });
    toast(isWished ? 'Removed from wishlist' : 'Added to wishlist ❤️');
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--surface)',
          border: `1px solid ${hovered ? 'var(--border2)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered ? 'var(--shadow-lg)' : 'none',
          position: 'relative',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3' }}>
          <img src={product.image} alt={product.name} style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }} />
          {/* Badges */}
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
            {product.badge && (
              <span style={{
                padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                background: product.badge === 'Sale' ? 'var(--danger)' : product.badge === 'Hot' ? 'var(--accent2)' : 'var(--success)',
                color: product.badge === 'Sale' ? '#fff' : '#0a0a0f',
              }}>{product.badge}</span>
            )}
            {discount > 0 && (
              <span style={{ padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, background: 'rgba(0,0,0,0.7)', color: 'var(--accent)' }}>
                -{discount}%
              </span>
            )}
          </div>
          {/* Wishlist */}
          <button onClick={toggleWish} style={{
            position: 'absolute', top: 10, right: 10,
            width: 36, height: 36, borderRadius: 99,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: isWished ? 'var(--danger)' : 'var(--text2)', border: 'none',
            transition: 'all 0.2s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill={isWished ? 'currentColor' : 'none'}
              stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          {/* Add to cart overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            paddingBottom: 16,
          }}>
            <button onClick={addToCart} style={{
              padding: '10px 24px', borderRadius: 99,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              color: '#0a0a0f', fontWeight: 700, fontSize: 13,
              transform: hovered ? 'translateY(0)' : 'translateY(10px)',
              transition: 'transform 0.3s',
            }}>Add to Cart</button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '16px' }}>
          <p style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
            {product.category}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3, marginBottom: 10, color: 'var(--text)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {product.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Stars rating={product.rating} />
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>({product.reviews})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: 13, color: 'var(--text3)', textDecoration: 'line-through' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span style={{
              fontSize: 11, fontWeight: 600,
              color: product.stock < 10 ? 'var(--danger)' : 'var(--success)',
            }}>
              {product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
