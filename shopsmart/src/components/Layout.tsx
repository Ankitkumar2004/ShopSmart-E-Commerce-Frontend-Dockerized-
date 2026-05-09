import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Header />
    <CartDrawer />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
