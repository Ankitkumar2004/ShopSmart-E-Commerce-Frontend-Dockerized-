import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const CheckoutPage = () => {
  const { state, dispatch, total } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '', card: '', expiry: '', cvv: '' });
  const [placed, setPlaced] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const placeOrder = () => {
    setPlaced(true);
    dispatch({ type: 'CLEAR' });
    toast('Order placed successfully! 🎉', 'success');
    setTimeout(() => navigate('/'), 4000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px',
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 10, color: 'var(--text)', fontSize: 14, outline: 'none',
  };

  if (placed) return (
    <div style={{ textAlign: 'center', padding: '120px 24px' }}>
      <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 900, marginBottom: 16, color: 'var(--accent)' }}>Order Placed!</h1>
      <p style={{ color: 'var(--text2)', fontSize: 18, marginBottom: 8 }}>Thank you for your purchase.</p>
      <p style={{ color: 'var(--text3)', fontSize: 14 }}>Redirecting to home in a moment...</p>
    </div>
  );

  if (state.items.length === 0) return (
    <div style={{ textAlign: 'center', padding: '120px 24px' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, marginBottom: 16 }}>Your cart is empty</h1>
      <Link to="/products" style={{ color: 'var(--accent)', fontWeight: 600 }}>← Shop Now</Link>
    </div>
  );

  return (
    <div style={{ padding: '60px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>
        {/* Left */}
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, marginBottom: 40 }}>Checkout</h1>

          {/* Steps */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 40, background: 'var(--surface)', borderRadius: 12, padding: 4, border: '1px solid var(--border)' }}>
            {[['1', 'Shipping'], ['2', 'Payment'], ['3', 'Review']].map(([n, label]) => (
              <div key={n} style={{
                flex: 1, textAlign: 'center', padding: '10px',
                borderRadius: 8,
                background: step === Number(n) ? 'var(--accent-dim)' : 'transparent',
                color: step === Number(n) ? 'var(--accent)' : 'var(--text3)',
                fontWeight: step === Number(n) ? 700 : 400,
                fontSize: 13, transition: 'all 0.2s',
              }}>Step {n}: {label}</div>
            ))}
          </div>

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Shipping Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input style={inputStyle} placeholder="Full Name" value={form.name} onChange={update('name')} />
                <input style={inputStyle} placeholder="Email" type="email" value={form.email} onChange={update('email')} />
              </div>
              <input style={inputStyle} placeholder="Street Address" value={form.address} onChange={update('address')} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input style={inputStyle} placeholder="City" value={form.city} onChange={update('city')} />
                <input style={inputStyle} placeholder="ZIP Code" value={form.zip} onChange={update('zip')} />
              </div>
              <button onClick={() => setStep(2)} disabled={!form.name || !form.email || !form.address} style={{
                padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15,
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                color: '#0a0a0f', alignSelf: 'flex-start', marginTop: 8,
                opacity: (!form.name || !form.email || !form.address) ? 0.5 : 1,
              }}>Continue to Payment →</button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Payment Details</h2>
              <input style={inputStyle} placeholder="Card Number (1234 5678 9012 3456)" value={form.card} onChange={update('card')} maxLength={19} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input style={inputStyle} placeholder="MM/YY" value={form.expiry} onChange={update('expiry')} />
                <input style={inputStyle} placeholder="CVV" value={form.cvv} onChange={update('cvv')} maxLength={3} />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button onClick={() => setStep(1)} style={{ padding: '14px 24px', borderRadius: 12, border: '1px solid var(--border)', color: 'var(--text2)' }}>← Back</button>
                <button onClick={() => setStep(3)} disabled={!form.card} style={{
                  padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15,
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  color: '#0a0a0f', opacity: !form.card ? 0.5 : 1,
                }}>Review Order →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Review Your Order</h2>
              <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: 24, marginBottom: 24 }}>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>{form.name} — {form.email}</p>
                <p style={{ color: 'var(--text2)', fontSize: 14 }}>{form.address}, {form.city} {form.zip}</p>
                <p style={{ color: 'var(--text2)', fontSize: 14, marginTop: 8 }}>Card ending in {form.card.slice(-4) || '****'}</p>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => setStep(2)} style={{ padding: '14px 24px', borderRadius: 12, border: '1px solid var(--border)', color: 'var(--text2)' }}>← Back</button>
                <button onClick={placeOrder} style={{
                  padding: '14px 40px', borderRadius: 12, fontWeight: 700, fontSize: 15,
                  background: 'linear-gradient(135deg, #5ce0a0, #2dc080)',
                  color: '#0a0a0f',
                }}>Place Order ✓</button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div style={{ position: 'sticky', top: 90, height: 'fit-content' }}>
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: 28 }}>
            <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 24 }}>Order Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {state.items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 8 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--text2)' }}>x{item.quantity}</p>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text2)', fontSize: 14 }}>
                <span>Subtotal</span><span>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text2)', fontSize: 14 }}>
                <span>Shipping</span><span style={{ color: 'var(--success)' }}>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18, marginTop: 8 }}>
                <span>Total</span>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
