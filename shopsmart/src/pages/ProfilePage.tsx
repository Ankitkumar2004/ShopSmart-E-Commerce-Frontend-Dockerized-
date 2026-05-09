import React, { useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState({ name: 'Yash Pratap Singh', email: 'yashpratapsingh2802@gmail.com', phone: '+91 8279680144', city: 'Delhi, India' });
  const [editing, setEditing] = useState(false);

  const orders = [
    { id: '#SS-1042', date: 'Apr 28, 2026', status: 'Delivered', total: 139.97 },
    { id: '#SS-0981', date: 'Mar 15, 2026', status: 'Delivered', total: 59.99 },
    { id: '#SS-0812', date: 'Feb 02, 2026', status: 'Delivered', total: 249.98 },
  ];

  return (
    <div style={{ padding: '60px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, marginBottom: 48 }}>My Account</h1>

        {/* Profile Card */}
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: 36, marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, fontWeight: 700, color: '#0a0a0f',
              fontFamily: 'var(--font-display)',
            }}>{user.name[0]}</div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700 }}>{user.name}</h2>
              <p style={{ color: 'var(--text2)', fontSize: 14 }}>Premium Member</p>
            </div>
            <button onClick={() => setEditing(!editing)} style={{
              marginLeft: 'auto', padding: '10px 20px', borderRadius: 10,
              border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 13, fontWeight: 600,
            }}>{editing ? 'Cancel' : 'Edit Profile'}</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { label: 'Full Name', key: 'name' as const },
              { label: 'Email', key: 'email' as const },
              { label: 'Phone', key: 'phone' as const },
              { label: 'City', key: 'city' as const },
            ].map(({ label, key }) => (
              <div key={key}>
                <p style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{label}</p>
                {editing ? (
                  <input value={user[key]} onChange={e => setUser(u => ({ ...u, [key]: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none' }} />
                ) : (
                  <p style={{ fontSize: 15 }}>{user[key]}</p>
                )}
              </div>
            ))}
          </div>
          {editing && (
            <button onClick={() => setEditing(false)} style={{
              marginTop: 24, padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 14,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))', color: '#0a0a0f',
            }}>Save Changes</button>
          )}
        </div>

        {/* Order History */}
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: 36 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Order History</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {orders.map(order => (
              <div key={order.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 20px', background: 'var(--bg2)', borderRadius: 10, border: '1px solid var(--border)',
              }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14 }}>{order.id}</p>
                  <p style={{ color: 'var(--text3)', fontSize: 12 }}>{order.date}</p>
                </div>
                <span style={{ padding: '4px 12px', borderRadius: 99, background: 'rgba(92,224,160,0.15)', color: 'var(--success)', fontSize: 12, fontWeight: 600 }}>
                  {order.status}
                </span>
                <p style={{ fontWeight: 700, color: 'var(--accent)' }}>${order.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
