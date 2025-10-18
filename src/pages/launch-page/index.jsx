import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom'
import MainSidebar from '@/components/main-sidebar'
import ChainHeader from './components/chain-header'
import PriceChart from './components/price-chart'
import OverviewTab from './components/overview-tab'
import CodeTab from './components/code-tab'
import HoldersTab from './components/holders-tab'
import TradingPanel from './components/trading-panel'
import { Globe, Github } from 'lucide-react'

// Mock data - will be replaced by API calls
const mockChainData = {
  name: 'Onchain ENS',
  ticker: 'OENS',
  creator: 'Onchain ENS',
  description: 'Integrated with Ethereum\'s robust infrastructure, our platform is designed to enhance the way digital assets are managed and exchanged. Our technology enables seamless, transparent, and efficient transactions, unlocking new possibilities for users and developers alike. Experience unmatched security, flexibility, and interoperability with our innovative solution, tailored to meet the evolving needs of the blockchain ecosystem.',
  logo: null, // Will show placeholder
  brandColor: '#10b981',
  language: 'TypeScript',
  repositoryName: 'eliezerpujols/mygamechain',

  // Market data
  currentPrice: 0.011647,
  marketCap: 23000,
  mcap: 1.88,
  volume: 2328,
  virtualLiq: 2328,
  holderCount: 3318,
  priceChange24h: 15.6,

  // Launch settings
  graduationThreshold: 50000,
  remainingToGraduation: 233230,

  // Gallery
  gallery: [null, null, null], // Placeholders

  // Social links
  socialLinks: [
    { platform: 'website', label: 'Website', url: 'https://mygamechain.org', icon: Globe },
    { platform: 'twitter', label: 'Twitter/X', url: '@mygamechain', icon: null },
    { platform: 'discord', label: 'Discord', url: 'https://discord.gg/mygamechain', icon: null },
    { platform: 'github', label: 'GitHub', url: 'https://github.com/eliezerpujols/mygamechain', icon: Github }
  ],

  // Whitepapers
  whitepapers: [
    {
      id: 1,
      type: 'file',
      name: 'Technical Whitepaper.pdf',
      size: 2457600, // 2.4 MB in bytes
    },
    {
      id: 2,
      type: 'url',
      url: 'https://docs.mygamechain.org/architecture',
      name: 'System Architecture Overview',
      description: 'docs.mygamechain.org'
    },
    {
      id: 3,
      type: 'url',
      url: 'https://github.com/eliezerpujols/mygamechain/wiki/tokenomics',
      name: 'Tokenomics Documentation',
      description: 'github.com'
    }
  ],

  // Tokenomics
  tokenomics: {
    totalSupply: '1000000000',
    blockTime: 10, // seconds
    halvingDays: 365,
    yearOneEmission: 137442250
  },

  // Holders
  holders: [
    { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1', balance: 150000000 },
    { address: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', balance: 120000000 },
    { address: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0', balance: 95000000 },
    { address: '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E', balance: 80000000 },
    { address: '0x2546BcD3c84621e976D8185a91A922aE77ECEc30', balance: 65000000 },
    { address: '0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC', balance: 50000000 },
    { address: '0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9', balance: 45000000 },
    { address: '0x28a8746e75304c0780E39d3a14F80f7E4fe3951C', balance: 40000000 },
    { address: '0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E', balance: 35000000 },
    { address: '0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e', balance: 30000000 },
    { address: '0x610B717796ad172B316836AC95a2ffad065CeaB4', balance: 28000000 },
    { address: '0x178169B423a011fff22B9e3F3abeA13414dDD0F1', balance: 25000000 },
    { address: '0xF7eB46Fa95CCfB7642fA4a2E3f3C9748F0a4a8D9', balance: 22000000 },
    { address: '0x07687e702b410Fa43f4cB4Af7fA097918ffD2730', balance: 20000000 },
    { address: '0x4E9ce36E442e55EcD9025B9a6E0D88485d628A67', balance: 18000000 },
    { address: '0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7', balance: 15000000 },
    { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', balance: 12000000 },
    { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', balance: 10000000 },
    { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', balance: 8000000 },
    { address: '0x514910771AF9Ca656af840dff83E8264EcF986CA', balance: 5000000 },
    { address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', balance: 3000000 }
  ],

  // Chart data
  priceHistory: [
    { time: '00:00', price: 0.0098 },
    { time: '02:00', price: 0.0102 },
    { time: '04:00', price: 0.0105 },
    { time: '06:00', price: 0.0110 },
    { time: '08:00', price: 0.0113 },
    { time: '10:00', price: 0.0108 },
    { time: '12:00', price: 0.0115 },
    { time: '14:00', price: 0.0112 },
    { time: '16:00', price: 0.0118 },
    { time: '18:00', price: 0.0116 },
    { time: '20:00', price: 0.011647 }
  ]
}

export default function LaunchPage() {
  const navigate = useNavigate()
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <MainSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="px-6 py-3 pt-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <button onClick={() => navigate('/')} className="hover:text-foreground">
              Launchpad
            </button>
            <span>/</span>
            <span className="text-foreground">Onchain ENS</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6 pt-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              <ChainHeader chainData={mockChainData} />
              <PriceChart chainData={mockChainData} />

              {/* Tabs Section */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="holders">Holders (21)</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="block-explorer">Block Explorer</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <OverviewTab
                    chainData={mockChainData}
                    currentGalleryIndex={currentGalleryIndex}
                    setCurrentGalleryIndex={setCurrentGalleryIndex}
                  />
                </TabsContent>

                <TabsContent value="holders">
                  <HoldersTab holders={mockChainData.holders} ticker={mockChainData.ticker} />
                </TabsContent>

                <TabsContent value="code">
                  <CodeTab chainData={mockChainData} />
                </TabsContent>

                <TabsContent value="block-explorer" className="mt-4">
                  <Card className="p-6">
                    <p className="text-sm text-muted-foreground">Block explorer coming soon...</p>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <TradingPanel chainData={mockChainData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
