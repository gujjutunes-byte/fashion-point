'use client';

import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#161513',
                color: '#f3efe6',
                border: '1px solid rgba(201,160,74,0.3)',
              },
            }}
          />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
