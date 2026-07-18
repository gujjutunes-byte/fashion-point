import Image from 'next/image';
import Link from 'next/link';

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/shop?category=${c.id}`}
          className="card-hover img-zoom relative rounded-2xl overflow-hidden aspect-[3/4] group block"
        >
          <Image src={c.img} alt={c.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-display text-xl sm:text-2xl text-bone">{c.name}</p>
            <span className="text-gold text-xs tracking-widest">SHOP NOW →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
