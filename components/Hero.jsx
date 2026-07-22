'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-banner.jpg"
          alt="Luxury Fashion"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="text-yellow-500 uppercase tracking-[0.4em] text-sm mb-5"
          >
            Luxury Collection 2026
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            Luxury <span className="text-yellow-500">Redefined</span>
            <br />
            For Every Occasion
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="mt-6 text-lg text-gray-300 max-w-xl"
          >
            Discover premium fashion crafted with elegance,
            timeless design and unmatched quality.
          </motion.p>
                    <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.4}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/shop"
              className="px-8 py-4 rounded-full bg-yellow-500 text-black font-semibold hover:scale-105 transition-all duration-300"
            >
              Shop Now
            </Link>

            <Link
              href="/new-arrivals"
              className="px-8 py-4 rounded-full border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300"
            >
              View Collection
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.5}
            className="mt-8 flex flex-wrap gap-6 text-sm text-yellow-400"
          >
            <span>🚚 Free Shipping</span>
            <span>💳 Secure Payment</span>
            <span>↩ Easy Returns</span>
          </motion.div>

          {/* Luxury Glass Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.6}
            className="mt-10 max-w-lg rounded-3xl border border-yellow-500/20 bg-white/5 backdrop-blur-xl p-6"
          >
            <p className="text-yellow-400 tracking-[0.3em] text-xs uppercase">
              Premium Collection
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white">
              Crafted For Luxury
            </h3>

            <p className="mt-3 text-gray-300 leading-7">
              Every piece is designed with premium materials and timeless
              elegance to give you a world-class fashion experience.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.7}
            className="mt-12 flex flex-wrap gap-10"
          >
            <div>
              <h2 className="text-4xl font-bold text-yellow-400">15K+</h2>
              <p className="text-gray-400 text-sm">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-yellow-400">500+</h2>
              <p className="text-gray-400 text-sm">Luxury Products</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-yellow-400">4.9★</h2>
              <p className="text-gray-400 text-sm">Customer Rating</p>
            </div>
          </motion.div>
                  </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Floating Luxury Badge */}
      <div className="hidden lg:flex absolute bottom-10 right-10 rounded-2xl border border-yellow-500/20 bg-black/60 backdrop-blur-xl px-6 py-4 shadow-2xl">
        <div>
          <p className="text-yellow-400 text-xs tracking-[0.3em] uppercase">
            Exclusive
          </p>
          <h4 className="text-white text-xl font-bold mt-1">
            Luxury Edition
          </h4>
          <p className="text-gray-400 text-sm mt-1">
            New Collection 2026
          </p>
        </div>
      </div>

    </section>
  );
}
