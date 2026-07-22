import Image from "next/image";
import Link from "next/link";

export default function CategoryGrid({ categories }) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/shop?category=${c.id}`}
          className="group relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-black shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/60 hover:shadow-yellow-500/20"
        >
          {/* Category Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={c.img}
              alt={c.name}
              fill
              sizes="(max-width:768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* Gold Hover Overlay */}
            <div className="absolute inset-0 bg-yellow-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">

            <span className="inline-block mb-2 rounded-full border border-yellow-500/40 bg-black/50 px-3 py-1 text-[10px] tracking-[0.25em] text-yellow-400 backdrop-blur">
              PREMIUM
            </span>

            <h3 className="text-xl md:text-2xl font-bold text-white transition group-hover:text-yellow-400">
              {c.name}
            </h3>

            <p className="mt-2 text-sm text-gray-300">
              Discover Premium Collection
            </p>

            <div className="mt-5">
              <span className="inline-flex items-center rounded-full border border-yellow-500 px-5 py-2 text-sm font-semibold text-yellow-400 transition-all duration-300 group-hover:bg-yellow-500 group-hover:text-black">
                Shop Now →
              </span>
            </div>

          </div>
        </Link>
      ))}
    </section>
  );
}
