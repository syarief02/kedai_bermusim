import { useState, useMemo } from 'react'
import { Search, Store, X } from 'lucide-react'
import { PRODUCT_CATEGORIES, getProductsByCategory, getProductsBySearch, getProductsByDarjah } from '../utils/productData'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'

export default function CatalogPage({ children, selectedChild }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDarjah, setFilterDarjah] = useState(null)

  // Auto-detect darjah from selected child
  const childDarjah = selectedChild?.darjah || null

  const products = useMemo(() => {
    let result

    // Search takes priority
    if (searchQuery.trim()) {
      result = getProductsBySearch(searchQuery.trim())
    } else {
      result = getProductsByCategory(activeCategory)
    }

    // Apply darjah filter
    const darjahFilter = filterDarjah || childDarjah
    if (darjahFilter) {
      result = result.filter(p => p.darjah.includes(darjahFilter))
    }

    return result
  }, [activeCategory, searchQuery, filterDarjah, childDarjah])

  const clearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className="kb-container py-6 kb-animate-fade-in">
      {/* Header */}
      <h1 className="kb-title text-xl mb-1">★ KATALOG</h1>
      <p className="kb-text-muted text-sm mb-4">
        Produk terbaik untuk anak sekolah rendah — harga berpatutan ★
      </p>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-kb-text-muted)]" />
        <input
          type="text"
          className="kb-input pl-10 pr-10"
          placeholder="Cari produk... cth: kasut, beg, pensel"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-kb-text-muted)] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Darjah Quick Filter */}
      {children && children.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setFilterDarjah(null)}
            className={`kb-btn kb-btn-sm whitespace-nowrap ${
              !filterDarjah ? 'kb-btn-primary' : 'kb-btn-ghost'
            }`}
          >
            Semua Darjah
          </button>
          {[...new Set(children.map(c => c.darjah))].sort().map(d => (
            <button
              key={d}
              onClick={() => setFilterDarjah(filterDarjah === d ? null : d)}
              className={`kb-btn kb-btn-sm whitespace-nowrap ${
                filterDarjah === d ? 'kb-btn-primary' : 'kb-btn-ghost'
              }`}
            >
              Darjah {d}
            </button>
          ))}
        </div>
      )}

      {/* Category Tabs */}
      {!searchQuery && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
          {PRODUCT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`kb-btn kb-btn-sm whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'kb-btn-primary'
                  : 'kb-btn-ghost'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-[var(--color-kb-text-muted)]">
          {searchQuery ? `Hasil carian: "${searchQuery}"` : PRODUCT_CATEGORIES.find(c => c.id === activeCategory)?.label}
        </p>
        <span className="kb-badge kb-badge-magenta">{products.length} produk</span>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Store}
          title="Tiada produk dijumpai"
          description={searchQuery ? 'Cuba carian lain atau padam filter.' : 'Tiada produk dalam kategori ini.'}
          action={searchQuery ? clearSearch : undefined}
          actionLabel={searchQuery ? 'Padam Carian' : undefined}
        />
      )}

      {/* Lazada CTA */}
      <div className="mt-6 kb-card kb-card-magenta text-center">
        <p className="text-sm font-semibold mb-2">Tak jumpa apa yang dicari?</p>
        <a
          href="https://www.lazada.com.my/catalog/?q=barang+sekolah"
          target="_blank"
          rel="noopener noreferrer"
          className="kb-btn kb-btn-primary kb-btn-sm"
        >
          <Store className="w-4 h-4" />
          Cari di Lazada
        </a>
      </div>
    </div>
  )
}
