import { useState, useEffect } from 'react'
import MainSidebar from '@/components/main-sidebar'
import TopChainCarousel from './components/top-chain-carousel'
import FilterBar from './components/filter-bar'
import ChainCard from './components/chain-card'

// Mock data for demonstration
const MOCK_TOP_CHAINS = [
  {
    id: 1,
    name: 'Onchain BNB',
    ticker: 'OBNB',
    logo: null,
    brandColor: '#f59e0b',
    tagline: 'Airbnb on the blockchain',
    description: 'Buy an initial chain supply with $700 in crypto on your take everything on-chain.',
    marketCap: 27650,
    goal: 60000,
    change24h: 2.5,
    currentPrice: 0.0045,
    holderCount: 143,
    volume: 8500,
    priceHistory: Array.from({ length: 20 }, (_, i) => ({
      value: 0.0045 + (Math.sin(i / 3) * 0.0008)
    })),
    url: '/chain/onchain-bnb'
  },
  {
    id: 2,
    name: 'DeFi Masters',
    ticker: 'DFIM',
    logo: null,
    brandColor: '#8b5cf6',
    tagline: 'Master the DeFi universe',
    description: 'The next generation DeFi protocol with revolutionary staking mechanisms.',
    marketCap: 42100,
    goal: 60000,
    change24h: 5.7,
    currentPrice: 0.0078,
    holderCount: 287,
    volume: 12400,
    priceHistory: Array.from({ length: 20 }, (_, i) => ({
      value: 0.0078 + (Math.sin(i / 2.5) * 0.0012)
    })),
    url: '/chain/defi-masters'
  },
  {
    id: 3,
    name: 'NFT Galaxy',
    ticker: 'NFTG',
    logo: null,
    brandColor: '#ec4899',
    tagline: 'Your NFT marketplace reimagined',
    description: 'Trade, collect, and create NFTs in a decentralized marketplace.',
    marketCap: 38900,
    goal: 60000,
    change24h: -1.2,
    currentPrice: 0.0062,
    holderCount: 198,
    volume: 9800,
    priceHistory: Array.from({ length: 20 }, (_, i) => ({
      value: 0.0062 + (Math.sin(i / 4) * 0.001)
    })),
    url: '/chain/nft-galaxy'
  },
  {
    id: 4,
    name: 'Green Energy Chain',
    ticker: 'GEC',
    logo: null,
    brandColor: '#10b981',
    tagline: 'Sustainable blockchain for tomorrow',
    description: 'Carbon-neutral blockchain powering the green energy revolution.',
    marketCap: 51200,
    goal: 60000,
    change24h: 3.4,
    currentPrice: 0.0091,
    holderCount: 412,
    volume: 15600,
    priceHistory: Array.from({ length: 20 }, (_, i) => ({
      value: 0.0091 + (Math.sin(i / 3.5) * 0.0015)
    })),
    url: '/chain/green-energy'
  }
]

const MOCK_CHAINS = [
  {
    id: 5,
    name: 'MetaVerse Protocol',
    ticker: 'MVP',
    logo: null,
    brandColor: '#3b82f6',
    description: 'Building the infrastructure for the next generation metaverse experiences.',
    marketCap: 18500,
    goal: 50000,
    change24h: 8.2,
    url: '/chain/metaverse-protocol'
  },
  {
    id: 6,
    name: 'GameFi Chain',
    ticker: 'GFC',
    logo: null,
    brandColor: '#f97316',
    description: 'Play-to-earn gaming ecosystem with revolutionary tokenomics.',
    marketCap: 23400,
    goal: 50000,
    change24h: 4.5,
    url: '/chain/gamefi-chain'
  },
  {
    id: 7,
    name: 'Social Connect',
    ticker: 'SOCL',
    logo: null,
    brandColor: '#06b6d4',
    description: 'Decentralized social media platform owned by the community.',
    marketCap: 31200,
    goal: 50000,
    change24h: -2.1,
    url: '/chain/social-connect'
  },
  {
    id: 8,
    name: 'AI Trading Bot',
    ticker: 'AITB',
    logo: null,
    brandColor: '#a855f7',
    description: 'Automated trading strategies powered by artificial intelligence.',
    marketCap: 45600,
    goal: 50000,
    change24h: 12.3,
    url: '/chain/ai-trading'
  },
  {
    id: 9,
    name: 'Cross Chain Bridge',
    ticker: 'CCB',
    logo: null,
    brandColor: '#14b8a6',
    description: 'Seamlessly transfer assets across multiple blockchain networks.',
    marketCap: 28900,
    goal: 50000,
    change24h: 1.8,
    url: '/chain/cross-chain'
  },
  {
    id: 10,
    name: 'Privacy Shield',
    ticker: 'PRIV',
    logo: null,
    brandColor: '#6366f1',
    description: 'Anonymous transactions with enterprise-grade privacy features.',
    marketCap: 37100,
    goal: 50000,
    change24h: 6.7,
    url: '/chain/privacy-shield'
  },
  {
    id: 11,
    name: 'Real Estate DAO',
    ticker: 'REDAO',
    logo: null,
    brandColor: '#84cc16',
    description: 'Fractional real estate ownership through blockchain technology.',
    marketCap: 19800,
    goal: 50000,
    change24h: -0.5,
    url: '/chain/real-estate-dao'
  },
  {
    id: 12,
    name: 'Music Rights Chain',
    ticker: 'MRC',
    logo: null,
    brandColor: '#f43f5e',
    description: 'Empowering artists with direct ownership of their music rights.',
    marketCap: 26300,
    goal: 50000,
    change24h: 3.9,
    url: '/chain/music-rights'
  }
]

export default function Launchpad() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [filteredChains, setFilteredChains] = useState(MOCK_CHAINS)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // Filter chains based on active filter
    let filtered = [...MOCK_CHAINS]

    switch (activeFilter) {
      case 'trending':
        filtered = filtered.filter(chain => chain.change24h > 5)
        break
      case 'new':
        filtered = filtered.sort((a, b) => b.id - a.id).slice(0, 4)
        break
      case 'graduated':
        filtered = filtered.filter(chain => chain.marketCap >= chain.goal)
        break
      case 'scheduled':
        filtered = [] // No scheduled chains in mock data
        break
      default:
        // 'all' - show all chains
        break
    }

    setFilteredChains(filtered)
  }, [activeFilter])

  return (
    <div className="flex min-h-screen bg-background">
      <MainSidebar />

      <div className="flex-1 p-8 space-y-8">
        {/* Top Chains Carousel */}
        <div>
          <h1 className="text-2xl font-bold mb-6">Top Chains</h1>
          <TopChainCarousel chains={MOCK_TOP_CHAINS} />
        </div>

        {/* Filter Bar */}
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Chains Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredChains.length > 0 ? (
              filteredChains.map((chain) => (
                <ChainCard key={chain.id} chain={chain} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No chains found for this filter.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredChains.length > 0 ? (
              filteredChains.map((chain) => (
                <ChainCard key={chain.id} chain={chain} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No chains found for this filter.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
