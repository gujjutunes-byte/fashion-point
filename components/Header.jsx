'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/categories', label: 'Categories' },
  { href: '/new-arrivals', label: 'New Arrivals' },
  { href: '/best-sellers', label: 'Best Sellers' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-ink/80 backdrop-blur-md border-b border-gold/15">
        <div className="hidden sm:block bg-charcoal border-b border-gold/10">
          <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between text-[11px] tracking-[0.15em] text-goldlight/80">
            <span>FREE SHIPPING ON ORDERS OVER ₹2999</span>
            <span className="hidden md:inline">MID-SEASON SALE — UP TO 40% OFF</span>
            <span>NEW COLLECTION 2026</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-gold/50 flex items-center justify-center">
              <span className="font-display gold-text text-lg sm:text-xl font-semibold">FP</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl sm:text-2xl tracking-[0.12em] text-bone">
                FASHION <span className="gold-text">POINT</span>
              </span>
              <span className="hidden sm:block text-[10px] tracking-[0.35em] text-gold/70 mt-0.5">
                STYLE THAT DEFINES YOU
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm tracking-wide text-bone/80">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-gold transition">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={() => setSearchOpen((v) => !v)} aria-label="Search" className="hidden sm:flex text-bone/80 hover:text-gold transition">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link href={user ? '/account/orders' : '/login'} aria-label="Account" className="hidden sm:flex text-bone/80 hover:text-gold transition">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <button onClick={() => setWishlistOpen(true)} aria-label="Wishlist" className="relative text-bone/80 hover:text-gold transition">
              <Heart size={20} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-ink text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative text-bone/80 hover:text-gold transition">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-ink text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen((v) => !v)} aria-label="Menu" className="lg:hidden text-bone/80 hover:text-gold transition">
              {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="max-w-3xl mx-auto px-5 pb-4">
            <form action="/shop" className="flex items-center gap-2 glass rounded-full px-4 py-2.5">
              <Search size={16} className="text-gold" />
              <input
                name="q"
                type="text"
                placeholder="Search shirts, jeans, jackets..."
                className="bg-transparent outline-none text-sm text-bone flex-1 placeholder:text-bone/40"
              />
            </form>
          </div>
        )}

        {mobileOpen && (
          <div className="lg:hidden bg-charcoal border-b border-gold/15">
            <nav className="flex flex-col px-6 py-4 gap-1 text-bone/90">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 border-b border-white/5 last:border-none"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
}
