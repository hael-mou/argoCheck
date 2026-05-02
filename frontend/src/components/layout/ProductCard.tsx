import Link from 'next/link';
import { Star } from 'lucide-react';
import { RatingBar } from '@/components/ui/RatingBar';
import { RatingTag } from '@/components/ui//RatingTag';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  animId?: string;
  isVisible?: boolean;
  animDelay?: number;
}

export function ProductCard({ product, animId, isVisible = true, animDelay = 0 }: ProductCardProps) {

  return (
    <Link
      href={`/product/${product.uuid}`}
      id={animId}
      data-animate={animId ? '' : undefined}
      className={`block transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-4'}`}
      style={{ transitionDelay: `${animDelay}s` }}
    >
      <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/40 transition-all duration-200 group h-full flex flex-col">
        {/* Thumbnail */}
        <div className="bg-secondary aspect-square flex items-center justify-center p-6 relative">
          <div className="text-5xl font-black text-primary/20 select-none group-hover:scale-110 transition-transform duration-200">
          <img src={product.image_url} alt={product.name} width={100} height={100} className="w-full h-full min-h-[220px] max-h-[220px] object-cover" />
           
          </div> 
          <RatingTag rating={product.average_rating} className="absolute top-2 right-2" />
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col gap-2 flex-1">
          <p className="text-xs font-semibold text-foreground leading-snug line-clamp-2">{product.name}</p>
          <div className="flex items-center gap-1.5">
            <Star size={12} className="fill-yellow-400 text-yellow-400 shrink-0" />
            <span className="text-xs font-bold text-foreground">{product.average_rating?.toFixed(1)}</span>
            <span className="text-[10px] text-muted-foreground">({product.total_reviews})</span>
          </div>
          <RatingBar rating={product.average_rating} size="sm" />
        </div>
      </div>
    </Link>
  );
}
