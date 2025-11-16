import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search, TrendingUp, Clock } from 'lucide-react'
import tokensData from '@/data/tokens.json'
import { getAllChains } from '@/data/db'

export default function TokenSelectionDialog({ open, onOpenChange, onSelectToken, excludeToken = null }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [recentTokens, setRecentTokens] = useState([])

  // Load recent tokens from localStorage
  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('recentTokens') || '[]')
    setRecentTokens(recent)
  }, [open])

  // Get all available tokens (CNPY + chain tokens)
  const getAllTokens = () => {
    const tokens = [...tokensData]
    
    // Add chain tokens that aren't already in tokensData
    const chains = getAllChains()
    chains.forEach(chain => {
      if (!tokens.find(t => t.symbol === chain.ticker)) {
        tokens.push({
          symbol: chain.ticker,
          name: chain.name,
          chainId: chain.id,
          address: chain.creator,
          decimals: 18,
          logo: chain.logo,
          brandColor: chain.brandColor,
          currentPrice: chain.currentPrice,
          priceChange24h: chain.priceChange24h,
          volume24h: chain.volume,
          marketCap: chain.marketCap
        })
      }
    })

    return tokens
  }

  const allTokens = getAllTokens()

  // Filter tokens based on search
  const filteredTokens = allTokens.filter(token => {
    if (excludeToken && token.symbol === excludeToken) return false
    
    const query = searchQuery.toLowerCase()
    return (
      token.symbol.toLowerCase().includes(query) ||
      token.name.toLowerCase().includes(query) ||
      token.address?.toLowerCase().includes(query)
    )
  })

  // Get recent tokens that are still valid
  const recentTokensList = recentTokens
    .map(symbol => allTokens.find(t => t.symbol === symbol))
    .filter(t => t && (!excludeToken || t.symbol !== excludeToken))
    .slice(0, 3)

  const handleSelectToken = (token) => {
    // Add to recent tokens
    const updated = [token.symbol, ...recentTokens.filter(s => s !== token.symbol)].slice(0, 5)
    localStorage.setItem('recentTokens', JSON.stringify(updated))
    setRecentTokens(updated)

    onSelectToken(token)
    onOpenChange(false)
    setSearchQuery('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, symbol or address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>
        </div>

        {/* Token List */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
          {/* Recent Tokens */}
          {!searchQuery && recentTokensList.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground px-2">
                <Clock className="w-3 h-3" />
                <span>Recent</span>
              </div>
              <div className="space-y-1">
                {recentTokensList.map(token => (
                  <TokenItem key={token.symbol} token={token} onSelect={handleSelectToken} />
                ))}
              </div>
            </div>
          )}

          {/* Popular/All Tokens */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground px-2">
              <TrendingUp className="w-3 h-3" />
              <span>{searchQuery ? 'Search Results' : 'Popular Tokens'}</span>
            </div>
            <div className="space-y-1">
              {filteredTokens.length > 0 ? (
                filteredTokens.map(token => (
                  <TokenItem key={token.symbol} token={token} onSelect={handleSelectToken} />
                ))
              ) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No tokens found
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TokenItem({ token, onSelect }) {
  return (
    <button
      onClick={() => onSelect(token)}
      className="w-full p-3 rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-between group"
    >
      <div className="flex items-center gap-3">
        {/* Token Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: token.brandColor || '#10b981' }}
        >
          {token.logo ? (
            <img src={token.logo} alt={token.symbol} className="w-full h-full rounded-full" />
          ) : (
            <span className="text-base font-bold text-white">
              {token.symbol[0]}
            </span>
          )}
        </div>

        {/* Token Info */}
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="font-medium">{token.symbol}</span>
            {token.isNative && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                Native
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{token.name}</p>
        </div>
      </div>

      {/* Token Price & Change */}
      <div className="text-right">
        <p className="text-sm font-medium">
          ${token.currentPrice.toFixed(token.currentPrice < 0.01 ? 6 : 4)}
        </p>
        {token.priceChange24h !== undefined && (
          <p className={`text-xs ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
          </p>
        )}
      </div>
    </button>
  )
}

