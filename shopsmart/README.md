# 🛍️ ShopSmart — Premium E-Commerce App

A full-featured React + TypeScript e-commerce application with a sleek dark aesthetic.

## ✨ Features

- 🏠 **Homepage** — Hero carousel, stats, featured products, CTA banner
- 🛍️ **Products Page** — Filter by category, sort by price/rating, max price slider
- 🔍 **Search** — Real-time search across name, category, description
- 📦 **Product Detail** — Gallery, colors, quantity, add to cart, wishlist, reviews tab, related products
- 🛒 **Cart Drawer** — Slide-in cart with quantity controls and subtotal
- ❤️ **Wishlist** — Save favorite items
- 💳 **Checkout** — 3-step form: Shipping → Payment → Review → Order Placed
- 👤 **Profile** — Edit profile, order history
- 📁 **Categories** — Visual category grid
- 🔔 **Toast Notifications** — Add to cart, wishlist, form feedback
- 🔐 **Login / Sign Up** — Tab-based auth form

## 🚀 Quick Start

### Option 1: Local Development
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

### Option 2: Docker (Production Build)
```bash
# Build and run
docker compose up --build

# Visit http://localhost:8080
```

### Option 3: Docker Dev Mode (Hot Reload)
```bash
docker compose --profile dev up shopsmart-dev
# Visit http://localhost:3000
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.tsx       # Sticky nav with search, cart badge
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── Hero.tsx         # Auto-sliding hero carousel
│   ├── ProductCard.tsx  # Hover effects, wishlist, add-to-cart
│   ├── ProductGrid.tsx  # Filterable, sortable grid
│   ├── CartDrawer.tsx   # Slide-in cart sidebar
│   └── Stars.tsx
├── context/
│   ├── CartContext.tsx  # Cart + wishlist state
│   └── ToastContext.tsx # Notification system
├── pages/
│   ├── HomePage.tsx
│   ├── ProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── SearchPage.tsx
│   ├── CategoriesPage.tsx
│   ├── CheckoutPage.tsx
│   ├── WishlistPage.tsx
│   ├── ProfilePage.tsx
│   ├── LoginPage.tsx
│   └── ContactPage.tsx
└── utils/
    └── products.ts      # Product data + types
```

## 🐳 Docker Commands

```bash
# Build image
docker build -t shopsmart .

# Run container
docker run -p 8080:80 shopsmart

# Using compose
docker compose up -d        # background
docker compose down         # stop
docker compose logs -f      # view logs
```

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **React Router v6** — client-side routing
- **Vite** — lightning-fast builds
- **Docker** + **Nginx** — production deployment
- **CSS Variables** — dark theme design system
- **Google Fonts** — Playfair Display + DM Sans
