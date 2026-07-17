import { Star } from 'lucide-react';

export default function Stars({ rating, showValue = true }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= Math.round(rating) ? 'text-gold fill-gold' : 'text-bone/20'}
        />
      ))}
      {showValue && <span className="text-bone/40 text-xs ml-1">({rating})</span>}
    </div>
  );
}
