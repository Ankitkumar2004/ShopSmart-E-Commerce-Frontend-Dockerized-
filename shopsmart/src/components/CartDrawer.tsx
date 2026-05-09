import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { state, dispatch, total, count } = useCart();

  if (!state.isOpen) return null;

  return (
    <>
      <div onClick={() => dispatch({ type: 'CLOSE_CART' })} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200,
        backdropFilter: 'blur(4px)',
      }} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 420, maxWidth: '100vw',
        background: 'var(--bg2)', borderLeft: '1px solid var(--border)',
        zIndex: 201, display: 'flex', flexDirection: 'column',
        animation: 'slideIn 0.35s ease',
      }}>
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>Your Cart</h2>
            <p style={{ color: 'var(--text2)', fontSize: 13 }}>{count} item{count !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => dispatch({ type: 'CLOSE_CART' })} style={{
            width: 36, height: 36, borderRadius: 8, background: 'var(--surface)',
            color: 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {state.items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text2)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
              <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Your cart is empty</p>
              <p style={{ fontSize: 14 }}>Add some products to get started</p>
            </div>
          ) : state.items.map(item => (
            <div key={item.id} style={{
              display: 'flex', gap: 14, padding: 16, background: 'var(--surface)',
              borderRadius: '12px', border: '1px solid var(--border)',
            }}>
              <img src={item.image} alt={item.name} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>${item.price.toFixed(2)}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: 'var(--bg2)', borderRadius: 8, overflow: 'hidden' }}>
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.quantity - 1 })}
                      style={{ width: 30, height: 30, color: 'var(--text2)', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                    <span style={{ width: 30, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{item.quantity}</span>
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.quantity + 1 })}
                      style={{ width: 30, height: 30, color: 'var(--text2)', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  </div>
                  <button onClick={() => dispatch({ type: 'REMOVE', id: item.id })} style={{ color: 'var(--danger)', fontSize: 12 }}>Remove</button>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}>${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div style={{ padding: 24, borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ color: 'var(--text2)' }}>Subtotal</span>
              <span style={{ fontWeight: 700, fontSize: 20, fontFamily: 'var(--font-display)' }}>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" onClick={() => dispatch({ type: 'CLOSE_CART' })} style={{
              display: 'block', textAlign: 'center', padding: '14px 24px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              color: '#0a0a0f', fontWeight: 700, borderRadius: 12, fontSize: 15,
              transition: 'opacity 0.2s',
            }}>
              Proceed to Checkout →
            </Link>
            <button onClick={() => dispatch({ type: 'CLEAR' })} style={{
              width: '100%', marginTop: 10, padding: '10px 24px',
              color: 'var(--danger)', fontSize: 13,
            }}>Clear cart</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
