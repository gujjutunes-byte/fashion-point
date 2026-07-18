import Image from 'next/image';

export const metadata = { title: 'About Us | Fashion Point' };

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-5 sm:px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="img-zoom rounded-2xl overflow-hidden relative aspect-[4/3]">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80"
            alt="Fashion Point store"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <span className="text-gold text-xs tracking-[0.35em]">OUR STORY</span>
          <h1 className="font-display text-4xl sm:text-5xl mt-2 text-bone mb-6">
            Crafted for the <span className="gold-text italic">Modern Man</span>
          </h1>
          <p className="text-bone/70 leading-relaxed mb-4">
            Since our founding, Fashion Point has stood for one idea: that great style should feel
            effortless. We source premium fabrics and partner with skilled tailors to bring
            boutique-level menswear to every wardrobe.
          </p>
          <p className="text-bone/70 leading-relaxed mb-8">
            From sharp formal shirting to relaxed streetwear, every piece is chosen with an eye for
            detail, durability and timeless design — because how you dress is how the world sees you.
          </p>
          <div className="grid grid-cols-3 gap-6">
            <div><p className="font-display text-3xl text-gold">2015</p><p className="text-[11px] tracking-widest text-bone/50 mt-1">FOUNDED</p></div>
            <div><p className="font-display text-3xl text-gold">50+</p><p className="text-[11px] tracking-widest text-bone/50 mt-1">CITIES SERVED</p></div>
            <div><p className="font-display text-3xl text-gold">100%</p><p className="text-[11px] tracking-widest text-bone/50 mt-1">QUALITY CHECKED</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
