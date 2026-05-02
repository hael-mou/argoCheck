'use client';

import { useState } from 'react';
import { X, Star, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { RATING_CONFIG, getRatingLevel } from '@/types/product';
import { useCreateReview } from '@/lib/hooks';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  product_uuid: string;
}

export function FeedbackModal({
  isOpen,
  onClose,
  productName,
  product_uuid,
}: FeedbackModalProps) {
  const router = useRouter();
  const createReview = useCreateReview();

  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const level = rating > 0 ? getRatingLevel(rating) : null;
  const levelLabel = level ? RATING_CONFIG[level].label : '';

  const resetForm = () => {
    setName('');
    setRating(0);
    setHover(0);
    setComment('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createReview.mutate(
      {
        name,
        rating,
        product: product_uuid,
        comment,
      },
      {
        onSuccess: () => {
          toast.success('Votre avis a été ajouté avec succès 🎉');

          resetForm();
          onClose();
        },

        onError: () => {
          toast.error("Une erreur s'est produite ou vous avez déjà ajouté un avis pour ce produit.");
        },
      }
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-card rounded-xl w-full max-w-md shadow-xl border border-border animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
          <div>
            <h2 className="text-sm font-bold text-foreground">Écrire un avis</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{productName}</p>
          </div>

          <button
            onClick={onClose}
            disabled={createReview.isPending}
            className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Votre nom
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="votre nom"
              required
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Évaluation
            </label>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="p-0.5 transition-transform hover:scale-110"
                >
                  <Star
                    size={26}
                    className={`transition-colors ${
                      star <= (hover || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-border'
                    }`}
                  />
                </button>
              ))}

              {level && (
                <span className={`ml-2 text-xs font-semibold ${RATING_CONFIG[level].text}`}>
                  {levelLabel}
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Votre commentaire
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partagez votre expérience..."
              required
              rows={4}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={createReview.isPending}
              className="flex-1 cursor-pointer py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:bg-secondary transition-colors"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={
                !name.trim() ||
                !rating ||
                !comment.trim() ||
                createReview.isPending
              }
              className="flex-1 cursor-pointer py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {createReview.isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Envoi...
                </>
              ) : (
                'Soumettre'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
