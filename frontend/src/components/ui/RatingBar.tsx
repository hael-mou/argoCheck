
interface RatingBarProps {
  rating: number;
  size?: 'sm' | 'lg';
}

export function RatingBar({ rating, size = 'sm' }: RatingBarProps) {
  const position = Math.min(Math.max((rating / 5) * 100, 0), 100);
  const height = size === 'lg' ? 'h-2' : 'h-1.5';
  const cursor = size === 'lg' ? 'w-4 h-4' : 'w-3 h-3';
  const offset = size === 'lg' ? 8 : 6;

  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
        <span>Mauvais</span>
        <span>Bon</span>
        <span>Excellent</span>
      </div>
      <div className={`relative ${height} rounded-full`} style={{ background: 'linear-gradient(to right, var(--color-rating-bad), var(--color-rating-good), var(--color-rating-excellent))' }}>
        <div
          className={`absolute top-1/2 -translate-y-1/2 ${cursor} rounded-full bg-card border-2 border-foreground shadow transition-all`}
          style={{ left: `calc(${position}% - ${offset}px)` }}
        />
      </div>
    </div>
  );
}
