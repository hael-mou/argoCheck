'use client';
import { Header } from '@/components/layout/Header';
import { ProductCard } from '@/components/layout/ProductCard';
import { FilterBar } from '@/components/ui/FilterBar';
import { Pagination } from '@/components/ui/Pagination';
import { RatingTag } from '@/components/ui/RatingTag';
import { useCategories, useProducts } from '@/lib/hooks';
import { Product} from '@/types/product';
import { Barcode, Mic, Search, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const PAGE_SIZE = 8;
const MainPage : React.FC = () => {
const [searchQuery, setSearchQuery] = useState("");
const [categoryFilter, setCategoryFilter] = useState("");
const [ratingFilter, setRatingFilter] = useState("all");
const [visible, setVisible] = useState<Set<string>>(new Set());
const [currentPage, setCurrentPage] = useState(1);
const isVisible = (id: string) => visible.has(id);


const { data: categories = [], isLoading: isLoadingCats } = useCategories();
const {data: page = {}, isLoading, isError} = useProducts(
    currentPage, 
    searchQuery, 
    categoryFilter,
    ratingFilter === "all" ? "" : ratingFilter
);
  
  const {data: topRatedPage = {}, isLoading: isLoadingTopRated} = useProducts(1, "", "", "excellent");
  const topRated = topRatedPage.results || [];
  const totalCount = page?.count || 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const filtered = page.results || [];

    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-14 min-h-[calc(100vh-104px)]">
        <section className="pt-20 pb-8 bg-card border-b border-border">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Trouver des produits
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Recherchez par nom ou utilisez nos outils intelligents
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          {/* Main Search Wrapper */}
          <div className="relative w-full max-w-lg group">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Rechercher un produit..."
              className="w-full bg-background border border-border rounded-xl pl-10 pr-20 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />


            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              

              <div className="relative group/tooltip">
                <button 
                  type="button"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-help"
                >
                  <Mic size={18} />
                </button>

                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[10px] rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium">
                 
À venir
                </span>
              </div>


              <div className="relative group/tooltip">
                <button 
                  type="button"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-help"
                >
                  <Barcode size={18} />
                </button>
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[10px] rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium">
                À venir
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
          {/* Filter Section */}
          <section className="bg-background border-b border-border py-3">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <FilterBar
              categories={categories}
              categoryFilter={categoryFilter}
              ratingFilter={ratingFilter}
              isLoadingCategories={isLoadingCats}
              onCategoryChange={(id) => { setCategoryFilter(id); setCurrentPage(1); }}
              onRatingChange={(val) => { setRatingFilter(val); setCurrentPage(1); }}
              onClear={() => {
                setCategoryFilter("");
                setRatingFilter("all");
                setCurrentPage(1);
              }}
            />
            </div>
        </section>

        {/* ── Products grid ────────────────────────────────────────── */}
      <section id="products" className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div
            id="products-title"
            data-animate
            className={`flex items-center justify-between mb-6 opacity-0 ${isVisible('products-title') ? 'animate-fade-in-up' : ''}`}
          >
            <h2 className="text-lg font-bold text-foreground">Produits</h2>
            <span className="text-xs text-muted-foreground">{filtered.length} { 'résultats' }</span>
          </div>
          {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Loading...</span>
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filtered.map((product: Product, idx: number) => (
                  <ProductCard
                    key={product.uuid}
                    product={product}
                    isVisible={true}
                    animDelay={idx * 0.05}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-sm text-muted-foreground">
                Aucun Produit trouvé
              </div>)}
            
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(pageNumber) => {
                  setCurrentPage(pageNumber);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
        </div>
      </section>
{/* ── Top Rated ────────────────────────────────────────────── */}
{/* Only show if we have products to display */}
{topRated.length > 0 && (
  <section id="top-rated" className="py-10 bg-secondary/40 border-t border-border">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div id="top-rated-title" className="mb-6">
        <h2 className="text-lg font-bold text-foreground">Mieux notés</h2>
        <p className="text-xs text-muted-foreground mt-1">Les mieux notés par les clients</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {topRated.map((product: Product, idx: number) => {
          const ratingValue = product.average_rating || 0;
          
          return (
            <Link
              href={`/product/${product.uuid}`}
              key={product.uuid}
              className="block animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.07}s` }}
            >
              <div className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border hover:shadow-md hover:border-primary/40 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <span className="text-xl font-black text-primary/30 group-hover:scale-110 transition-transform">
                    {product.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{product.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={11} className="fill-yellow-400 text-yellow-400 shrink-0" />
                    <span className="text-xs font-bold text-foreground">{ratingValue}</span>
                    <span className="text-[10px] text-muted-foreground">
                      ({product.total_reviews || 0})
                    </span>
                  </div>
                </div>
                <RatingTag rating={ratingValue} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
)}
        </main>

      </div>

    );
}


export default MainPage
