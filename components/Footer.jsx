import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gold/15 pt-16 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-full border border-gold/50 flex items-center justify-center">
              <span className="font-display gold-text text-lg font-semibold">FP</span>
            </span>
            <span className="font-display text-xl tracking-widest text-bone">
              FASHION <span className="gold-text">POINT</span>
            </span>
          </div>
          <p className="text-bone/50 text-sm leading-relaxed">
            Premium menswear for the modern gentleman. Style that defines you — every single day.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-ink text-gold transition">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-ink text-gold transition">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-ink text-gold transition">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-bone/60">
            <li><Link href="/" className="hover:text-gold transition">Home</Link></li>
            <li><Link href="/shop" className="hover:text-gold transition">Shop</Link></li>
            <li><Link href="/new-arrivals" className="hover:text-gold transition">New Arrivals</Link></li>
            <li><Link href="/best-sellers" className="hover:text-gold transition">Best Sellers</Link></li>
            <li><Link href="/about" className="hover:text-gold transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold mb-4">Categories</h4>
          <ul className="space-y-2.5 text-sm text-bone/60">
            <li><Link href="/shop?category=shirts" className="hover:text-gold transition">Shirts</Link></li>
            <li><Link href="/shop?category=tshirts" className="hover:text-gold transition">T-Shirts</Link></li>
            <li><Link href="/shop?category=jeans" className="hover:text-gold transition">Jeans</Link></li>
            <li><Link href="/shop?category=jackets" className="hover:text-gold transition">Jackets</Link></li>
            <li><Link href="/shop?category=ethnic" className="hover:text-gold transition">Ethnic Wear</Link></li>
            <li><Link href="/shop?category=accessories" className="hover:text-gold transition">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold mb-4">Contact</h4>
          <ul className="space-y-2.5 text-sm text-bone/60">
            <li>+91 98765 43210</li>
            <li>hello@fashionpoint.com</li>
            <li>204 Linking Road, Bandra West, Mumbai 400050</li>
            <li>Mon – Sun · 10:00 AM – 9:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-bone/40">
        <p>© {new Date().getFullYear()} FASHION POINT. All rights reserved.</p>
        <p>Designed for the modern gentleman — crafted with care.</p>
      </div>
