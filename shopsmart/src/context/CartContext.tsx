import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Product } from '../utils/products';

export interface CartItem extends Product { quantity: number; }

interface CartState {
  items: CartItem[];
  wishlist: string[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD'; product: Product; qty?: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE_QTY'; id: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_WISH'; id: string };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD': {
      const qty = action.qty ?? 1;
      const exists = state.items.find(i => i.id === action.product.id);
      return {
        ...state,
        items: exists
          ? state.items.map(i => i.id === action.product.id ? { ...i, quantity: i.quantity + qty } : i)
          : [...state.items, { ...action.product, quantity: qty }],
        isOpen: true,
      };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: action.qty < 1
          ? state.items.filter(i => i.id !== action.id)
          : state.items.map(i => i.id === action.id ? { ...i, quantity: action.qty } : i),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'TOGGLE_WISH':
      return {
        ...state,
        wishlist: state.wishlist.includes(action.id)
          ? state.wishlist.filter(id => id !== action.id)
          : [...state.wishlist, action.id],
      };
    default: return state;
  }
};

interface CartCtx {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  total: number;
  count: number;
}

const CartContext = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], wishlist: [], isOpen: false });
  const total = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = state.items.reduce((s, i) => s + i.quantity, 0);
  return (
    <CartContext.Provider value={{ state, dispatch, total, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
