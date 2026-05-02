{/* ── Footer ───────────────────────────────────────────────── */}
const Footer = () => {
    return(
<footer className="bg-foreground text-background py-8">
<div className="max-w-5xl mx-auto px-4 sm:px-6">
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <p className="text-sm font-bold">AgroCheck</p>
      <p className="text-xs opacity-60 mt-1">
        Évaluations de produits agricoles par la communauté'
      </p>
    </div>
    <p className="text-xs opacity-50">© {new Date().getFullYear()} AgroCheck</p>
  </div>
</div>
</footer>
    )
    

}

export default Footer