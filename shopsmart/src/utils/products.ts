export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  stock: number;
  colors?: string[];
}

export const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Books', 'Sports'];

export const products: Product[] = [
  {
    id: '1', name: 'Wireless Noise-Cancelling Headphones', price: 59.99, originalPrice: 89.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'Electronics', rating: 4.8, reviews: 324, badge: 'Sale',
    description: 'Premium sound isolation with 30hr battery life. Foldable design for travel.',
    stock: 12, colors: ['#1a1a1a', '#f0ede8', '#e8c97a']
  },
  {
    id: '2', name: 'Smart Watch Pro X', price: 79.99, originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    category: 'Electronics', rating: 4.6, reviews: 218, badge: 'Hot',
    description: 'Health tracking, GPS, 7-day battery. Water resistant to 50m.',
    stock: 8, colors: ['#1a1a1a', '#2d4a7a', '#5a2d6a']
  },
  {
    id: '3', name: 'Bluetooth Speaker Cube', price: 39.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    category: 'Electronics', rating: 4.4, reviews: 156,
    description: '360° immersive sound. 12hr playtime. IPX7 waterproof.',
    stock: 20, colors: ['#1a1a1a', '#2d7a4a', '#e05c5c']
  },
  {
    id: '4', name: 'Mechanical Keyboard TKL', price: 129.99, originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    category: 'Electronics', rating: 4.9, reviews: 89, badge: 'New',
    description: 'RGB per-key lighting. Hot-swappable switches. PBT keycaps.',
    stock: 5
  },
  {
    id: '5', name: 'Premium Leather Jacket', price: 199.99, originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
    category: 'Fashion', rating: 4.7, reviews: 67, badge: 'Sale',
    description: 'Genuine top-grain leather. Slim fit. Multiple pockets. Timeless design.',
    stock: 15, colors: ['#1a1a1a', '#4a2d1a', '#2d1a0a']
  },
  {
    id: '6', name: 'Running Shoes Aero', price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    category: 'Fashion', rating: 4.5, reviews: 203,
    description: 'Lightweight mesh upper. Responsive cushioning. Perfect for daily training.',
    stock: 30, colors: ['#e8c97a', '#5ce0a0', '#e05c5c']
  },
  {
    id: '7', name: 'Designer Sunglasses', price: 149.99, originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
    category: 'Fashion', rating: 4.3, reviews: 44,
    description: 'UV400 polarized lenses. Titanium frame. Comes with premium case.',
    stock: 18
  },
  {
    id: '8', name: 'Minimalist Desk Lamp', price: 49.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
    category: 'Home', rating: 4.6, reviews: 112, badge: 'New',
    description: 'Touch dimmer, 3 color temps, USB charging port built in.',
    stock: 22
  },
  {
    id: '9', name: 'Ceramic Pour-Over Set', price: 34.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    category: 'Home', rating: 4.8, reviews: 178,
    description: 'Handcrafted ceramic dripper with matching mug. Elevate your morning ritual.',
    stock: 35
  },
  {
    id: '10', name: 'Yoga Mat Pro', price: 64.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    category: 'Sports', rating: 4.7, reviews: 290,
    description: 'Non-slip natural rubber. 6mm thick. Alignment marks. Carrying strap included.',
    stock: 40
  },
  {
    id: '11', name: 'Atomic Habits', price: 16.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
    category: 'Books', rating: 4.9, reviews: 891,
    description: 'James Clear\'s #1 bestseller on building good habits and breaking bad ones.',
    stock: 100
  },
  {
    id: '12', name: 'Resistance Band Set', price: 29.99, originalPrice: 44.99,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
    category: 'Sports', rating: 4.4, reviews: 165, badge: 'Sale',
    description: '5 resistance levels. Full-body workout anywhere. Durable latex.',
    stock: 55
  },
];
