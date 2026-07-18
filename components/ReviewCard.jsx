import Stars from './Stars';

export default function ReviewCard({ review }) {
  return (
    <div className="glass rounded-2xl p-7">
      <div className="mb-3">
        <Stars rating={review.rating} showValue={false} />
      </div>
      <p className="text-bone/70 leading-relaxed mb-5">&ldquo;{review.text}&rdquo;</p>
      <p className="font-display text-lg text-gold">{review.name}</p>
      <p className="text-xs text-bone/40 tracking-widest">VERIFIED BUYER</p>
    </div>
  );
}
