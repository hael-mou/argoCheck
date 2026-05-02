import { getRatingLevel, RATING_CONFIG } from '@/types/product';    

interface RatingTagProps {
  rating: number;
  className?: string;
}

export function RatingTag({ rating, className = '' }: RatingTagProps) {
  const level = getRatingLevel(rating);
  const cfg = RATING_CONFIG[level];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.bg} ${cfg.text} ${className}`}>
      {cfg.label}
    </span>
  );
}
