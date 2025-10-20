import { useState } from 'react'
import TopChainCard from './top-chain-card'

export default function TopChainCarousel({ chains = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!chains || chains.length === 0) {
    return null
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="space-y-4">
      {/* Card Display */}
      <TopChainCard chain={chains[currentIndex]} />

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2">
        {chains.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
