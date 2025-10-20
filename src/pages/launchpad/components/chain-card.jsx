import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useNavigate } from 'react-router-dom'

export default function ChainCard({ chain }) {
  const navigate = useNavigate()

  const progress = (chain.marketCap / chain.goal) * 100

  const handleClick = () => {
    navigate(chain.url)
  }

  return (
    <Card
      onClick={handleClick}
      className="p-4 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all group"
    >
      <div className="space-y-3">
        {/* Logo and Name */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: chain.brandColor || '#10b981' }}
          >
            {chain.logo ? (
              <img
                src={chain.logo}
                alt={chain.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-bold text-black">
                {chain.ticker[0]}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold truncate">{chain.name}</h3>
            <p className="text-xs text-muted-foreground">${chain.ticker}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 h-8">
          {chain.description}
        </p>

        {/* Progress */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              ${(chain.marketCap / 1000).toFixed(1)}k / ${(chain.goal / 1000).toFixed(0)}k
            </span>
            {chain.change24h && (
              <span className={chain.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                {chain.change24h >= 0 ? '+' : ''}{chain.change24h}%
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
