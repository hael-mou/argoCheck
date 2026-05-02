export type Category = {
    id: string;
    name: string;
    slug: string;
}
export type Review = {
    uuid: string;
    rating: number;
    name: string;
    comment: string;
    created_at: string;
}
export type Product = {
    uuid: string;
    image_url: string;
    name: string;
    category_name: string;
    description: string;
    created_at: string;
    total_reviews: number;
    average_rating: number;
};

export type ProductDetail = Product & {
    reviews: Review[];

};
export type RatingLevel = 'bad' | 'good' | 'excellent';

export function getRatingLevel(rating: number): RatingLevel {
    if (rating < 2.5) return 'bad';
    if (rating < 4) return 'good';
    return 'excellent';
  }

export const RATING_CONFIG: Record<RatingLevel, { label: string; bg: string; text: string }> = {
    bad:       { label: 'Mauvais',   bg: 'bg-rating-bad/10',       text: 'text-rating-bad' },
    good:      { label: 'Bon',       bg: 'bg-rating-good/10',      text: 'text-rating-good' },
    excellent: { label: 'Excellent', bg: 'bg-rating-excellent/10', text: 'text-rating-excellent' },
  };

  export const CATEGORIES = ['Tous', 'Pesticides', 'Engrais', 'Équipement', 'Semences', 'Biologique'];