'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Star, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

import { Header } from '@/components/layout/Header';
import { RatingBar } from '@/components/ui/RatingBar';
import { RatingTag } from '@/components/ui/RatingTag';
import { FeedbackModal } from '@/components/ui/FeedbackModal';
import { Pagination } from '@/components/ui/Pagination';
import { useProductDetails } from '@/lib/hooks';

import {
  Review,
  getRatingLevel,
  RATING_CONFIG,
} from '@/types/product';

const REVIEWS_PER_PAGE = 4;

const formatReviewDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = String(params.id || "");

  const [modalOpen, setModalOpen]     = useState(false);
  const [reviewPage, setReviewPage]   = useState(1);

  const { data: product, isLoading, isError } = useProductDetails(productId);

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">Produit introuvable</p>
          <Link href="/" className="text-sm text-primary font-medium hover:underline">Retour à l'accueil</Link>
        </div>
      </main>
    );
  }

  const level       = getRatingLevel(product.average_rating);
  const cfg         = RATING_CONFIG[level];


 const reviews = product?.reviews || [];
    const dist = [
    reviews.filter((r: Review) => r.rating === 5).length,
    reviews.filter((r: Review) => r.rating === 4).length,
    reviews.filter((r: Review) => r.rating === 3).length,
    reviews.filter((r: Review) => r.rating === 2).length,
    reviews.filter((r: Review) => r.rating === 1).length,
    ];

const distMax = Math.max(...dist, 1);
  /* Paginated reviews */
  const totalReviewPages  = Math.ceil(product.total_reviews / REVIEWS_PER_PAGE);
  const currentReviews    = product.reviews.slice((reviewPage - 1) * REVIEWS_PER_PAGE, reviewPage * REVIEWS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <Header backHref="/" />

      {/* ── Product hero ─────────────────────────────────────────── */}
      <section className="pt-20 pb-10 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Thumbnail */}
            <div className="bg-secondary rounded-xl aspect-square flex items-center justify-center">
              {/* <span className="text-[96px] font-black text-primary/20 select-none">{product.name.charAt(0)}</span> */}
              <img src={product.image_url} alt={product.name} width={100} height={100} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-2 flex-wrap">
                <RatingTag rating={product.average_rating} />
                <span className="text-xs text-muted-foreground capitalize px-2 py-0.5 bg-secondary rounded-full">
                  {product.category_name}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-foreground text-pretty">{product.name}</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Stars + numeric */}
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={18}
                      className={s <= Math.round(product.average_rating) ? 'fill-yellow-400 text-yellow-400' : 'text-border'}
                    />
                  ))}
                </div>
                <span className="text-xl font-bold text-foreground">{product.average_rating?.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({product.total_reviews} Avis)</span>
              </div>

              {/* Rating bar */}
              <RatingBar rating={product.average_rating} size="lg" />

              {/* CTA */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex-1 flex cursor-pointer items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  <MessageSquare size={15} />
                  Ecrire un avis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Rating distribution & summary ────────────────────────── */}
      <section className="py-8 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Distribution */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">Répartition des notes</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star, idx) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-3 shrink-0">{star}</span>
                    <Star size={11} className="fill-yellow-400 text-yellow-400 shrink-0" />
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(dist[idx] / distMax) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground w-8 text-right">{dist[idx]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">Résumé</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-foreground">{product.average_rating?.toFixed(1)}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">Moyenne</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{product.total_reviews}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">NTotal des avis</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${cfg.text}`}>
                    {cfg.label}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">Global</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Customer reviews ─────────────────────────────────────── */}
      {currentReviews.length > 0 && (
        
 
       <section id="reviews" className="py-8 bg-secondary/30 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-foreground">Avis clients</h2>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <MessageSquare size={13} />
              Ajouter un avis
            </button>
          </div>

          <div className="space-y-3">
            {currentReviews.map((review: Review, uuid: string) => {
              return (
                <div key={uuid} className="bg-card rounded-xl p-4 border border-border">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{review.name}</p>
                        <p className="text-[10px] text-muted-foreground">{formatReviewDate(review.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={11}
                          className={s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-border'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors">
                      <ThumbsUp size={12} />
                      Utile ({Math.floor(Math.random() * 11)})
                    </button>
                    <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                      <ThumbsDown size={12} />
                      Pas utile
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination
            currentPage={reviewPage}
            totalPages={totalReviewPages}
            onPageChange={setReviewPage}
          />
        </div>
      </section>
           )}

      {/* Feedback modal */}
      <FeedbackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={product.name}
        product_uuid={product.uuid}
      />
    </div>
    );
  }
