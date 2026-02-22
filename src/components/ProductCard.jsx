import { ExternalLink, Star, TrendingDown } from 'lucide-react'
import { formatPrice, getDiscount } from '../utils/productData'

export default function ProductCard({ product }) {
  const discount = getDiscount(product.originalPrice, product.price)

  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="kb-card block no-underline group"
    >
      {/* Product Image/Emoji */}
      <div className="w-full h-28 rounded-lg mb-3 flex items-center justify-center text-5xl" style={{
        background: 'linear-gradient(135deg, rgba(255,0,255,0.05), rgba(0,255,255,0.05))',
        border: '1px solid var(--color-kb-border)',
      }}>
        {product.image}
      </div>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {product.tags.map(tag => (
            <span key={tag} className="kb-badge kb-badge-magenta">{tag}</span>
          ))}
        </div>
      )}

      {/* Name */}
      <h3 className="font-semibold text-sm text-[var(--color-kb-text)] mb-1 line-clamp-2 group-hover:text-[var(--color-kb-magenta)] transition-colors">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-xs text-[var(--color-kb-text-muted)] mb-2 line-clamp-2">
        {product.description}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
        <span className="text-xs font-medium text-[var(--color-kb-text)]">{product.rating}</span>
        <span className="text-xs text-[var(--color-kb-text-muted)]">({product.reviews.toLocaleString()})</span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-2">
        <span className="text-lg font-bold text-[var(--color-kb-magenta)]">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <span className="text-xs text-[var(--color-kb-text-muted)] line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
        {discount > 0 && (
          <span className="kb-badge kb-badge-success">
            <TrendingDown className="w-3 h-3" />
            -{discount}%
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="mt-3 flex items-center gap-1 text-xs text-[var(--color-kb-cyan)] font-medium">
        <ExternalLink className="w-3 h-3" />
        Beli di Lazada
      </div>
    </a>
  )
}
