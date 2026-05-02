'use client';

import Link from 'next/link';


interface HeaderProps {

  backHref?: string;
}

export function Header({ backHref }: HeaderProps) {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        {/* Left: back link or logo */}
        {backHref ? (
          <Link
            href={backHref}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Retour aux produits
          </Link>
        ) : (
          <Link href="/" className="text-base font-bold tracking-tight text-primary">
            AgroCheck
          </Link>
        )}

        {/* Center: nav links (homepage only) */}
        {!backHref && (
          <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#" className="font-medium text-foreground hover:text-primary transition-colors">Accueil</a>
            <a href="#products" className="hover:text-primary transition-colors">Produits</a>
            <a href="#top-rated" className="hover:text-primary transition-colors">Mieux notés</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Avis</a>
          </div>
        )}

        {/* Right: back page title (detail) or empty */}
        {backHref && (
          <span className="text-base font-bold tracking-tight text-primary">AgroCheck</span>
        )}

      </nav>
    </header>
  );
}
