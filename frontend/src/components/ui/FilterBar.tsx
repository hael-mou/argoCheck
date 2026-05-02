'use client';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Category } from '@/types/product';

interface FilterBarProps {
  categories: Category[];
  categoryFilter: string;
  ratingFilter: string;
  onCategoryChange: (v: string) => void;
  onRatingChange: (v: string) => void;
  onClear: () => void;
  isLoadingCategories?: boolean;
}

export function FilterBar({
  categories,
  categoryFilter,
  ratingFilter,
  onCategoryChange,
  onRatingChange,
  onClear,
  isLoadingCategories
}: FilterBarProps) {

  const isFiltered = categoryFilter !== "" || ratingFilter !== "all";

  const ratingOptions = [
    { value: 'all',       label: 'Tous les avis' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good',      label: 'Bon' },
    { value: 'bad',       label: 'Mauvais' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <SlidersHorizontal size={14} />
        <span className="font-medium">Filter</span>
      </div>

      {/* Category select */}
      <div className="relative">
        <select
          value={categoryFilter}
          disabled={isLoadingCategories}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none bg-card border border-border pl-3 pr-7 py-1.5 rounded-lg text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer disabled:opacity-50"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>

      {/* Rating select */}
      <div className="relative">
        <select
          value={ratingFilter}
          onChange={(e) => onRatingChange(e.target.value)}
          className="appearance-none bg-card border border-border pl-3 pr-7 py-1.5 rounded-lg text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
        >
          {ratingOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>

      {isFiltered && (
        <button
          onClick={onClear}
          className="text-xs text-primary font-medium hover:underline"
        >
          Réinitialiser
        </button>
      )}
    </div>
  );
}