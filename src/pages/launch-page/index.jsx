import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom'
import MainSidebar from '@/components/main-sidebar'
import ChainHeader from './components/chain-header'
import PriceChart from './components/price-chart'
import OverviewTab from './components/overview-tab'
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
  holders: 3318,
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

                <TabsContent value="holders" className="mt-4">
                  <Card className="p-6">
                    <p className="text-sm text-muted-foreground">Holders list coming soon...</p>
                  </Card>
                </TabsContent>

                <TabsContent value="code" className="mt-4">
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Language</p>
                        <p className="font-medium">{mockChainData.language}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Repository</p>
                        <p className="font-medium">{mockChainData.repositoryName}</p>
                      </div>
                    </div>
                  </Card>
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
