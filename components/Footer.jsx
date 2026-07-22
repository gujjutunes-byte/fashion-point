import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-yellow-500/20 bg-gradient-to-b from-black via-zinc-950 to-black">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-white tracking-wider">
            FASHION <span className="text-yellow-500">POINT</span>
          </h2>

          <p className="mt-5 text-gray-400 leading-7">
            Luxury fashion crafted for modern lifestyle.
            Premium quality, timeless elegance and unmatched style.
          </p>

          <div className="flex gap-4 mt-8">
            <a href="#" className="p-3 rounded-full border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition">
              <Facebook size={18} />
            </a>

            <a href="#" className="p-3 rounded-full border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition">
              <Instagram size={18} />
            </a>

            <a href="#" className="p-3 rounded-full border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-500 mb-6">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/categories">Categories</Link></li>
            <li><Link href="/new-arrivals">New Arrivals</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-500 mb-6">
            Categories
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li><Link href="/shop?category=shirts">Shirts</Link></li>
            <li><Link href="/shop?category=tshirts">T-Shirts</Link></li>
            <li><Link href="/shop?category=jeans">Jeans</Link></li>
            <li><Link href="/shop?category=jackets">Jackets</Link></li>
            <li><Link href="/shop?category=accessories">Accessories</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-500 mb-6">
            Contact
          </h3>

          <div className="space-y-4 text-gray-300">

            <div className="flex gap-3">
              <Phone className="text-yellow-500" size={18} />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex gap-3">
              <Mail className="text-yellow-500" size={18} />
              <span>hello@fashionpoint.com</span>
            </div>

            <div className="flex gap-3">
              <MapPin className="text-yellow-500" size={18} />
              <span>Mumbai, India</span>
            </div>

          </div>
        </div>

      </div>

      {/* Newsletter */}
      <div className="border-t border-yellow-500/20">
        <div className="max-w-5xl mx-auto px-6 py-10 text-center">

          <h2 className="text-3xl font-bold text-white">
            Join Our Newsletter
          </h2>

          <p className="text-gray-400 mt-3">
            Get exclusive offers and new arrivals first.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-3 rounded-full bg-zinc-900 border border-yellow-500/30 text-white w-full sm:w-96 outline-none"
            />

            <button className="px-8 py-3 rounded-full bg-yellow-500 text-black font-bold hover:scale-105 transition">
              Subscribe
            </button>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-yellow-500/20 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Fashion Point • Luxury Edition • All Rights Reserved.
      </div>

    </footer>
  );
}
