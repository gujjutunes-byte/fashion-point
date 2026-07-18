'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-end sm:items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1800&q=80"
          alt="Model wearing premium fashion"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 pb-14 sm:pb-0 w-full">
        <div className="max-w-xl">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="flex items-center gap-3 mb-5">
            <span className="hairline w-10" />
            <span className="text-gold text-xs tracking-[0.35em]">NEW SEASON COLLECTION</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-bone"
          >
            Upgrade Your Style with <span className="gold-text italic">Fashion Point</span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-6 text-bone/70 text-base sm:text-lg max-w-md">
            Curated menswear for the man who dresses with intention — sharp tailoring, premium fabrics, effortless confidence.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-9 flex flex-wrap gap-4">
            <Link href="/shop" className="btn-gold px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide">
              Shop Now
            </Link>
            <Link href="/new-arrivals" className="btn-outline px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide">
              View Collection
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-12 flex items-center gap-8">
            <div>
              <p className="font-display text-3xl text-gold">12k+</p>
              <p className="text-[11px] tracking-widest text-bone/50">HAPPY CUSTOMERS</p>
            </div>
            <div className="w-px h-10 bg-gold/25" />
            <div>
              <p className="font-display text-3xl text-gold">4.8/5</p>
              <p className="text-[11px] tracking-widest text-bone/50">AVERAGE RATING</p>
            </div>
            <div className="w-px h-10 bg-gold/25" />
            <div>
              <p className="font-display text-3xl text-gold">200+</p>
              <p className="text-[11px] tracking-widest text-bone/50">PREMIUM STYLES</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
